import { Link } from "react-router-dom";
import { categories } from "../../data/products";

const categoryImages: Record<string, string> = {
  face: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=720&q=80",
  skincare: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=720&q=80",
  eyes: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=720&q=80",
  lips: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=720&q=80",
};

export function CategoryShowcase() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <header className="relative mb-16 md:mb-24">
          <p className="eyebrow mb-5 border-l border-brand/35 pl-4">Catalogue</p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display-heading max-w-2xl">Disciplined categories</h2>
            <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-ink-light">
              Each lineage is distilled to essentials. Nothing ornamental without
              function.
            </p>
          </div>
          <div className="mt-12 h-px w-full bg-gradient-to-r from-ink/[0.12] via-transparent to-transparent" aria-hidden />
        </header>

        <div className="grid grid-cols-1 gap-px bg-ink/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group relative aspect-[10/13] overflow-hidden bg-surface lg:aspect-[11/14]"
            >
              <img
                src={categoryImages[cat.id]}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/25 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-champagne/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-wordmark text-2xl text-white md:text-3xl">{cat.label}</h3>
                <p className="mt-2 max-w-[14rem] font-sans text-xs font-light leading-relaxed text-white/55">
                  {cat.description}
                </p>
                <span className="mt-5 inline-block font-sans text-[10px] uppercase tracking-[0.26em] text-white/40 transition-colors group-hover:text-champagne">
                  View lineage →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
