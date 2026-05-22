export interface HeroSlide {
  id: string;
  image: string;
  /** Background loop (local path or Pexels CDN) */
  video?: string;
  eyebrow: string;
  title: string;
  titleLine2?: string;
  cta: string;
  href: string;
}

/** One slide per hero video — copy is brand-wide so it fits any beauty B-roll */
export const heroSlides: HeroSlide[] = [
  {
    id: "atelier",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1280&q=80",
    video: "/videos/hero-6473746.mp4",
    eyebrow: "BEAUTY BELL",
    title: "Atelier",
    titleLine2: "Skincare",
    cta: "Shop the collection",
    href: "/category/skincare",
  },
  {
    id: "ritual",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1280&q=80",
    video: "/videos/hero-3181791.mp4",
    eyebrow: "The ritual",
    title: "Luminous",
    titleLine2: "Restraint",
    cta: "Explore cleanse",
    href: "/category/face",
  },
  {
    id: "formula",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1280&q=80",
    video: "/videos/hero-5468955.mp4",
    eyebrow: "Formulation",
    title: "Refined",
    titleLine2: "Actives",
    cta: "View serums",
    href: "/category/skincare",
  },
];

export const HERO_AUTOPLAY_MS = 7000;

/** Crossfade duration for hero video (ms) */
export const HERO_CROSSFADE_MS = 1400;

/** Delay before headline swaps — keeps copy aligned with visible video */
export const HERO_TEXT_SWAP_MS = HERO_CROSSFADE_MS;
