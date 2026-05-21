import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { lookMoments } from "../../data/lookMoments";
import { formatGbp } from "../../lib/formatPrice";

const tierHeights: Record<0 | 1 | 2, string> = {
  0: "min-h-[280px] sm:min-h-[300px]",
  1: "min-h-[340px] sm:min-h-[380px]",
  2: "min-h-[400px] sm:min-h-[460px]",
};

export function ShopTheLook() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = useCallback((id: string) => {
    setPlayingId((current) => (current === id ? null : id));
  }, []);

  useEffect(() => {
    lookMoments.forEach((moment) => {
      const el = videoRefs.current[moment.id];
      if (!el) return;

      if (playingId === moment.id) {
        el.muted = true;
        el.playsInline = true;
        const start = () => {
          el.play().catch(() => {
            setLoadErrors((e) => ({ ...e, [moment.id]: true }));
            setPlayingId(null);
          });
        };
        if (el.readyState >= 2) start();
        else {
          el.load();
          el.addEventListener("canplay", start, { once: true });
        }
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [playingId]);

  return (
    <section className="section-padding bg-surface">
      <div className="container-luxury">
        <header className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ink-light">
              Shop the look
            </p>
            <h2 className="mt-2 font-wordmark text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
              See it in motion
            </h2>
          </div>
          <p className="max-w-xs font-sans text-sm font-light text-ink-light">
            Tap a moment to play. Tap again to pause.
          </p>
        </header>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 scroll-smooth sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
          {lookMoments.map((moment) => {
            const isPlaying = playingId === moment.id;
            const failed = loadErrors[moment.id];

            return (
              <article
                key={moment.id}
                className={`flex w-[72vw] max-w-[280px] shrink-0 flex-col sm:w-auto sm:max-w-none ${tierHeights[moment.tier]}`}
              >
                <button
                  type="button"
                  onClick={() => !failed && togglePlay(moment.id)}
                  disabled={failed}
                  className={`group relative flex flex-1 overflow-hidden rounded-2xl bg-cream text-left ring-1 ring-ink/[0.06] transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne disabled:cursor-default ${
                    isPlaying ? "shadow-lift ring-champagne/40" : "shadow-soft hover:shadow-lift"
                  }`}
                  aria-label={
                    failed
                      ? `${moment.name} video unavailable`
                      : isPlaying
                        ? `Pause ${moment.name} tutorial`
                        : `Play ${moment.name} tutorial`
                  }
                  aria-pressed={isPlaying}
                >
                  <img
                    src={moment.poster}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      isPlaying && !failed ? "opacity-0" : "opacity-100"
                    }`}
                    loading="lazy"
                  />
                  {isPlaying && !failed && (
                    <video
                      ref={(el) => {
                        videoRefs.current[moment.id] = el;
                      }}
                      src={moment.video}
                      className="absolute inset-0 h-full w-full object-cover opacity-100"
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onError={() =>
                        setLoadErrors((e) => ({ ...e, [moment.id]: true }))
                      }
                    />
                  )}
                  <span
                    className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/[0.04]"
                    aria-hidden
                  />
                  {!failed && (
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur-sm">
                      {isPlaying ? (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                        </svg>
                      ) : (
                        <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      )}
                    </span>
                  )}
                </button>

                <Link
                  to={`/product/${moment.productSlug}`}
                  className="mt-3 flex items-center gap-3 rounded-lg border border-ink/[0.08] bg-white p-3 transition-colors hover:border-ink/15"
                >
                  <img
                    src={moment.poster}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-wordmark text-sm leading-tight text-ink">
                      {moment.name}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs tabular-nums text-ink-light">
                      {formatGbp(moment.price)}
                    </span>
                  </span>
                  <svg
                    className="h-4 w-4 shrink-0 text-ink/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
                  </svg>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
