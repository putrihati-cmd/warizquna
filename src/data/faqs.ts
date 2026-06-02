export type FaqItem = { q: string; a: string };
export type FaqSection = { title: string; qa: FaqItem[] };

export const LANDING_FAQS: FaqItem[] = [
  { q: "Apakah Rizquna memakai API resmi?", a: "Rizquna menyediakan gateway mandiri (API wrapper) yang dapat dihubungkan ke nomor WhatsApp Anda secara instan tanpa biaya per pesan dari Meta." },
  { q: "Apakah ada paket gratis?", a: "Ada. Paket Free bisa dipakai untuk mencoba fitur inti." },
  { q: "Apakah perlu kartu kredit?", a: "Tidak. Anda bisa mulai tanpa kartu kredit." },
];

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "Umum",
    qa: LANDING_FAQS,
  },
  {
    title: "Harga",
    qa: [
      { q: "Bisa upgrade paket kapan saja?", a: "Bisa. Upgrade berlaku langsung setelah pembayaran dikonfirmasi." },
      { q: "Apakah ada biaya tambahan per pesan?", a: "Tidak ada biaya per pesan. Anda bebas mengirim pesan tanpa khawatir tagihan membengkak dari Meta." },
    ],
  },
  {
    title: "Teknis",
    qa: [
      { q: "Apakah tersedia webhook?", a: "Ya, webhook tersedia untuk menerima status pesan dan event masuk." },
      { q: "Apakah bisa integrasi REST API?", a: "Bisa. Rizquna menyediakan endpoint REST API untuk pengiriman pesan dan otomasi." },
    ],
  },
];
