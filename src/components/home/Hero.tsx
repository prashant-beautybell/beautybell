import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HERO_AUTOPLAY_MS,
  HERO_CROSSFADE_MS,
  HERO_TEXT_SWAP_MS,
  heroSlides,
} from "../../data/heroSlides";

const crossfadeStyle = {
  transitionProperty: "opacity",
  transitionDuration: `${HERO_CROSSFADE_MS}ms`,
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
};

function posterUrl(image: string) {
  return image.includes("w=")
    ? image.replace(/w=\d+/, "w=1280")
    : `${image}&w=1280`;
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const count = heroSlides.length;

  const nextIndex = (activeIndex + 1) % count;
  const mountedIndices = [activeIndex, nextIndex];

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

  useEffect(() => {
    const timer = setTimeout(() => setTextIndex(activeIndex), HERO_TEXT_SWAP_MS);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  /** Only play the active clip; pause others to save CPU and bandwidth */
  useEffect(() => {
    heroSlides.forEach((slide, i) => {
      const el = videoRefs.current[slide.id];
      if (!el || !slide.video || failedVideos[slide.id]) return;

      if (i === activeIndex && !isPaused) {
        const play = () => el.play().catch(() => {
          setFailedVideos((prev) => ({ ...prev, [slide.id]: true }));
        });
        if (el.readyState >= 2) play();
        else el.addEventListener("loadeddata", play, { once: true });
      } else {
        el.pause();
      }
    });
  }, [activeIndex, failedVideos, isPaused]);

  const layerClass = (isActive: boolean) =>
    `absolute inset-0 h-full w-full object-cover ${
      isActive ? "z-[2] opacity-100" : "z-[1] opacity-0"
    }`;

  const copy = heroSlides[textIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-midnight"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9] lg:max-h-[min(88vh,820px)]">
        {heroSlides.map((s, i) => (
          <img
            key={`${s.id}-poster`}
            src={posterUrl(s.image)}
            alt=""
            className={layerClass(i === activeIndex)}
            style={crossfadeStyle}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            aria-hidden
          />
        ))}

        {heroSlides.map((s, i) => {
          if (!s.video || failedVideos[s.id] || !mountedIndices.includes(i)) {
            return null;
          }

          const isActive = i === activeIndex;

          return (
            <video
              key={s.id}
              ref={(el) => {
                videoRefs.current[s.id] = el;
              }}
              className={layerClass(isActive)}
              style={crossfadeStyle}
              muted
              loop
              playsInline
              preload={isActive ? "auto" : "metadata"}
              poster={posterUrl(s.image)}
              aria-hidden
              onError={() =>
                setFailedVideos((prev) => ({ ...prev, [s.id]: true }))
              }
            >
              <source src={s.video} type="video/mp4" />
            </video>
          );
        })}

        <div
          className="absolute inset-0 z-[3] bg-gradient-to-r from-midnight/90 via-midnight/45 to-midnight/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[3] bg-gradient-to-t from-midnight/60 via-transparent to-midnight/25 lg:hidden"
          aria-hidden
        />

        <div className="absolute inset-0 z-[4] flex items-center">
          <div className="container-luxury w-full py-16 lg:py-0">
            <div
              key={copy.id}
              className="max-w-md px-1 transition-opacity duration-500 ease-out sm:max-w-lg"
            >
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/90">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 font-wordmark text-[clamp(2.25rem,5.5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-white/[0.98]">
                {copy.title}
                {copy.titleLine2 && (
                  <>
                    <br />
                    <span className="text-white/90">{copy.titleLine2}</span>
                  </>
                )}
              </h1>
              <Link
                to={copy.href}
                className="mt-8 inline-flex min-h-11 items-center justify-center border border-white/50 bg-white/10 px-10 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold/20 hover:text-gold"
              >
                {copy.cta}
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:flex"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:flex"
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
              className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
                i === activeIndex
                  ? "w-8 bg-gold"
                  : "w-2 bg-white/35 hover:bg-white/55"
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
