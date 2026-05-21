import type { Category } from "../types";

export interface PageHeroMedia {
  image: string;
}

const img = (id: string, w = 1280) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categoryHeroMedia: Record<Category, PageHeroMedia> = {
  face: { image: img("photo-1556228578-0d85b1a4d571") },
  skincare: { image: img("photo-1620916566398-39f1143ab7be") },
  eyes: { image: img("photo-1612817288484-6f916006741a") },
  lips: { image: img("photo-1556228720-195a672e8a03") },
};

/** Thumbnail URLs for home category grid */
export const categoryThumbImages: Record<Category, string> = {
  face: img("photo-1556228578-0d85b1a4d571", 720),
  skincare: img("photo-1620916566398-39f1143ab7be", 720),
  eyes: img("photo-1612817288484-6f916006741a", 720),
  lips: img("photo-1556228720-195a672e8a03", 720),
};

export const staticPageHeroes = {
  about: {
    image: img("photo-1522335789203-aabd1fc54bc9"),
    eyebrow: "Origine",
    title: "The discipline of luminous restraint",
  },
  contact: {
    image: img("photo-1596755389378-c31d21fd1273"),
    eyebrow: "Concierge",
    title: "Correspondence",
    description:
      "We reply with the same punctuality we expect from our pigments. Hours for the desk are listed beside.",
  },
} as const;
