import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductGrid } from "../components/product/ProductGrid";
import { ShadeSelector } from "../components/product/ShadeSelector";
import { StarRating } from "../components/product/StarRating";
import { Button } from "../components/ui/Button";
import { SEO } from "../components/ui/SEO";
import { useCart } from "../context/CartContext";
import { formatGbp } from "../lib/formatPrice";
import { getProductBySlug, getRelatedProducts } from "../data/products";

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(
    product?.shades[0]?.id ?? ""
  );
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container-luxury section-padding text-center">
        <h1 className="font-wordmark text-3xl">Product Not Found</h1>
        <Link to="/" className="mt-4 inline-block text-brand hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const productId = product.id;

  function handleAddToCart() {
    addItem(productId, selectedShade);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription}
      />

      <article className="section-padding">
        <div className="container-luxury">
          <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap gap-x-2 font-sans text-[11px] font-light uppercase tracking-[0.16em] text-ink-light">
            <Link to="/" className="hover:text-brand">
              Atelier
            </Link>
            <span aria-hidden>/</span>
            <Link
              to={`/category/${product.category}`}
              className="capitalize hover:text-brand"
            >
              {product.category}
            </Link>
            <span aria-hidden>/</span>
            <span className="normal-case tracking-normal text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-20">
            <div>
              <div className="aspect-square overflow-hidden rounded-sm bg-cream ring-1 ring-ink/[0.06]">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="mt-5 flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setSelectedImage(i)}
                      className={`aspect-square w-[4.75rem] overflow-hidden rounded-sm ring-1 ring-inset transition-opacity ${
                        selectedImage === i
                          ? "ring-champagne opacity-100"
                          : "ring-ink/[0.08] opacity-55 hover:opacity-95"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="h-px w-16 bg-gradient-to-r from-champagne/70 to-transparent" aria-hidden />
              <p className="eyebrow mt-6 capitalize">{product.category}</p>
              <h1 className="mt-4 font-wordmark text-[clamp(1.85rem,3.8vw,2.95rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-ink/[0.07] pb-6">
                <StarRating rating={product.rating} />
                <span className="font-sans text-xs font-light uppercase tracking-[0.16em] text-ink-light">
                  {product.rating} fidelity ·{" "}
                  <span className="tabular-nums">{product.reviewCount.toLocaleString()}</span>{" "}
                  correspondences
                </span>
              </div>

              <p className="mt-6 font-sans text-2xl font-light tabular-nums tracking-[0.08em] text-ink">
                {formatGbp(product.price)}
              </p>
              <p className="mt-6 font-sans text-[0.965rem] font-light leading-relaxed text-ink-light">
                {product.description}
              </p>

              <div className="mt-10">
                <ShadeSelector
                  shades={product.shades}
                  selectedId={selectedShade}
                  onSelect={setSelectedShade}
                />
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button fullWidth onClick={handleAddToCart}>
                  {added ? "Placed alongside order" : "Reserve in basket"}
                </Button>
                <Button variant="outline" fullWidth>
                  Private wishlist hold
                </Button>
              </div>

              <div className="mt-14 space-y-10 border-t border-ink/[0.08] pt-10">
                <div>
                  <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
                    Behaviours
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 font-sans text-sm font-light leading-relaxed text-ink-light">
                        <span className="h-px w-3 shrink-0 bg-champagne/80" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
                    Choreography
                  </h2>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-light">
                    {product.howToUse}
                  </p>
                </div>
                <div>
                  <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-champagne">
                    Composition
                  </h2>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-light">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {product.reviews.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-luxury">
            <header className="mb-12 border-b border-ink/[0.08] pb-10">
              <p className="eyebrow mb-4 border-l border-champagne/70 pl-4">Correspondences</p>
              <h2 className="font-wordmark text-[clamp(1.6rem,2.8vw,2.35rem)] leading-tight text-ink">
                Maison notes on this objet
              </h2>
            </header>
            <div className="space-y-8">
              {product.reviews.map((review) => (
                <blockquote
                  key={review.id}
                  className="border-b border-ink/[0.08] pb-8 last:border-0 last:pb-0"
                >
                  <StarRating rating={review.rating} size="sm" />
                  <p className="mt-4 font-wordmark text-lg font-normal italic leading-snug text-ink">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <footer className="mt-5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-light">
                    <span className="text-ink">{review.author}</span>
                    <span className="ml-2 font-light tabular-nums normal-case">{review.date}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <ProductGrid
          products={related}
          title="Adjacent objects"
          subtitle="Continue the tableau"
        />
      )}
    </>
  );
}
