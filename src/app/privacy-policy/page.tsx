import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Rizquna WhatsApp Gateway.",
};

export default function PrivacyPolicy() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Kebijakan Privasi</h1>
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
        Terakhir diperbarui: 13 Mei 2026
      </p>

      <Section title="1. Pendahuluan">
        <p>
          {SITE.brand} (selanjutnya disebut "kami") berkomitmen untuk melindungi privasi pengguna
          layanan kami. Kebijakan ini menjelaskan cara kami mengumpulkan, menggunakan, dan
          melindungi informasi pribadi Anda.
        </p>
      </Section>

      <Section title="2. Informasi yang Kami Kumpulkan">
        <ul>
          <li>Informasi akun: nama, email, nomor telepon, dan kata sandi terenkripsi.</li>
          <li>Informasi pembayaran: diproses oleh penyedia payment gateway pihak ketiga (Midtrans). Kami tidak menyimpan data kartu kredit Anda.</li>
          <li>Data WhatsApp Business: token, phone number ID, dan WABA ID yang dienkripsi AES-256-GCM.</li>
          <li>Data penggunaan: log akses, audit aktivitas user, statistik pengiriman pesan.</li>
        </ul>
      </Section>

      <Section title="3. Bagaimana Kami Menggunakan Informasi">
        <ul>
          <li>Menyediakan dan mengoperasikan layanan WhatsApp Gateway.</li>
          <li>Memproses pembayaran dan mengirim invoice.</li>
          <li>Memberikan dukungan teknis dan pelanggan.</li>
          <li>Mengirim notifikasi terkait layanan, update fitur, dan pengingat tagihan.</li>
          <li>Meningkatkan kualitas layanan melalui analitik agregat.</li>
        </ul>
      </Section>

      <Section title="4. Berbagi Informasi">
        <p>
          Kami tidak menjual data Anda. Informasi hanya dibagikan kepada penyedia layanan pihak
          ketiga yang membantu operasional kami (seperti Midtrans untuk pembayaran dan Meta untuk
          pengiriman pesan WhatsApp), serta kepada otoritas hukum bila diwajibkan oleh peraturan
          perundang-undangan.
        </p>
      </Section>

      <Section title="5. Keamanan Data">
        <p>
          Data sensitif dienkripsi dengan AES-256-GCM untuk token, bcrypt untuk password, dan
          SHA-256 untuk API key. Semua koneksi menggunakan TLS 1.3. Token plaintext tidak pernah
          disimpan atau di-log.
        </p>
      </Section>

      <Section title="6. Penyimpanan Data">
        <p>
          Data disimpan di server Indonesia. Kami menyimpan data pengguna selama akun aktif dan
          maksimal 90 hari setelah penutupan akun, kecuali diwajibkan oleh peraturan untuk
          menyimpannya lebih lama.
        </p>
      </Section>

      <Section title="7. Hak Pengguna">
        <ul>
          <li>Hak untuk mengakses data pribadi yang kami simpan.</li>
          <li>Hak untuk memperbaiki data yang tidak akurat.</li>
          <li>Hak untuk meminta penghapusan data (right to be forgotten).</li>
          <li>Hak untuk membatalkan persetujuan kapan saja.</li>
        </ul>
      </Section>

      <Section title="8. Cookies">
        <p>
          Kami menggunakan cookies untuk autentikasi sesi, preferensi pengguna, dan analitik. Anda
          dapat menonaktifkan cookies melalui pengaturan browser, namun beberapa fitur mungkin tidak
          berfungsi optimal.
        </p>
      </Section>

      <Section title="9. Perubahan Kebijakan">
        <p>
          Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan
          diberitahukan melalui email atau notifikasi di dashboard.
        </p>
      </Section>

      <Section title="10. Kontak">
        <p>
          Pertanyaan terkait privasi dapat dikirim ke{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            {SITE.email}
          </a>
          .
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </section>
  );
}
