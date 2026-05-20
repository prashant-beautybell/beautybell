import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/Button";
import { SEO } from "../components/ui/SEO";

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
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with BeautyBell customer service. We're here to help with orders, product questions, and more."
      />

      <section className="section-padding bg-cream">
        <div className="container-luxury text-center">
          <div className="mx-auto mb-8 h-px w-14 bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-ink-faint">
            Concierge
          </p>
          <h1 className="mt-5 font-wordmark text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[-0.02em] text-ink">
            Correspondence
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-ink-light">
            We reply with the same punctuality we expect from our pigments. Hours for the desk are listed beside.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-wordmark text-2xl md:text-3xl">Send Us a Message</h2>
              {submitted ? (
                <p className="mt-6 text-brand" role="status">
                  Thank you for your message. Our team will respond within 24
                  hours.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/20"
                    >
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Product Question</option>
                      <option>Returns</option>
                      <option>Press & Partnerships</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full resize-none border border-ink/15 bg-transparent px-4 py-3 text-sm outline-none focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/20"
                    />
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="font-wordmark text-2xl md:text-3xl">Customer Service</h2>
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
                    Monday – Friday: 9am – 6pm EST
                    <br />
                    Saturday: 10am – 4pm EST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider">
                    Follow Us
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
              Frequently Asked Questions
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
