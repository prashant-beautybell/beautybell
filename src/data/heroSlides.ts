export interface HeroSlide {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  titleLine2?: string;
  cta: string;
  href: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "glass-skin",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "New",
    title: "Glass Skin",
    titleLine2: "Capsule",
    cta: "Shop serums",
    href: "/category/skincare",
  },
  {
    id: "cleanse",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Ritual",
    title: "Cleanse &",
    titleLine2: "Restore",
    cta: "Shop cleanse",
    href: "/category/face",
  },
  {
    id: "vitamin-c",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Bestseller",
    title: "Vitamin C",
    titleLine2: "Serum",
    cta: "Discover",
    href: "/product/vitamin-c-serum",
  },
  {
    id: "spf",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Daily defence",
    title: "SPF 50",
    titleLine2: "Sun Veil",
    cta: "Shop protect",
    href: "/category/lips",
  },
];

export const HERO_AUTOPLAY_MS = 6000;
