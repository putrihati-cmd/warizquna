import type { Metadata } from "next";
import {
  Zap,
  Send,
  MessageSquare,
  Smartphone,
  Users,
  Upload,
  Megaphone,
  Calendar,
  Clock,
  Image as ImageIcon,
  FileText,
  Edit3,
  Repeat,
  Bot,
  Sparkles,
  Brain,
  Radio,
  BarChart3,
  Activity,
  AlertTriangle,
  Ticket,
  Key,
  UserCog,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fitur",
  description:
    "Fitur lengkap WhatsApp Gateway Rizquna: API gateway & webhook, inbox multi-agent, broadcast, auto reply, AI bot, dan analytics.",
};

type Feature = {
  icon: typeof Zap;
  emoji: string;
  title: string;
  desc: string;
  bullets: string[];
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    emoji: "🚀",
    title: "WhatsApp API Gateway & Client",
    desc: "Integrasikan nomor WhatsApp Anda dengan REST API sederhana. Kirim dan terima pesan secara otomatis menggunakan endpoint developer-friendly yang stabil.",
    bullets: ["REST API endpoint sederhana", "Dokumentasi lengkap", "Dashboard monitoring", "Integrasi webhook cepat"],
  },
  {
    icon: Send,
    emoji: "📤",
    title: "Send Unlimited Messages",
    desc: "Kirim pesan WhatsApp tanpa batasan kuota harian. Tingkatkan skala jangkauan marketing bisnis Anda ke seluruh database kontak.",
    bullets: ["Kirim ke seluruh database", "Tanpa limit harian dari Rizquna", "Skala enterprise", "Aman dari pemblokiran"],
  },
  {
    icon: MessageSquare,
    emoji: "💬",
    title: "Inbox & Percakapan",
    desc: "Dashboard inbox terpusat untuk mengelola seluruh percakapan WhatsApp bisnis Anda. Assign ke anggota tim, beri label, dan tambahkan catatan internal.",
    bullets: ["Thread per kontak", "Label & tag percakapan", "Assign ke anggota tim", "Pencarian full-text"],
  },
  {
    icon: Smartphone,
    emoji: "💻",
    title: "Multiple User WhatsApp Web",
    desc: "Satu akses dashboard WhatsApp yang bisa digunakan secara bersamaan oleh banyak CS Anda dari berbagai perangkat.",
    bullets: ["Bisa diakses dari mana saja", "Tanpa perlu scan QR berulang", "Multi-device support", "Cocok untuk tim WFH"],
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Manajemen Kontak & CRM",
    desc: "Kelola database pelanggan Anda. Buat grup kontak khusus dengan atribut custom untuk segmentasi presisi.",
    bullets: ["Custom field contact", "Grup kontak tak terbatas", "Segmentasi pelanggan", "Pencarian kontak cerdas"],
  },
  {
    icon: Upload,
    emoji: "📥",
    title: "Import & Export Contacts",
    desc: "Input nomor secara manual atau otomatis menggunakan fitur ini. Hanya sekali klik untuk memindahkan seluruh database Anda.",
    bullets: ["Upload via file Excel/CSV", "Export database kapan saja", "Mapping kolom otomatis", "Validasi nomor yang valid"],
  },
  {
    icon: Megaphone,
    emoji: "📢",
    title: "Broadcast & Scheduled Send",
    desc: "Kirim pesan massal ke ribuan kontak sekaligus dengan antrian otomatis dan jeda pengiriman cerdas untuk meminimalkan spam.",
    bullets: ["Bulk send ke banyak nomor", "Jadwal pengiriman", "Antrian otomatis (BullMQ)", "Rate limiting & delay cerdas"],
  },
  {
    icon: Calendar,
    emoji: "📅",
    title: "Custom Broadcast Scheduling",
    desc: "Buat pagi, kirim malam. Semua terserah Anda. Tentukan jam dan tanggal pengiriman sendiri.",
    bullets: ["Pilih jam pengiriman spesifik", "Otomatisasi zona waktu", "Bisa dibatalkan sebelum terkirim", "Penjadwalan kampanye rutin"],
  },
  {
    icon: Clock,
    emoji: "🕒",
    title: 'Smart "Perfect Timing"',
    desc: "Kami akan mengirimkan pesan Anda secara otomatis pada waktu dan jam terbaik agar tingkat interaksi pelanggan meningkat.",
    bullets: ["Algoritma waktu cerdas", "Tingkatkan open rate", "Cegah pelanggan terganggu", "Distribusi antrian halus"],
  },
  {
    icon: ImageIcon,
    emoji: "🖼️",
    title: "Attach Image on Broadcast",
    desc: "Buat isi pesan Anda lebih menarik dengan melampirkan gambar, video, atau dokumen langsung pada pesan broadcast.",
    bullets: ["Support gambar JPG/PNG", "Kirim dokumen PDF/DOCX", "Kirim video MP4", "Render media responsif"],
  },
  {
    icon: FileText,
    emoji: "📋",
    title: "Template Pesan Custom",
    desc: "Buat template pesan dengan variabel dinamis untuk mempermudah CS mengirim pesan berulang kepada pelanggan secara instan.",
    bullets: ["Pesan boilerplate praktis", "Variabel dinamis {{nama}}", "Dukungan attachment media", "Kelola template di satu tempat"],
  },
  {
    icon: Edit3,
    emoji: "✍️",
    title: "Fully Customizable Message",
    desc: "Buat isi pesan menjadi dinamis dengan menambahkan nama customer dan emoji agar terasa lebih personal.",
    bullets: ["Panggilan nama dinamis", "Dukungan emoji penuh", "Personalisasi sapaan", "Tingkatkan engagement"],
  },
  {
    icon: Repeat,
    emoji: "🔀",
    title: "Spintax Replacement",
    desc: "Fitur canggih yang dapat memanipulasi kata pada isi kalimat (word-by-word) di pesan Anda untuk variasi otomatis.",
    bullets: ["Variasi kalimat otomatis", "Hindari deteksi spam berlebihan", "Syntax mudah {Halo|Hai}", "Pesan terlihat natural"],
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "Auto Responder",
    desc: "Atur balasan otomatis untuk pesan masuk berdasarkan keyword atau kondisi tertentu. Tingkatkan response time 24/7.",
    bullets: ["Trigger berbasis keyword", "Template response", "Fallback ke agen manusia", "Statistik performa"],
  },
  {
    icon: Sparkles,
    emoji: "⚡",
    title: "Smart Auto Reply",
    desc: "Chatbot trigger manual untuk membalas pesan spesifik dengan cepat tanpa harus mengetik ulang berulang kali.",
    bullets: ["Shortcut balasan cepat", "Simpan FAQ pelanggan", "Tingkatkan efisiensi CS", "Hemat waktu operasional"],
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "AI Smart Bot Action",
    desc: "Bot AI canggih dengan berbagai action. Bikin aktivitas di WhatsApp jadi produktif dan responsif tanpa agen manusia.",
    bullets: ["Pemrosesan bahasa natural", "Action: beri tag/label", "Selesaikan order otomatis", "Pahami konteks percakapan"],
  },
  {
    icon: Radio,
    emoji: "📡",
    title: "Webhook Real-time",
    desc: "Terima notifikasi real-time untuk setiap event pesan: terkirim, terdelivery, dibaca, gagal. Forward ke sistem Anda.",
    bullets: ["Event types lengkap", "Retry otomatis (5x)", "Log history webhook", "Verifikasi challenge-response"],
  },
  {
    icon: BarChart3,
    emoji: "📊",
    title: "Analytics & Laporan",
    desc: "Pantau performa pengiriman pesan, delivery rate, dan statistik template dalam grafik visual yang mudah dibaca.",
    bullets: ["Grafik trend harian/mingguan", "Statistik per nomor WhatsApp", "Laporan biaya & usage", "Export CSV/Excel"],
  },
  {
    icon: Activity,
    emoji: "📈",
    title: "Broadcast Status Monitor",
    desc: "Pantau setiap status broadcast yang dikirimkan secara mendetail, mulai dari berhasil, pending atau gagal.",
    bullets: ["Live tracking monitor", "Status pending/sent/failed", "Lihat alasan gagal kirim", "Resume/Retry antrian error"],
  },
  {
    icon: AlertTriangle,
    emoji: "⚠️",
    title: "Penyaring Kata (Filter Spam)",
    desc: "Mencegah pengiriman pesan yang berisi kata-kata sensitif atau spam dengan sistem blacklist kata demi keamanan reputasi nomor Anda.",
    bullets: ["Deteksi kata sensitif otomatis", "Kurangi risiko laporan spam", "Daftar kata bisa dikustomisasi", "Peringatan sebelum dikirim"],
  },
  {
    icon: Ticket,
    emoji: "🎫",
    title: "Customer Ticketing System",
    desc: "Ubah percakapan penting menjadi tiket bantuan. Pantau resolusi masalah pelanggan dengan sistem terorganisir.",
    bullets: ["Ubah chat jadi tiket support", "Status: Open/Resolved", "Assign tiket ke spesialis", "Tracking performa resolusi"],
  },
  {
    icon: Key,
    emoji: "🔑",
    title: "API Key Management",
    desc: "Generate dan kelola API key per workspace. Setiap key memiliki permission scope dan rate limit sesuai paket.",
    bullets: ["Multiple API key support", "Permission scope", "Rate limiting per key", "Revoke akses kapanpun"],
  },
  {
    icon: UserCog,
    emoji: "👥",
    title: "Tim & Role Management",
    desc: "Undang anggota tim ke workspace dan atur akses berbasis role (RBAC): Owner, Admin, Member, Viewer.",
    bullets: ["Multi-user workspace", "4 level tingkatan role", "Izin berbasis fitur khusus", "Audit log aktivitas user"],
  },
  {
    icon: Lock,
    emoji: "🔒",
    title: "Keamanan Enterprise",
    desc: "Token dienkripsi AES-256-GCM, password di-hash bcrypt, dan API Key disimpan sebagai SHA-256 hash. Privasi Anda adalah prioritas.",
    bullets: ["Enkripsi AES-256-GCM", "TLS 1.3 transit data", "Token tidak pernah di-log", "Infrastruktur bersertifikat"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-16 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Semua yang
            <br />
            <span className="gradient-text">Anda Butuhkan</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Rizquna menyediakan tools lengkap untuk mengelola komunikasi WhatsApp bisnis Anda — dari
            API hingga inbox, dari broadcast hingga analytics.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "rgba(37,211,102,0.1)" }}
                  >
                    <span>{f.emoji}</span>
                  </div>
                  <Icon className="w-5 h-5" style={{ color: "var(--rizquna-green)" }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
                <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span style={{ color: "var(--rizquna-green)" }}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
