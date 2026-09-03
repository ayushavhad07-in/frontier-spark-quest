import { useState, type FormEvent } from "react";
import { motion } from "./motion-primitives";
import { SectionHeading } from "./section-heading";

const fieldClass =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-ring/40 focus:outline-none";

const labelClass = "eyebrow mb-2 block text-muted-foreground";

export function Registration() {
  // Phase 1: UI only. Submission wiring arrives in a later phase.
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="register" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Reserve your spot" title="Plan Your Journey" />

        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-12 grid gap-6 rounded-xl border bg-card/70 p-6 shadow-[var(--shadow-frontier)] sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="reg-name">
                Name
              </label>
              <input id="reg-name" name="name" required placeholder="Jesse Colter" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                placeholder="you@frontier.io"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-date">
                Preferred Date
              </label>
              <input id="reg-date" name="date" type="date" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="reg-guests">
                Guests
              </label>
              <input
                id="reg-guests"
                name="guests"
                type="number"
                min={1}
                max={6}
                defaultValue={1}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="reg-experience">
              Experience
            </label>
            <select id="reg-experience" name="experience" defaultValue="" className={fieldClass}>
              <option value="" disabled>
                Choose an experience
              </option>
              <option value="cattle-drive">Cattle Drive</option>
              <option value="trail-ride">Trail Ride</option>
              <option value="bounty-hunt">Bounty Hunt Weekend</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase"
          >
            Begin the Journey
          </motion.button>

          {submitted && (
            <p className="text-sm text-gold" role="status">
              Registrations open soon — your details aren't stored yet.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
