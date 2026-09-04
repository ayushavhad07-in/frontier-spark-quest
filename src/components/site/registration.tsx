import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "./motion-primitives";
import { SectionHeading } from "./section-heading";
import { submitRegistration } from "@/lib/sparkathon.functions";

const fieldClass =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-ring/40 focus:outline-none";

const labelClass = "eyebrow mb-2 block text-muted-foreground";

type Status = { kind: "idle" | "loading" } | { kind: "success" | "error"; message: string };

export function Registration() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const register = useServerFn(submitRegistration);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setStatus({ kind: "loading" });
    try {
      const result = await register({ data: values });
      setStatus({ kind: result.ok ? "success" : "error", message: result.message });
      if (result.ok) form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Please check your name, email and guest count, then try again.",
      });
    }
  };

  const loading = status.kind === "loading";

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
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase disabled:opacity-60"
          >
            {loading ? "Saddling Up…" : "Begin the Journey"}
          </motion.button>

          {status.kind === "success" && (
            <p className="text-sm text-gold" role="status">
              {status.message}
            </p>
          )}
          {status.kind === "error" && (
            <p className="text-sm text-rust" role="alert">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
