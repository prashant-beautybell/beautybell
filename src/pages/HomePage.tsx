import { lazy, Suspense } from "react";
import { Hero } from "../components/home/Hero";
import { SEO } from "../components/ui/SEO";

const ShopTheLook = lazy(() =>
  import("../components/home/ShopTheLook").then((m) => ({ default: m.ShopTheLook }))
);
const CategoryShowcase = lazy(() =>
  import("../components/home/CategoryShowcase").then((m) => ({
    default: m.CategoryShowcase,
  }))
);
const FeaturedProducts = lazy(() =>
  import("../components/home/FeaturedProducts").then((m) => ({
    default: m.FeaturedProducts,
  }))
);
const BrandStory = lazy(() =>
  import("../components/home/BrandStory").then((m) => ({ default: m.BrandStory }))
);
const Testimonials = lazy(() =>
  import("../components/home/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Newsletter = lazy(() =>
  import("../components/home/Newsletter").then((m) => ({ default: m.Newsletter }))
);

function SectionFallback() {
  return <div className="min-h-[12rem] bg-surface" aria-hidden />;
}

export function HomePage() {
  return (
    <>
      <SEO
        title="Premium Luxury Cosmetics"
        description="Discover Beauty Bell's curated collection of premium luxury cosmetics. Shop face, eyes, lips, and skincare essentials crafted for timeless elegance."
      />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <ShopTheLook />
        <CategoryShowcase />
        <FeaturedProducts />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </Suspense>
    </>
  );
}
