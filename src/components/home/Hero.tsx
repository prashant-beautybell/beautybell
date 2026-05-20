import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HERO_AUTOPLAY_MS, heroSlides } from "../../data/heroSlides";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = heroSlides.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, HERO_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, count]);

  const slide = heroSlides[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#e8e4df]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9] lg:max-h-[min(88vh,820px)]">
        {heroSlides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        ))}

        <div
          className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent lg:hidden"
          aria-hidden
        />

        <div className="absolute inset-0 flex items-center">
          <div className="container-luxury w-full py-16 lg:py-0">
            <div key={slide.id} className="max-w-md px-1 sm:max-w-lg">
              <p className="font-wordmark text-lg italic text-ink/90 md:text-xl">
                {slide.eyebrow}
              </p>
              <h1 className="mt-2 font-wordmark text-[clamp(2.25rem,5.5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
                {slide.title}
                {slide.titleLine2 && (
                  <>
                    <br />
                    {slide.titleLine2}
                  </>
                )}
              </h1>
              <Link
                to={slide.href}
                className="mt-8 inline-flex min-h-11 items-center justify-center border border-ink bg-transparent px-10 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-white sm:flex"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-white sm:flex"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-8 bg-ink"
                  : "w-2 bg-ink/30 hover:bg-ink/50"
              }`}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
