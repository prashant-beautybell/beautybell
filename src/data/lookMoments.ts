import { products } from "./products";

/** Short clips for “Shop the look” — hosted locally (Mixkit/Pexels block hotlinking) */
export interface LookMoment {
  id: string;
  productSlug: string;
  name: string;
  price: number;
  poster: string;
  video: string;
  /** Visual tier for staggered card heights (0 = shortest, 2 = tallest) */
  tier: 0 | 1 | 2;
}

const localClips = [
  "/videos/look-1.mp4",
  "/videos/look-2.mp4",
  "/videos/look-3.mp4",
  "/videos/look-4.mp4",
  "/videos/look-5.mp4",
];

const tiers: Array<0 | 1 | 2> = [0, 1, 2, 1, 0];

export const lookMoments: LookMoment[] = products.slice(0, 5).map((p, i) => ({
  id: `look-${p.id}`,
  productSlug: p.slug,
  name: p.name,
  price: p.price,
  poster: p.images[0],
  video: localClips[i] ?? localClips[0],
  tier: tiers[i] ?? 1,
}));
