import { Link } from "react-router-dom";
import { formatGbp } from "../../lib/formatPrice";
import type { Product } from "../../types";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  surface?: "light" | "dark";
}

export function ProductCard({ product, surface = "light" }: ProductCardProps) {
  const isDark = surface === "dark";

  return (
    <article className="group flex flex-col">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-sm shadow-card transition-[box-shadow] duration-500 ease-out group-hover:shadow-lift">
          <div className={`relative aspect-[3/4] overflow-hidden ${isDark ? "bg-midnight-elevated ring-1 ring-white/[0.07]" : "bg-cream"}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full scale-[1.01] object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className={`pointer-events-none absolute inset-0 ring-1 ring-inset ${isDark ? "ring-white/[0.05]" : "ring-ink/[0.04]"}`} aria-hidden />
            {product.isNew && (
              <span className="absolute left-3 top-3 border border-white/45 bg-black/35 px-2.5 py-1 backdrop-blur-sm font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                New
              </span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className="absolute left-3 top-3 border border-white/30 bg-black/35 px-2.5 py-1 backdrop-blur-sm font-sans text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                Maison
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 space-y-2.5 px-0.5">
          <div className={`flex items-start justify-between gap-3 border-b pb-3 ${isDark ? "border-white/[0.1]" : "border-ink/[0.06]"}`}>
            <div>
              <p
                className={`eyebrow-muted mb-1 capitalize ${isDark ? "!text-white/38" : ""}`}
              >
                {product.category}
              </p>
              <h3
                className={`font-wordmark text-[1.25rem] leading-snug tracking-[-0.01em] transition-colors duration-300 md:text-xl ${
                  isDark ? "text-white/[0.95] group-hover:text-champagne" : "text-ink group-hover:text-brand-dark"
                }`}
              >
                {product.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <StarRating rating={product.rating} size="sm" />
            <p
              className={`font-sans text-xs tabular-nums tracking-wide ${
                isDark ? "text-white/42" : "text-ink-light"
              }`}
            >
              {product.reviewCount.toLocaleString()} notes
            </p>
          </div>
          <p
            className={`font-sans text-sm font-normal tabular-nums tracking-[0.12em] ${
              isDark ? "text-white/85" : "text-ink"
            }`}
          >
            {formatGbp(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
