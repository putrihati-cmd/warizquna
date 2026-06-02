export function SectionHead({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const wrapper = align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl";
  return (
    <div className={`${wrapper} mb-12`}>
      {eyebrow && (
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--rizquna-green)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  highlight,
}: {
  title: string;
  subtitle?: string;
  highlight?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #25D36622, transparent 50%), radial-gradient(circle at 70% 30%, #128C7E22, transparent 50%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          {title}
          {highlight && (
            <>
              <br />
              <span className="gradient-text">{highlight}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
