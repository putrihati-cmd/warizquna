export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tag: string;
  readTime: string;
  content: { type: "p" | "h2" | "h3" | "ul" | "code" | "quote"; text?: string; lang?: string; items?: string[] }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "panduan-system-user-meta-business",
    title: "Panduan Lengkap Membuat System User di Meta Business Manager",
    excerpt:
      "Step-by-step cara membuat System User dan generate Access Token untuk WhatsApp Business API resmi dari Meta.",
    date: "2026-05-20",
    author: "Tim Rizquna",
    tag: "Tutorial",
    readTime: "8 menit",
    content: [
      { type: "p", text: "WhatsApp Cloud API resmi dari Meta mensyaratkan Anda mengakses API menggunakan System User Access Token, bukan token user pribadi. Pendekatan ini lebih aman dan stabil untuk operasional jangka panjang." },
      { type: "h2", text: "Apa Itu System User?" },
      { type: "p", text: "System User adalah identitas non-personal yang dibuat di Meta Business Manager. Token yang dikeluarkan untuknya tidak akan rusak ketika user pribadi keluar tim atau ganti password." },
      { type: "h2", text: "Langkah-langkah" },
      { type: "ul", items: [
        "Buka business.facebook.com lalu pilih Business Settings.",
        "Pilih Users > System Users > Add.",
        "Beri nama (mis. \"Rizquna API\") dan role Admin.",
        "Klik Generate New Token, pilih app WhatsApp Business yang sudah dibuat.",
        "Centang permission whatsapp_business_management dan whatsapp_business_messaging.",
        "Copy token yang dihasilkan. Token ini hanya muncul satu kali.",
      ] },
      { type: "h2", text: "Verifikasi Token" },
      { type: "code", lang: "bash", text: "curl -H 'Authorization: Bearer YOUR_SYSTEM_USER_TOKEN' \\\n  https://graph.facebook.com/v20.0/me" },
      { type: "p", text: "Jika berhasil, response akan mengembalikan id System User. Anda siap paste token ini ke dashboard Rizquna." },
      { type: "quote", text: "Simpan token di password manager. Jangan commit ke repository — token ini sama sensitifnya dengan password root." },
    ],
  },
  {
    slug: "broadcast-aman-tanpa-banned",
    title: "5 Strategi Broadcast WhatsApp Aman Tanpa Risiko Banned",
    excerpt: "Pelajari best practice broadcasting yang sesuai kebijakan Meta Business Messaging dan minim risiko pemblokiran.",
    date: "2026-05-12",
    author: "Tim Rizquna",
    tag: "Best Practice",
    readTime: "6 menit",
    content: [
      { type: "p", text: "Banned di WhatsApp bisa berarti gagal kirim sementara hingga suspensi permanen. Lima praktik berikut menurunkan risiko tersebut." },
      { type: "h2", text: "1. Selalu pakai template Meta-approved" },
      { type: "p", text: "Untuk kontak yang belum reply Anda dalam 24 jam terakhir, Anda hanya boleh mengirim message template yang sudah di-review Meta." },
      { type: "h2", text: "2. Hormati frekuensi pengiriman" },
      { type: "p", text: "Atur jeda antar broadcast 30–60 detik per pesan. Hindari mass-send mendadak — pakai fitur Antrian + Smart Perfect Timing." },
      { type: "h2", text: "3. Gunakan Spintax" },
      { type: "p", text: "Variasi otomatis kalimat membantu menghindari deteksi pola spam dari sisi Meta." },
      { type: "h2", text: "4. Filter daftar nomor" },
      { type: "p", text: "Validasi nomor sebelum kirim. Nomor tidak aktif yang gagal terus-menerus akan menurunkan reputasi sender." },
      { type: "h2", text: "5. Pantau Quality Rating" },
      { type: "p", text: "Cek tab Quality di Meta Business Suite. Begitu rating turun ke kuning, kurangi volume dan tinjau template." },
    ],
  },
  {
    slug: "integrasi-woocommerce-whatsapp",
    title: "Integrasikan WooCommerce ke WhatsApp dalam 10 Menit",
    excerpt: "Otomatiskan notifikasi pesanan dan invoice WooCommerce ke pelanggan via WhatsApp menggunakan webhook Rizquna.",
    date: "2026-05-03",
    author: "Tim Rizquna",
    tag: "Integrasi",
    readTime: "10 menit",
    content: [
      { type: "p", text: "Tutorial singkat: kirim notifikasi WhatsApp otomatis setiap kali ada order baru di WooCommerce." },
      { type: "h2", text: "1. Buat API key di Rizquna" },
      { type: "p", text: "Login ke dashboard, buat API key baru, dan simpan." },
      { type: "h2", text: "2. Buat template Meta" },
      { type: "p", text: "Submit template berikut ke Meta untuk approval." },
      { type: "code", lang: "text", text: "Halo {{1}}, pesanan #{{2}} sebesar Rp {{3}} sudah kami terima. Terima kasih!" },
      { type: "h2", text: "3. Hook ke WooCommerce" },
      { type: "p", text: "Tambah snippet berikut ke functions.php tema child Anda." },
      { type: "code", lang: "php", text: "<?php\nadd_action('woocommerce_thankyou', function($order_id) {\n  $order = wc_get_order($order_id);\n  $phone = $order->get_billing_phone();\n  $name  = $order->get_billing_first_name();\n  $total = number_format($order->get_total(), 0, ',', '.');\n  wp_remote_post('https://wa.rizquna.id/api/wa/v1/messages', [\n    'headers' => [\n      'Authorization' => 'Bearer YOUR_API_KEY',\n      'Content-Type'  => 'application/json',\n    ],\n    'body' => wp_json_encode([\n      'to'           => $phone,\n      'type'         => 'template',\n      'templateName' => 'order_confirmation',\n      'parameters'   => [$name, $order_id, $total],\n    ]),\n  ]);\n});" },
    ],
  },
  {
    slug: "ai-bot-untuk-cs-umkm",
    title: "Bagaimana AI Bot Membantu CS UMKM Melayani 24/7",
    excerpt: "Studi kasus implementasi AI Smart Bot untuk auto-respond pertanyaan customer service di toko online.",
    date: "2026-04-25",
    author: "Tim Rizquna",
    tag: "Use Case",
    readTime: "5 menit",
    content: [
      { type: "p", text: "Pelanggan modern mengharapkan respon dalam hitungan menit, bahkan di luar jam kerja. AI Bot membantu UMKM menutup gap ini tanpa harus rekrut agen tambahan." },
      { type: "h2", text: "Skenario umum" },
      { type: "ul", items: [
        "Cek stok produk berdasarkan SKU",
        "Tracking nomor resi pengiriman",
        "FAQ pengembalian barang",
        "Generate link pembayaran QRIS",
      ] },
      { type: "h2", text: "Pengaturan handover" },
      { type: "p", text: "Bot dirancang fail-fast — saat tidak yakin, percakapan otomatis di-handover ke agen manusia. Tidak ada pelanggan yang tertinggal." },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}