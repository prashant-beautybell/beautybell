import { BrandStory } from "../components/home/BrandStory";
import { CategoryShowcase } from "../components/home/CategoryShowcase";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { Hero } from "../components/home/Hero";
import { Newsletter } from "../components/home/Newsletter";
import { ShopTheLook } from "../components/home/ShopTheLook";
import { Testimonials } from "../components/home/Testimonials";
import { SEO } from "../components/ui/SEO";

export function HomePage() {
  return (
    <>
      <SEO
        title="Premium Luxury Cosmetics"
        description="Discover Beauty Bell's curated collection of premium luxury cosmetics. Shop face, eyes, lips, and skincare essentials crafted for timeless elegance."
      />
      <Hero />
      <ShopTheLook />
      <CategoryShowcase />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}
