import type { Category, Product } from "../types";

export const categories: { id: Category; label: string; description: string }[] =
  [
    { id: "face", label: "Cleanse", description: "Purifying cleansers, toners, and makeup removal" },
    { id: "skincare", label: "Serums & Creams", description: "Targeted actives, hydration, and daily moisture" },
    { id: "eyes", label: "Eye Care", description: "Delicate formulas for the eye area" },
    { id: "lips", label: "Masks & Protect", description: "Weekly rituals, body glow, and SPF defence" },
  ];

const IMAGES = {
  cleanse: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
  serum: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
  cream: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
  mask: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
  oil: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
  spf: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
  toner: "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80",
  eye: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/%/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ProductSeed = {
  name: string;
  category: Category;
  price: number;
  shortDescription: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

const productSeeds: ProductSeed[] = [
  {
    name: "Deep Cleansing Foam",
    category: "face",
    price: 32,
    shortDescription: "Cloud-soft foam that lifts impurities without stripping.",
    description:
      "Deep Cleansing Foam transforms into a fine, cushiony lather that dissolves daily buildup, SPF residue, and urban pollution. Skin feels refreshed, balanced, and never tight.",
    ingredients: ["Glycerin", "Cocamidopropyl Betaine", "Niacinamide", "Aloe Vera", "Panthenol"],
    benefits: ["Deep cleanse", "pH-balanced", "Non-drying", "Suitable for daily use"],
    howToUse: "Massage one pump onto damp skin for 60 seconds, then rinse with lukewarm water. Follow with toner.",
    image: IMAGES.cleanse,
    isBestseller: true,
  },
  {
    name: "Exfoliating Face Wash",
    category: "face",
    price: 34,
    shortDescription: "Gentle chemical and physical exfoliation in one wash.",
    description:
      "Exfoliating Face Wash refines texture with a measured blend of smooth polishing particles and fruit enzymes. Use two to three times weekly for a clearer, more even complexion.",
    ingredients: ["Jojoba Esters", "Papaya Enzyme", "Glycolic Acid", "Vitamin E", "Green Tea Extract"],
    benefits: ["Smoother skin", "Unclogs pores", "Brightening", "Weekly renewal"],
    howToUse: "Apply to damp skin, massage in circular motions for 30 seconds, rinse thoroughly. Avoid the eye area.",
    image: IMAGES.toner,
  },
  {
    name: "Purifying Makeup Remover",
    category: "face",
    price: 28,
    shortDescription: "First-step cleanse that melts makeup and sunscreen.",
    description:
      "Purifying Makeup Remover is a lightweight oil-gel that emulsifies on contact with water, dissolving long-wear makeup and SPF without residue. The ideal first step in a double cleanse.",
    ingredients: ["Squalane", "Sunflower Seed Oil", "Vitamin E", "Chamomile Extract"],
    benefits: ["Removes waterproof makeup", "Rinses clean", "No greasy film", "First cleanse essential"],
    howToUse: "Apply to dry skin, massage until makeup dissolves, add water to emulsify, then rinse or follow with Deep Cleansing Foam.",
    image: IMAGES.oil,
    isNew: true,
  },
  {
    name: "Refreshing & Hydrating Toner",
    category: "face",
    price: 36,
    shortDescription: "Alcohol-free toner that rebalances and preps skin.",
    description:
      "Refreshing & Hydrating Toner restores moisture immediately after cleansing. Botanical waters and humectants soften skin and improve absorption of serums that follow.",
    ingredients: ["Rose Water", "Hyaluronic Acid", "Panthenol", "Allantoin", "Witch Hazel"],
    benefits: ["Instant hydration", "pH prep", "Soothes", "Alcohol-free"],
    howToUse: "Sweep across face and neck with palms or a cotton pad morning and evening before serums.",
    image: IMAGES.toner,
    isBestseller: true,
  },
  {
    name: "Rejuvenating Eye Cream",
    category: "eyes",
    price: 58,
    shortDescription: "Firming eye cream for fine lines and morning puffiness.",
    description:
      "Rejuvenating Eye Cream targets the delicate orbital area with peptides and caffeine to visibly smooth crepey lines and brighten dark circles over time.",
    ingredients: ["Peptides", "Caffeine", "Hyaluronic Acid", "Shea Butter", "Vitamin K"],
    benefits: ["Reduces puffiness", "Firms", "Hydrates", "Ophthalmologist tested"],
    howToUse: "Pat a rice-grain amount around the orbital bone morning and evening using your ring finger.",
    image: IMAGES.eye,
    isBestseller: true,
  },
  {
    name: "Glass Skin Cream",
    category: "skincare",
    price: 72,
    shortDescription: "Lightweight cream for a dewy, glass-skin finish.",
    description:
      "Glass Skin Cream delivers a translucent, lit-from-within glow with a gel-cream texture that layers seamlessly under makeup or worn alone for bare-skin radiance.",
    ingredients: ["Hyaluronic Acid", "Squalane", "Niacinamide", "Pearl Extract", "Ceramides"],
    benefits: ["Dewy finish", "Plumping hydration", "Smooths texture", "Makeup-friendly"],
    howToUse: "Apply after serums, pressing into skin until absorbed. Use AM and PM.",
    image: IMAGES.cream,
    isBestseller: true,
    isNew: true,
  },
  {
    name: "Replenishing Moisturiser",
    category: "skincare",
    price: 54,
    shortDescription: "Daily moisturiser that restores comfort and barrier strength.",
    description:
      "Replenishing Moisturiser wraps skin in lasting hydration with ceramides and botanical lipids. Ideal for normal to dry skin seeking a soft, supple finish.",
    ingredients: ["Ceramides", "Shea Butter", "Glycerin", "Cholesterol", "Oat Extract"],
    benefits: ["Barrier support", "24-hour comfort", "Non-greasy", "Fragrance-light"],
    howToUse: "Smooth over face and neck as the final moisture step in your routine.",
    image: IMAGES.cream,
  },
  {
    name: "Peptide Infused Cream",
    category: "skincare",
    price: 86,
    shortDescription: "Firming cream powered by multi-peptide complex.",
    description:
      "Peptide Infused Cream supports collagen signalling and elasticity with a concentrated peptide matrix. Skin appears lifted, denser, and more resilient with consistent use.",
    ingredients: ["Matrixyl", "Argireline", "Copper Peptides", "Squalane", "Vitamin E"],
    benefits: ["Firms", "Smooths fine lines", "Elasticity", "Night or day"],
    howToUse: "Massage into face and neck after serum. Best results with nightly use.",
    image: IMAGES.cream,
    isBestseller: true,
  },
  {
    name: "Vitamin C Serum",
    category: "skincare",
    price: 64,
    shortDescription: "Brightening serum with stabilised vitamin C.",
    description:
      "Vitamin C Serum illuminates dull tone and defends against environmental stress with L-ascorbic acid and ferulic acid in a fast-absorbing, silky base.",
    ingredients: ["L-Ascorbic Acid", "Ferulic Acid", "Vitamin E", "Hyaluronic Acid"],
    benefits: ["Brightens", "Antioxidant defence", "Evens tone", "Radiance"],
    howToUse: "Apply 3–4 drops to cleansed skin each morning before moisturiser and SPF.",
    image: IMAGES.serum,
    isBestseller: true,
  },
  {
    name: "Glass Skin Serum",
    category: "skincare",
    price: 68,
    shortDescription: "Hydrating serum for glass-skin luminosity.",
    description:
      "Glass Skin Serum layers multiple weights of hyaluronic acid with polyglutamic acid for a bouncy, reflective glow without stickiness.",
    ingredients: ["Hyaluronic Acid", "Polyglutamic Acid", "Beta-Glucan", "Panthenol"],
    benefits: ["Glass-skin glow", "Deep hydration", "Plumping", "Layers well"],
    howToUse: "Press into damp skin after toner, before cream. Use morning and evening.",
    image: IMAGES.serum,
    isNew: true,
  },
  {
    name: "Retinol Infused Serum",
    category: "skincare",
    price: 78,
    shortDescription: "Overnight retinol serum for texture and fine lines.",
    description:
      "Retinol Infused Serum gradually renews skin with encapsulated retinol and soothing bisabolol. Expect smoother texture and a more even tone with disciplined evening use.",
    ingredients: ["Encapsulated Retinol", "Squalane", "Bisabolol", "Ceramides"],
    benefits: ["Refines pores", "Smooths lines", "Evens tone", "Night renewal"],
    howToUse: "Apply 2–3 drops at night only. Start twice weekly, build to nightly. Always use SPF by day.",
    image: IMAGES.serum,
    isBestseller: true,
  },
  {
    name: "10% Niacinimide Serum",
    category: "skincare",
    price: 48,
    shortDescription: "Clarifying serum for pores, redness, and uneven tone.",
    description:
      "10% Niacinimide Serum balances oil production and calms visible redness with a high-strength niacinamide blend and zinc PCA.",
    ingredients: ["Niacinamide", "Zinc PCA", "Hyaluronic Acid", "Allantoin"],
    benefits: ["Minimises pores", "Oil control", "Calms redness", "Barrier-friendly"],
    howToUse: "Apply a few drops to face morning or evening after toner, before moisturiser.",
    image: IMAGES.serum,
    isBestseller: true,
  },
  {
    name: "Hyaluronic Booster Serum",
    category: "skincare",
    price: 52,
    shortDescription: "Multi-weight hyaluronic serum for instant plumpness.",
    description:
      "Hyaluronic Booster Serum floods skin with moisture across surface and deeper layers, reducing the look of dehydration lines within minutes.",
    ingredients: ["Sodium Hyaluronate", "Hydrolysed Hyaluronic Acid", "Panthenol", "Aloe Vera"],
    benefits: ["Instant plump", "All skin types", "Preps skin", "Non-sticky"],
    howToUse: "Apply to damp skin before other serums or mix with moisturiser.",
    image: IMAGES.serum,
  },
  {
    name: "Collagen Activating Serum",
    category: "skincare",
    price: 82,
    shortDescription: "Advanced serum to support skin density and bounce.",
    description:
      "Collagen Activating Serum combines signal peptides and botanical collagen boosters to improve firmness and rebound in mature or fatigued skin.",
    ingredients: ["Signal Peptides", "Bakuchiol", "Vitamin C", "Squalane"],
    benefits: ["Improves bounce", "Firms", "Hydrates", "Age-supporting"],
    howToUse: "Use 3–4 drops morning and evening after toner, before cream.",
    image: IMAGES.serum,
  },
  {
    name: "HydraPeel Mask",
    category: "lips",
    price: 42,
    shortDescription: "Hydrating peel-off mask for instant smoothness.",
    description:
      "HydraPeel Mask is a spa-at-home treatment that lifts away dull surface cells while leaving a veil of hydration for baby-soft skin in fifteen minutes.",
    ingredients: ["Polyvinyl Alcohol", "Hyaluronic Acid", "Aloe Vera", "Panthenol"],
    benefits: ["Instant smoothness", "Hydrating peel", "Weekly glow", "Refines"],
    howToUse: "Apply an even layer, avoid brows and hairline. Leave 15 minutes, peel off gently, rinse residue.",
    image: IMAGES.mask,
    isNew: true,
  },
  {
    name: "Detoxifying Clay Mask",
    category: "lips",
    price: 38,
    shortDescription: "Kaolin clay mask to purify pores and absorb excess oil.",
    description:
      "Detoxifying Clay Mask draws out congestion with kaolin and bentonite clays while keeping skin comfortable with aloe and chamomile.",
    ingredients: ["Kaolin", "Bentonite", "Charcoal", "Aloe Vera", "Chamomile"],
    benefits: ["Purifies", "Mattifies", "Refines pores", "Weekly detox"],
    howToUse: "Apply to clean skin, leave 10 minutes, rinse with warm water. Use once or twice weekly.",
    image: IMAGES.mask,
  },
  {
    name: "Body & Hair Shimmer Oil",
    category: "lips",
    price: 44,
    shortDescription: "Fine shimmer oil for body and hair with a soft glow.",
    description:
      "Body & Hair Shimmer Oil imparts a champagne sheen to shoulders, collarbones, and ends of hair without grit or grease. A finishing touch for evening rituals.",
    ingredients: ["Argan Oil", "Coconut Alkanes", "Mica", "Vitamin E"],
    benefits: ["Soft shimmer", "Nourishing", "Multi-use", "Fast-absorbing"],
    howToUse: "Warm a few drops between palms and sweep over body or hair ends as desired.",
    image: IMAGES.oil,
    isNew: true,
  },
  {
    name: "SPF 50 Sun Veil",
    category: "lips",
    price: 46,
    shortDescription: "Weightless broad-spectrum SPF 50 for daily protection.",
    description:
      "SPF 50 Sun Veil is a fluid, invisible sunscreen that shields against UVA and UVB with a satin-matte finish ideal under makeup or alone.",
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide", "Vitamin E"],
    benefits: ["SPF 50", "No white cast", "Broad spectrum", "Daily essential"],
    howToUse: "Apply generously as the last step of your morning routine. Reapply every two hours in direct sun.",
    image: IMAGES.spf,
    isBestseller: true,
  },
  {
    name: "Dry Oil Elixir",
    category: "lips",
    price: 56,
    shortDescription: "Silken dry oil for face, body, and hair nourishment.",
    description:
      "Dry Oil Elixir blends rosehip, marula, and camellia oils in a fast-evaporating formula that nourishes without heaviness. A universal finisher for dull skin.",
    ingredients: ["Rosehip Oil", "Marula Oil", "Camellia Oil", "Tocopherol"],
    benefits: ["Non-greasy", "Multi-use", "Nourishing", "Natural glow"],
    howToUse: "Press a few drops into skin after moisturiser, or mix with cream for enhanced slip.",
    image: IMAGES.oil,
  },
];

function buildProduct(seed: ProductSeed, index: number): Product {
  const id = String(index + 1);
  const rating = 4.7 + (index % 3) * 0.1;
  const reviewCount = 2400 + index * 137;

  return {
    id,
    slug: slugify(seed.name),
    name: seed.name,
    category: seed.category,
    price: seed.price,
    shortDescription: seed.shortDescription,
    description: seed.description,
    ingredients: seed.ingredients,
    benefits: seed.benefits,
    howToUse: seed.howToUse,
    images: [seed.image, IMAGES.serum],
    shades: [{ id: "universal", name: "Universal", hex: "#f5f0eb" }],
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviewCount,
    reviews:
      index < 3
        ? [
            {
              id: `r-${id}`,
              author: "Verified client",
              rating: 5,
              date: "2026-04-10",
              comment: `${seed.name} has become a staple in my routine. Beautiful texture and visible results.`,
            },
          ]
        : [],
    isNew: seed.isNew,
    isBestseller: seed.isBestseller,
  };
}

export const products: Product[] = productSeeds.map(buildProduct);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller || p.isNew).slice(0, 4);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
