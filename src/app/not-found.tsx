export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--rizquna-green)" }}>
        404
      </p>
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-2">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-base" style={{ color: "var(--text-secondary)" }}>
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-lg mt-7"
        style={{ background: "var(--rizquna-green)" }}
      >
        Kembali ke Beranda
      </a>
    </section>
  );
}
