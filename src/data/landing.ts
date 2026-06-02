import { BarChart3, Bot, Inbox, Send } from "lucide-react";

export const FEATURES = [
  { icon: Send, title: "Kirim Pesan", desc: "Kirim notifikasi, OTP, dan pesan follow-up via WhatsApp API Gateway." },
  { icon: Inbox, title: "Inbox Terpusat", desc: "Kelola percakapan pelanggan dari satu dashboard yang mudah digunakan." },
  { icon: Bot, title: "Otomasi", desc: "Hubungkan webhook dan REST API untuk alur kerja otomatis." },
  { icon: BarChart3, title: "Analytics", desc: "Pantau status pengiriman, performa pesan, dan aktivitas pelanggan." },
];

export const CUSTOMERS = [
  { name: "UMKM Nusantara" },
  { name: "Toko Online" },
  { name: "Klinik Sehat" },
  { name: "Komunitas Digital" },
  { name: "Startup Lokal" },
];

export const INTEGRATIONS = [
  { name: "WooCommerce", code: "Woo", tag: "Ecommerce", color: "#7f54b3" },
  { name: "Shopify", code: "Shp", tag: "Store", color: "#95bf47" },
  { name: "Google Sheets", code: "GSh", tag: "Data", color: "#0f9d58" },
  { name: "Zapier", code: "Zap", tag: "Automation", color: "#ff4a00" },
  { name: "Laravel", code: "Lv", tag: "Backend", color: "#ff2d20" },
  { name: "WordPress", code: "WP", tag: "CMS", color: "#21759b" },
  { name: "Midtrans", code: "Pay", tag: "Payment", color: "#00a3e0" },
  { name: "Webhook", code: "API", tag: "Custom", color: "#25d366" },
];

export const USE_CASES = [
  {
    eyebrow: "Ecommerce",
    title: "Notifikasi Order Otomatis",
    items: ["Konfirmasi pesanan", "Update pembayaran", "Nomor resi", "Follow-up pelanggan"],
  },
  {
    eyebrow: "Layanan",
    title: "Reminder & Customer Care",
    items: ["Reminder janji", "OTP login", "Broadcast legal", "Inbox support"],
  },
];
