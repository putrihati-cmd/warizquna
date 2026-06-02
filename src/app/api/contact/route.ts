import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";
import { checkRate } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Format email tidak valid").max(200),
  subjek: z.string().min(3, "Subjek minimal 3 karakter").max(200),
  pesan: z.string().min(10, "Pesan minimal 10 karakter").max(2000),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  // Rate limit: max 3 contact form submissions per IP per 10 minutes
  const ip = getClientIp(req);
  const allowed = checkRate(`contact:${ip}`, 3, 600_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi dalam beberapa menit." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validasi gagal", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { nama, email, subjek, pesan } = parsed.data;

  // Escape all user inputs for HTML email
  const safeNama = escapeHtml(nama);
  const safeEmail = escapeHtml(email);
  const safeSubjek = escapeHtml(subjek);
  const safePesan = escapeHtml(pesan);

  const subject = `[Kontak Rizquna] ${subjek}`;
  const text = `Anda menerima pesan baru dari form kontak:

Nama: ${nama}
Email: ${email}
Subjek: ${subjek}

Pesan:
${pesan}`;

  const html = `
    <h3>Pesan Hubungi Kami Baru</h3>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 120px;">Nama</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${safeNama}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
        <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subjek</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${safeSubjek}</td>
      </tr>
    </table>
    <h4>Pesan:</h4>
    <div style="padding: 15px; border: 1px solid #ddd; background: #f9f9f9; border-radius: 8px; white-space: pre-wrap;">
      ${safePesan}
    </div>
  `;

  const mailResult = await sendMail({
    to: SITE.email,
    subject,
    text,
    html,
  });

  if (!mailResult.ok) {
    return NextResponse.json(
      { error: "Gagal mengirim pesan melalui mail gateway" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
