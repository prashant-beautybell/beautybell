import { useEffect, useRef, useState } from "react";

interface PageHeroProps {
  image: string;
  video?: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({
  image,
  video,
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = Boolean(video) && !videoFailed;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    const play = () => el.play().catch(() => setVideoFailed(true));
    if (el.readyState >= 2) play();
    else el.addEventListener("loadeddata", play, { once: true });
  }, [showVideo]);

  return (
    <section className="relative flex min-h-[42vh] items-center justify-center overflow-hidden sm:min-h-[48vh]">
      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={image}
          aria-hidden
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      <img
        src={image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          showVideo && videoReady ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchPriority="high"
        aria-hidden
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/55 to-midnight/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-midnight/40 via-transparent to-midnight/30"
        aria-hidden
      />

      <div className="container-luxury relative w-full py-24 text-center text-white md:py-32">
        <div
          className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-champagne/50 to-transparent md:mb-10"
          aria-hidden
        />
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
          {eyebrow}
        </p>
        <h1 className="mt-6 font-wordmark text-[clamp(2rem,5vw,3.85rem)] font-normal leading-[1.06] tracking-[-0.02em] text-white/[0.98]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-8 max-w-md font-sans text-sm font-light leading-relaxed text-white/60">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
