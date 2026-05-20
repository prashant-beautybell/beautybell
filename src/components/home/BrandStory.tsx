import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function BrandStory() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-luxury">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
          <div className="relative aspect-[4/5] max-h-[620px] overflow-hidden rounded-sm ring-1 ring-ink/[0.06]">
            <img
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80"
              alt="BeautyBell atelier craft"
              loading="lazy"
              className="h-full w-full object-cover saturate-[0.95]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-midnight/35 to-transparent opacity-70" aria-hidden />
          </div>

          <div className="hidden h-full min-h-[320px] w-px shrink-0 bg-gradient-to-b from-transparent via-champagne/45 to-transparent lg:block" aria-hidden />

          <div className="lg:pl-16">
            <p className="eyebrow mb-6 border-l border-champagne/70 pl-4">Position</p>
            <h2 className="display-heading mb-8">
              Restraint is the ornament
            </h2>
            <p className="font-sans text-base font-light leading-[1.75] text-ink-light md:text-[1.05rem]">
              BeautyBell operates as an atelier, not an aisle. Pigments arrive in
              measured loads, powders sheered to micron bands, creams arrested at
              the threshold where brilliance turns loud. Radiance stays legible:
              tactile, disciplined, unmistakably considered.
            </p>
            <p className="mt-6 font-sans text-base font-light leading-[1.75] text-ink-light md:text-[1.05rem]">
              Maison presentation follows the same code: weight, proportion, silence
              on the periphery so the complexion can speak without competition.
            </p>
            <ul className="mt-12 space-y-5 border-l border-ink/[0.08] pl-6">
              {[
                "Micro-milled pigments for strata that never chalk",
                "Layering architectures: skin first, veil second",
                "Provenance-reviewed raw strata per capsule",
                "Performance trials under uncompromising light",
              ].map((item) => (
                <li key={item} className="font-sans text-sm font-light leading-relaxed text-ink md:text-[0.9375rem]">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Link to="/about">
                <Button variant="outline">Read the lineage</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
