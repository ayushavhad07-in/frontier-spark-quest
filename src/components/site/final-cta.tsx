import cta from "@/assets/cta.jpg";
import { motion, Reveal } from "./motion-primitives";

export function FinalCta() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-xl">
        <img
          src={cta}
          alt="A lone rider crossing the desert at sunset"
          loading="lazy"
          width={1200}
          height={800}
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,color-mix(in_oklab,var(--background)_88%,transparent)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-6 p-8 text-center sm:p-14">
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Saddle Up, The Semester Ain't Over
          </h2>
          <motion.a
            href="#register"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase"
          >
            Register Now
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
