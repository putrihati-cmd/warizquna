export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #25D36622, transparent 50%), radial-gradient(circle at 70% 60%, #128C7E22, transparent 50%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        {eyebrow && (
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--rizquna-green)" }}
          >
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
