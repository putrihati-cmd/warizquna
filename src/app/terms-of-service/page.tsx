import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { LegalSection } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan Rizquna WhatsApp Gateway.",
};

export default function TermsOfService() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-2">Syarat & Ketentuan</h1>
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
        Terakhir diperbarui: 13 Mei 2026
      </p>

      <LegalSection title="1. Penerimaan Syarat">
        <p>
          Dengan menggunakan layanan {SITE.brand}, Anda setuju untuk terikat oleh syarat dan
          ketentuan ini. Jika tidak setuju, mohon tidak menggunakan layanan kami.
        </p>
      </LegalSection>

      <LegalSection title="2. Penggunaan yang Diizinkan">
        <ul>
          <li>Layanan hanya digunakan untuk tujuan komunikasi bisnis yang sah.</li>
          <li>Pengguna wajib mematuhi kebijakan resmi WhatsApp Business Platform dari Meta.</li>
          <li>Dilarang mengirim spam, phishing, scam, ujaran kebencian, atau konten ilegal.</li>
          <li>Dilarang menggunakan layanan untuk aktivitas yang melanggar hukum di Indonesia.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Akun Pengguna">
        <ul>
          <li>Pengguna bertanggung jawab atas keamanan kredensial akunnya.</li>
          <li>Satu akun untuk satu badan/individu — dilarang berbagi akses dengan pihak yang tidak berwenang.</li>
          <li>Kami berhak menonaktifkan akun yang melanggar syarat ini tanpa pemberitahuan.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Pembayaran & Refund">
        <ul>
          <li>Tagihan diterbitkan otomatis pada tanggal jatuh tempo masing-masing langganan.</li>
          <li>Langganan tahunan dapat dibatalkan dengan refund penuh dalam 14 hari pertama.</li>
          <li>Setelah 14 hari, refund prorata tidak berlaku untuk langganan tahunan.</li>
          <li>Upgrade paket berlaku langsung dengan perhitungan prorata.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Kewajiban Pengguna terhadap Meta">
        <p>
          Pengguna wajib mematuhi WhatsApp Business Messaging Policy dan WhatsApp Commerce Policy
          dari Meta. Pelanggaran terhadap kebijakan tersebut dapat mengakibatkan suspensi akun WABA
          Anda oleh Meta, di luar kendali kami.
        </p>
      </LegalSection>

      <LegalSection title="6. Pembatasan Tanggung Jawab">
        <p>
          {SITE.brand} menyediakan layanan "as-is". Kami tidak bertanggung jawab atas:
        </p>
        <ul>
          <li>Kerugian akibat suspensi WABA oleh Meta.</li>
          <li>Kerugian tidak langsung, kehilangan keuntungan, atau kehilangan data.</li>
          <li>Gangguan layanan akibat force majeure atau gangguan dari pihak ketiga (Meta, ISP, payment gateway).</li>
        </ul>
        <p>Tanggung jawab maksimum kami terbatas pada nilai langganan 1 (satu) bulan terakhir.</p>
      </LegalSection>

      <LegalSection title="7. Hak Kekayaan Intelektual">
        <p>
          Seluruh kode, desain, logo, dan materi {SITE.brand} adalah milik kami. Pengguna tidak
          diizinkan menggandakan, memodifikasi, atau menjual kembali tanpa izin tertulis.
        </p>
      </LegalSection>

      <LegalSection title="8. Pengakhiran">
        <ul>
          <li>Pengguna dapat membatalkan langganan kapan saja melalui dashboard.</li>
          <li>Kami berhak menghentikan layanan bagi pengguna yang melanggar syarat ini.</li>
          <li>Setelah pengakhiran, data akan dihapus secara permanen sesuai kebijakan retensi.</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Hukum yang Berlaku">
        <p>
          Syarat ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui
          musyawarah, dan jika tidak berhasil melalui pengadilan yang berwenang di Indonesia.
        </p>
      </LegalSection>

      <LegalSection title="10. Kontak">
        <p>
          Pertanyaan terkait syarat & ketentuan dapat dikirim ke{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold" style={{ color: "var(--rizquna-green)" }}>
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </article>
  );
}

