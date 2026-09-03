import { useState, type FormEvent } from "react";
import { motion, Reveal } from "./motion-primitives";

const fieldClass =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-ring/40 focus:outline-none";

const labelClass = "eyebrow mb-2 block text-muted-foreground";

export function Contact() {
  // Phase 1: UI only.
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="px-5 py-20 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Sparkathon</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            Contact the Ranch
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Questions about bounties, posses or the showdown? Send word and the Trail Guides will
            ride back to you.
          </p>
          <dl className="mt-8 space-y-3 text-sm text-muted-foreground">
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1 text-foreground">hello@sparkathon2026.in</dd>
            </div>
            <div>
              <dt className="eyebrow">Where</dt>
              <dd className="mt-1 text-foreground">E-Cell, FCRIT — Vashi</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5 rounded-xl border bg-card/70 p-6 shadow-[var(--shadow-frontier)] sm:p-8"
          >
            <div>
              <label className={labelClass} htmlFor="contact-name">
                Name
              </label>
              <input id="contact-name" name="name" required placeholder="Your name" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@frontier.io"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="Tell us what you need"
                className={fieldClass}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="justify-self-start rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase"
            >
              Send
            </motion.button>
            {sent && (
              <p className="text-sm text-gold" role="status">
                Messages aren't delivered yet — this form goes live in a later phase.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
