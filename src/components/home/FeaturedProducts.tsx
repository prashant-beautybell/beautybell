import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../data/products";
import { ProductCard } from "../product/ProductCard";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="section-padding bg-midnight text-white">
      <div className="container-luxury">
        <header className="mb-16 flex flex-col gap-10 border-b border-white/[0.1] pb-16 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-xl">
            <p className="mb-5 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/42">
              Atelier précis
            </p>
            <h2 className="font-wordmark text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] tracking-[-0.02em] text-white/[0.97]">
              Objects for the ceremonial surface
            </h2>
          </div>
          <Link
            to="/category/face"
            className="inline-flex shrink-0 items-center gap-3 font-sans text-[11px] uppercase tracking-[0.24em] text-champagne transition-opacity hover:opacity-80"
          >
            Traverse complete catalogue
            <span aria-hidden className="text-base leading-none opacity-70">
              ↗
            </span>
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-4 md:gap-x-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} surface="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
