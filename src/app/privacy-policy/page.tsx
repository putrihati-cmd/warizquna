import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalSection } from "@/components/LegalSection";

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

      <LegalSection title="1. Pendahuluan">
        <p>
          {SITE.brand} (selanjutnya disebut "kami") berkomitmen untuk melindungi privasi pengguna
          layanan kami. Kebijakan ini menjelaskan cara kami mengumpulkan, menggunakan, dan
          melindungi informasi pribadi Anda.
        </p>
      </LegalSection>

      <LegalSection title="2. Informasi yang Kami Kumpulkan">
        <ul>
          <li>Informasi akun: nama, email, nomor telepon, dan kata sandi terenkripsi.</li>
          <li>Informasi pembayaran: diproses oleh penyedia payment gateway pihak ketiga (Midtrans). Kami tidak menyimpan data kartu kredit Anda.</li>
          <li>Data koneksi WhatsApp: token sesi dan kredensial perangkat Anda yang dienkripsi secara aman menggunakan AES-256-GCM.</li>
          <li>Data penggunaan: log akses, audit aktivitas user, statistik pengiriman pesan.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Bagaimana Kami Menggunakan Informasi">
        <ul>
          <li>Menyediakan dan mengoperasikan layanan WhatsApp Gateway.</li>
          <li>Memproses pembayaran dan mengirim invoice.</li>
          <li>Memberikan dukungan teknis dan pelanggan.</li>
          <li>Mengirim notifikasi terkait layanan, update fitur, dan pengingat tagihan.</li>
          <li>Meningkatkan kualitas layanan melalui analitik agregat.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Berbagi Informasi">
        <p>
          Kami tidak menjual data Anda. Informasi hanya dibagikan kepada penyedia layanan pihak
          ketiga yang membantu operasional kami (seperti Midtrans untuk pembayaran), infrastruktur
          WhatsApp untuk pengiriman pesan, serta kepada otoritas hukum bila diwajibkan oleh peraturan
          perundang-undangan.
        </p>
      </LegalSection>

      <LegalSection title="5. Keamanan Data">
        <p>
          Data sensitif dienkripsi dengan AES-256-GCM untuk token, bcrypt untuk password, dan
          SHA-256 untuk API key. Semua koneksi menggunakan TLS 1.3. Token plaintext tidak pernah
          disimpan atau di-log.
        </p>
      </LegalSection>

      <LegalSection title="6. Penyimpanan Data">
        <p>
          Data disimpan di server Indonesia. Kami menyimpan data pengguna selama akun aktif dan
          maksimal 90 hari setelah penutupan akun, kecuali diwajibkan oleh peraturan untuk
          menyimpannya lebih lama.
        </p>
      </LegalSection>

      <LegalSection title="7. Hak Pengguna">
        <ul>
          <li>Hak untuk mengakses data pribadi yang kami simpan.</li>
          <li>Hak untuk memperbaiki data yang tidak akurat.</li>
          <li>Hak untuk meminta penghapusan data (right to be forgotten).</li>
          <li>Hak untuk membatalkan persetujuan kapan saja.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Kami menggunakan cookies untuk autentikasi sesi, preferensi pengguna, dan analitik. Anda
          dapat menonaktifkan cookies melalui pengaturan browser, namun beberapa fitur mungkin tidak
          berfungsi optimal.
        </p>
      </LegalSection>

      <LegalSection title="9. Perubahan Kebijakan">
        <p>
          Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan
          diberitahukan melalui email atau notifikasi di dashboard.
        </p>
      </LegalSection>

      <LegalSection title="10. Kontak">
        <p>
          Pertanyaan terkait privasi dapat dikirim ke{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </article>
  );
}

