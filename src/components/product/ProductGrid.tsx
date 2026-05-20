import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        {(title || subtitle) && (
          <header className="relative mb-16 md:mb-20">
            <div className="max-w-xl">
              {subtitle && (
                <p className="eyebrow mb-5 border-l border-champagne/80 pl-4">{subtitle}</p>
              )}
              {title && (
                <h2 className="display-heading">{title}</h2>
              )}
            </div>
            <div className="mt-10 h-px w-full max-w-md bg-gradient-to-r from-champagne/50 to-transparent" aria-hidden />
          </header>
        )}
        <div className="grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
