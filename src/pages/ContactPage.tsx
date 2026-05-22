import { PageHero } from "../components/layout/PageHero";
import { ContactForm } from "../components/forms/ContactForm";
import { SEO } from "../components/ui/SEO";
import { staticPageHeroes } from "../data/pageHeroes";

const faqs = [
  {
    q: "What is your shipping policy?",
    a: "We offer complimentary standard shipping on orders over £75. Express shipping is available at checkout. Orders typically arrive within 3–7 business days.",
  },
  {
    q: "Do you accept returns?",
    a: "Yes. Unopened products may be returned within 30 days of purchase for a full refund. Please contact our customer service team to initiate a return.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. Duties and import taxes vary by corridor; concierge will confirm timelines and obligations before checkout finalises.",
  },
  {
    q: "How do I find my perfect shade?",
    a: "Visit any product page to explore our shade selector. For personalised recommendations, email us at hello@beautybell.com with a photo in natural light.",
  },
];

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with BeautyBell customer service. We're here to help with orders, product questions, and more."
      />

      <PageHero
        image={staticPageHeroes.contact.image}
        eyebrow={staticPageHeroes.contact.eyebrow}
        title={staticPageHeroes.contact.title}
        description={staticPageHeroes.contact.description}
      />

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-wordmark text-2xl md:text-3xl">Send us a message</h2>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-ink-light">
                Share your enquiry below and our concierge will respond within one
                business day.
              </p>
              <ContactForm className="mt-8" source="Contact page" idPrefix="contact-page" />
            </div>

            <div>
              <h2 className="font-wordmark text-2xl md:text-3xl">Customer service</h2>
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider">Email</h3>
                  <a
                    href="mailto:hello@beautybell.com"
                    className="mt-2 block text-ink-light transition-colors hover:text-brand"
                  >
                    hello@beautybell.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider">Phone</h3>
                  <a
                    href="tel:+442079460123"
                    className="mt-2 block text-ink-light transition-colors hover:text-brand"
                  >
                    +44 (0)20 7946 0123
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider">
                    Hours
                  </h3>
                  <p className="mt-2 text-ink-light">
                    Monday – Friday: 9am – 6pm GMT
                    <br />
                    Saturday: 10am – 4pm GMT
                    <br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider">
                    Follow us
                  </h3>
                  <div className="mt-3 flex gap-6">
                    {["Instagram", "Pinterest", "TikTok"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-sm text-ink-light transition-colors hover:text-brand"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-muted/30">
        <div className="container-luxury mx-auto max-w-3xl">
          <header className="mb-12 text-center">
            <p className="eyebrow mb-3">Questions</p>
            <h2 className="font-wordmark text-3xl md:text-4xl">
              Frequently asked questions
            </h2>
          </header>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-ink/10 bg-surface p-6"
              >
                <summary className="cursor-pointer list-none font-medium transition-colors group-open:text-brand">
                  <span className="flex items-center justify-between gap-4">
                    {faq.q}
                    <span className="text-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-light">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
