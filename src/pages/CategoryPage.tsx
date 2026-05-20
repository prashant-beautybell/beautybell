import { useParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { SEO } from "../components/ui/SEO";
import { categories, getProductsByCategory } from "../data/products";
import type { Category } from "../types";

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find((c) => c.id === categoryId);
  const products = categoryId
    ? getProductsByCategory(categoryId as Category)
    : [];

  if (!category) {
    return (
      <div className="container-luxury section-padding text-center">
        <h1 className="font-wordmark text-3xl text-ink">Lineage unavailable</h1>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${category.label} | BeautyBell`}
        description={`BeautyBell ${category.label.toLowerCase()}: ${category.description} Atelier pigments and complexion discipline.`}
      />

      <section className="relative overflow-hidden bg-midnight">
        <div
          className="absolute inset-0 opacity-[0.06]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-luxury relative py-28 text-center md:py-36">
          <div className="mx-auto mb-10 h-px w-16 bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
          <p className="mb-8 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/42">
            Lineage
          </p>
          <h1 className="font-wordmark text-[clamp(2.25rem,5vw,3.85rem)] font-normal tracking-[-0.02em] text-white/[0.96]">
            {category.label}
          </h1>
          <p className="mx-auto mt-8 max-w-md font-sans text-sm font-light leading-relaxed text-white/52">
            {category.description}. Each piece is calibrated to read composed at
            distance and immaculate in proximity.
          </p>
        </div>
      </section>

      <ProductGrid products={products} />
    </>
  );
}
