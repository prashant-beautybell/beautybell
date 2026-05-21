import { useParams } from "react-router-dom";
import { PageHero } from "../components/layout/PageHero";
import { ProductGrid } from "../components/product/ProductGrid";
import { SEO } from "../components/ui/SEO";
import { categoryHeroMedia } from "../data/pageHeroes";
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

      <PageHero
        image={categoryHeroMedia[category.id].image}
        eyebrow="Lineage"
        title={category.label}
        description={`${category.description}. Each piece is calibrated to read composed at distance and immaculate in proximity.`}
      />

      <ProductGrid products={products} />
    </>
  );
}
