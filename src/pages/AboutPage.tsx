import { Link } from "react-router-dom";
import { PageHero } from "../components/layout/PageHero";
import { Button } from "../components/ui/Button";
import { SEO } from "../components/ui/SEO";
import { staticPageHeroes } from "../data/pageHeroes";

const team = [
  {
    name: "Harry Davey",
    role: "Founder & Director",
    image: "/team/harry-davey.png",
  },
  {
    name: "Prashant Tripathi",
    role: "Web and Operations Manager",
    image: "/team/prashant-tripathi.png",
  },
  {
    name: "Ellie",
    role: "Brand & Marketing",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Francesca",
    role: "Brand & Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

export function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about BeautyBell's mission, values, and the passion behind our premium luxury cosmetics brand."
      />

      <PageHero
        image={staticPageHeroes.about.image}
        eyebrow={staticPageHeroes.about.eyebrow}
        title={staticPageHeroes.about.title}
      />

      <section className="section-padding">
        <div className="container-luxury mx-auto max-w-3xl text-center">
          <h2 className="font-wordmark text-3xl md:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-light">
            BeautyBell was born from a simple belief: luxury cosmetics should
            enhance your natural beauty, never mask it. Founded in 2018, we set
            out to create a brand that marries the finest ingredients with
            cutting-edge science, all wrapped in an experience that feels as
            exquisite as the products themselves.
          </p>
          <p className="mt-4 text-lg font-light leading-relaxed text-ink-light">
            Collectors recognise the signal: pigments that comport themselves,
            finishes that withhold until light asks. Every object in our vitrine is an
            argument for precision over abundance.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-muted/30">
        <div className="container-luxury">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-square max-w-md overflow-hidden">
              <img
                src="/team/harry-davey.png"
                alt="Harry Davey, Founder and Director of Beauty Bell"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div>
              <p className="eyebrow mb-4">From the Founder</p>
              <h2 className="font-wordmark text-3xl md:text-4xl">
                Built to perform. Made to stay.
              </h2>
              <div className="mt-6 space-y-4 text-ink-light">
                <p>
                  Beauty Bell is an atelier, not a trend cycle. We formulate with
                  discipline precise actives, clean layering, finishes that hold up
                  under real use. The goal is simple: skin that looks composed, not
                  covered.
                </p>
                <p>
                  We are building a dedicated men&apos;s range alongside our core line
                  because strong skin is not gendered but the products should match
                  how you actually live. Straight talk on ingredients. Respect for the
                  barrier. Formulas and packaging worthy of a routine you keep, not a
                  purchase you regret.
                </p>
                <p>
                  Every release is judged on one standard: would you still reach for it
                  a year from now morning shave, post-gym, or end of day without
                  thinking twice.
                </p>
                <p className="font-wordmark text-lg text-ink">
                  Harry Davey
                  <br />
                  <span className="font-sans text-sm font-normal not-italic text-ink-light">
                    Founder &amp; Director
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <header className="mb-12 text-center md:mb-16">
            <p className="eyebrow mb-3">What We Stand For</p>
            <h2 className="font-wordmark text-3xl md:text-4xl">Our Values</h2>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Uncompromising Quality",
                desc: "We source only the finest ingredients and subject every formula to rigorous testing before it reaches you.",
              },
              {
                title: "Sustainability",
                desc: "From recyclable packaging to responsibly sourced botanicals, we minimise our footprint at every step.",
              },
              {
                title: "Architected scarcity",
                desc: "Capsules arrive in restrained cadence so milling and chilling cycles are never hurried. Presence is rationed deliberately, never merchandised loudly.",
              },
            ].map((v) => (
              <article key={v.title} className="relative border border-ink/[0.07] bg-surface px-10 py-12 text-center shadow-soft">
                <h3 className="font-wordmark text-xl">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-light">
                  {v.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <header className="mb-12 text-center md:mb-16">
            <p className="eyebrow mb-3">The People Behind BeautyBell</p>
            <h2 className="font-wordmark text-3xl md:text-4xl">Meet Our Team</h2>
          </header>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} className="text-center">
                <div className="mx-auto mb-4 aspect-square max-w-[200px] overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-wordmark text-xl">{member.name}</h3>
                <p className="mt-1 text-sm text-ink-light">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <div className="container-luxury">
          <h2 className="font-wordmark text-3xl">Experience BeautyBell</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-light">
            Explore our collection and discover the products that will elevate
            your beauty ritual.
          </p>
          <div className="mt-8">
            <Link to="/category/face">
              <Button>Shop Collection</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
