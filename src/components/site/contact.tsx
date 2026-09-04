import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, Reveal } from "./motion-primitives";
import { submitContactMessage } from "@/lib/sparkathon.functions";

const fieldClass =
  "w-full rounded-sm border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-gold/60 focus:border-gold focus:ring-2 focus:ring-ring/40 focus:outline-none";

const labelClass = "eyebrow mb-2 block text-muted-foreground";

type Status = { kind: "idle" | "loading" } | { kind: "success" | "error"; message: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const sendMessage = useServerFn(submitContactMessage);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    setStatus({ kind: "loading" });
    try {
      const result = await sendMessage({ data: values });
      setStatus({ kind: result.ok ? "success" : "error", message: result.message });
      if (result.ok) form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Please check your name, email and message, then try again.",
      });
    }
  };

  const loading = status.kind === "loading";

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
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="justify-self-start rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send"}
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
        </Reveal>
      </div>
    </section>
  );
}
