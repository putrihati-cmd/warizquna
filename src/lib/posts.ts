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
    slug: "panduan-menghubungkan-nomor-whatsapp-qr-code",
    title: "Panduan Lengkap Menghubungkan Nomor WhatsApp Anda via QR Code",
    excerpt:
      "Langkah demi langkah menghubungkan nomor WhatsApp Anda secara instan ke dashboard gateway Rizquna menggunakan scan QR Code.",
    date: "2026-05-20",
    author: "Tim Rizquna",
    tag: "Tutorial",
    readTime: "4 menit",
    content: [
      { type: "p", text: "Rizquna WA Gateway dirancang sebagai platform mandiri yang fleksibel. Anda tidak memerlukan persetujuan Meta Business Manager atau pendaftaran WABA resmi. Cukup hubungkan nomor WhatsApp biasa atau bisnis Anda menggunakan fitur pemindaian QR Code." },
      { type: "h2", text: "Mengapa Menggunakan Koneksi QR Code?" },
      { type: "p", text: "Metode ini memanfaatkan fitur Multi-Device resmi dari WhatsApp. Akun WhatsApp Anda tetap berada di bawah kendali Anda sepenuhnya, dan tidak memerlukan waktu approval yang lama." },
      { type: "h2", text: "Langkah-langkah Menghubungkan Nomor" },
      { type: "ul", items: [
        "Masuk ke dashboard akun Rizquna Anda.",
        "Arahkan ke menu Admin Gateway atau halaman Device.",
        "Buat sesi baru dengan memasukkan nama identitas device Anda.",
        "Klik tombol 'Buat QR' di dashboard. Sistem akan memproses dan memunculkan kode QR di layar.",
        "Buka aplikasi WhatsApp di HP Anda, buka menu Pengaturan/Setting > Perangkat Tertaut (Linked Devices).",
        "Klik 'Tautkan Perangkat' dan arahkan kamera HP untuk memindai QR Code yang tampil di dashboard.",
      ] },
      { type: "p", text: "Setelah proses pemindaian berhasil, status koneksi di dashboard Anda akan berubah menjadi 'Connected'. Anda sudah siap mengirimkan pesan instan via API." },
      { type: "quote", text: "Pastikan koneksi internet HP Anda tetap stabil saat pertama kali melakukan sinkronisasi pesan." },
    ],
  },
  {
    slug: "broadcast-aman-tanpa-banned",
    title: "5 Strategi Broadcast WhatsApp Aman & Minim Risiko Blokir",
    excerpt: "Pelajari praktik terbaik (best practices) melakukan pengiriman pesan massal menggunakan gateway mandiri agar nomor Anda tetap aman.",
    date: "2026-05-12",
    author: "Tim Rizquna",
    tag: "Best Practice",
    readTime: "6 menit",
    content: [
      { type: "p", text: "Saat menggunakan WhatsApp Gateway mandiri, risiko pemblokiran atau banned nomor biasanya disebabkan oleh laporan spam dari penerima atau terdeteksi oleh sistem otomatis WhatsApp akibat frekuensi kirim yang tidak wajar." },
      { type: "h2", text: "1. Gunakan Jeda Waktu Kirim yang Cukup (Smart Delay)" },
      { type: "p", text: "Atur jeda waktu (delay) 10-30 detik antar pesan di antrian Anda. Pengiriman pesan ratusan sekaligus dalam hitungan detik akan memicu alarm bot dari sistem WhatsApp." },
      { type: "h2", text: "2. Gunakan Fitur Spintax" },
      { type: "p", text: "Gunakan variasi kata pembuka dan penutup. Misalnya: '{Halo|Hai|Selamat pagi} {{nama}}, ini konfirmasi pesanan Anda'. Variasi kalimat ini menghindari pola pesan identik yang dianggap spam." },
      { type: "h2", text: "3. Kirim Hanya ke Kontak Opt-in (Saling Kenal)" },
      { type: "p", text: "Pastikan penerima pesan memang bersedia menerima pesan Anda. Mengirim broadcast ke nomor acak yang tidak Anda kenal akan menyebabkan mereka memencet tombol 'Laporkan Spam' di layar chat." },
      { type: "h2", text: "4. Sediakan Pilihan Berhenti Berlangganan (Opt-out)" },
      { type: "p", text: "Tambahkan kalimat penutup yang sopan seperti 'Balas STOP untuk berhenti menerima info ini'. Cara ini jauh lebih aman daripada memaksa penerima untuk memblokir nomor Anda secara langsung." },
      { type: "h2", text: "5. Bersihkan Database Kontak Anda secara Rutin" },
      { type: "p", text: "Kirim pesan ke nomor yang tidak aktif atau tidak valid secara berulang akan merusak reputasi nomor pengirim Anda. Bersihkan kontak mati dari daftar Anda." },
    ],
  },
  {
    slug: "integrasi-woocommerce-whatsapp",
    title: "Integrasikan WooCommerce ke WhatsApp Gateway dalam 10 Menit",
    excerpt: "Otomatiskan notifikasi pesanan baru dan invoice dari WooCommerce ke pelanggan via WhatsApp menggunakan REST API.",
    date: "2026-05-03",
    author: "Tim Rizquna",
    tag: "Integrasi",
    readTime: "8 menit",
    content: [
      { type: "p", text: "Mengirimkan konfirmasi pesanan otomatis ke pembeli lewat WhatsApp terbukti meningkatkan konversi dan tingkat kepercayaan pembeli. Anda dapat mengintegrasikannya dengan sangat mudah menggunakan webhook atau kode PHP sederhana di WooCommerce." },
      { type: "h2", text: "1. Buat API Key di Rizquna" },
      { type: "p", text: "Login ke dashboard akun Rizquna Anda, pilih menu API Keys, lalu buat key baru." },
      { type: "h2", text: "2. Buat Snippet Kode Integrasi" },
      { type: "p", text: "Anda dapat meletakkan kode PHP berikut di file functions.php tema child WordPress Anda untuk mengirim pesan teks otomatis saat pesanan selesai:" },
      { type: "code", lang: "php", text: "<?php\nadd_action('woocommerce_thankyou', function($order_id) {\n  $order = wc_get_order($order_id);\n  $phone = $order->get_billing_phone();\n  $name  = $order->get_billing_first_name();\n  $total = number_format($order->get_total(), 0, ',', '.');\n\n  // Bersihkan format nomor ke standar internasional\n  $phone = preg_replace('/[^0-9]/', '', $phone);\n  if (str_starts_with($phone, '0')) {\n    $phone = '62' . substr($phone, 1);\n  }\n\n  wp_remote_post('https://wa.rizquna.id/api/v1/messages', [\n    'headers' => [\n      'Authorization' => 'Bearer YOUR_API_KEY',\n      'Content-Type'  => 'application/json',\n    ],\n    'body' => wp_json_encode([\n      'to'   => $phone,\n      'type' => 'text',\n      'text' => [\n        'body' => \"Halo $name, pesanan #$order_id sebesar Rp $total sedang kami proses. Terima kasih!\"\n      ]\n    ]),\n  ]);\n});" },
      { type: "p", text: "Simpan perubahan dan jalankan tes pembelian. Notifikasi WhatsApp akan masuk ke nomor pembeli secara real-time." },
    ],
  },
  {
    slug: "ai-bot-untuk-cs-umkm",
    title: "Bagaimana AI Bot Membantu CS UMKM Melayani Pelanggan 24/7",
    excerpt: "Studi kasus implementasi AI Smart Bot untuk menjawab otomatis pertanyaan customer service di toko online Anda.",
    date: "2026-04-25",
    author: "Tim Rizquna",
    tag: "Use Case",
    readTime: "5 menit",
    content: [
      { type: "p", text: "Pelanggan mengharapkan respon cepat kapan saja mereka mengirim chat. Integrasikan webhook auto-reply untuk merespon FAQ pelanggan toko online Anda tanpa henti." },
      { type: "h2", text: "Beberapa Skenario Penggunaan AI Bot" },
      { type: "ul", items: [
        "Membalas otomatis pertanyaan mengenai jam operasional dan lokasi toko.",
        "Mengirim link katalog produk atau detail produk terpopuler.",
        "FAQ tentang metode pembayaran dan info pengembalian barang.",
        "Mengirim link pembayaran invoice secara instan.",
      ] },
      { type: "h2", text: "Pengaturan Handover ke Manusia" },
      { type: "p", text: "Gunakan logika handover. Jika bot tidak mendeteksi kata kunci yang sesuai atau jika pelanggan mengetik kata kunci tertentu seperti 'bantuan admin', bot akan mematikan auto-responder untuk sesi tersebut dan menandainya agar dilayani oleh CS manusia." },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}