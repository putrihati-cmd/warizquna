import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mail";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const Schema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subjek: z.string().min(3, "Subjek minimal 3 karakter"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

export async function POST(req: Request) {
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
        <td style="padding: 8px; border: 1px solid #ddd;">${nama}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
        <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subjek</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${subjek}</td>
      </tr>
    </table>
    <h4>Pesan:</h4>
    <div style="padding: 15px; border: 1px solid #ddd; background: #f9f9f9; border-radius: 8px; white-space: pre-wrap;">
      ${pesan}
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
