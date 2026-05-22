import { ContactForm } from "../forms/ContactForm";

export function ContactSection() {
  return (
    <section className="section-padding bg-surface" id="contact">
      <div className="container-luxury">
        <div className="relative mx-auto max-w-[48rem] border border-ink/[0.08] bg-gradient-to-b from-cream to-surface px-6 py-14 shadow-soft md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute inset-x-[12%] -top-px h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
            aria-hidden
          />
          <div className="text-center">
            <p className="eyebrow mb-5">Concierge</p>
            <h2 className="font-wordmark text-[clamp(1.75rem,3.5vw,2.65rem)] leading-tight tracking-[-0.02em] text-ink">
              Get in touch
            </h2>
            <p className="mx-auto mt-5 max-w-md font-sans text-sm font-light leading-relaxed text-ink-light">
              Questions about formulations, orders, or appointments — send us a
              message and we will respond within one business day.
            </p>
          </div>
          <ContactForm
            className="mt-10"
            source="Home page"
            idPrefix="home-contact"
            variant="compact"
          />
        </div>
      </div>
    </section>
  );
}
