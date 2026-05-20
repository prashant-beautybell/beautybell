const testimonials = [
  {
    id: 1,
    quote:
      "Velvet Luminous resolves like atmosphere on the skin — never a veneer, never a disguise. BeautyBell rewired how I perceive base.",
    author: "Elena M.",
    location: "Mayfair",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Silk Velvet in Rose wears like hushed suede. Pigment behaves; the edge stays immaculate through hours of dining light.",
    author: "Sophie L.",
    location: "Marais",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Radiance Renewal is not glare. It is structure under glass — luminous without theatrics.",
    author: "Diana W.",
    location: "Marylebone",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <header className="relative mb-20 text-center md:mb-28">
          <div className="hairline-horizontal mb-10" />
          <p className="eyebrow mb-6">Audience</p>
          <h2 className="display-heading mx-auto max-w-[18ch]">
            Notes from the salons
          </h2>
          <p className="mx-auto mt-8 max-w-md font-sans text-sm font-light leading-relaxed tracking-wide text-ink-light">
            Patrons fluent in restraint. Their language aligns with ours: texture,
            comportment, and light under control.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="relative flex flex-col border border-ink/[0.07] bg-surface px-8 py-10 pt-14 shadow-soft"
            >
              <span
                aria-hidden
                className="absolute left-8 top-6 font-wordmark text-5xl italic leading-none text-champagne/50"
              >
                &ldquo;
              </span>
              <div className="mb-5 flex gap-0.5" aria-hidden>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-3 w-3 text-champagne"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="flex-1 font-wordmark text-xl font-normal italic leading-snug tracking-[-0.01em] text-ink">
                {t.quote}
              </p>
              <footer className="mt-10 border-t border-ink/[0.06] pt-6">
                <cite className="not-italic">
                  <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                    {t.author}
                  </span>
                  <span className="mt-1 block font-sans text-[11px] font-light uppercase tracking-[0.18em] text-ink-light">
                    {t.location}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-16 text-center font-sans text-[11px] font-light uppercase tracking-[0.24em] text-ink-light">
          Averaged <span className="text-champagne">4.9</span> over{" "}
          <span className="text-ink">12&nbsp;847</span> verified correspondences
        </p>
      </div>
    </section>
  );
}
