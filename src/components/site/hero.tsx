import heroSign from "@/assets/hero-sign.png";
import { motion, staggerContainer, staggerItem } from "./motion-primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_65%)]"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.img
          variants={staggerItem}
          src={heroSign}
          alt="Weathered wooden sign reading Welcome to the Ranch"
          width={1024}
          height={704}
          className="w-full max-w-[280px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] sm:max-w-[380px]"
        />

        <motion.h1
          variants={staggerItem}
          className="mt-10 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl"
        >
          Become a Legend
          <br />
          of the Frontier
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          Industry leaders arrive with 10 real-world unsolved challenges. Form your posse, explore
          the territory, and face the Frontier Marshal.
        </motion.p>

        <motion.div variants={staggerItem} className="mt-9 flex flex-wrap justify-center gap-3">
          <motion.a
            href="#register"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase shadow-[var(--shadow-poster)]"
          >
            Register
          </motion.a>
          <motion.a
            href="#bounty-board"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm border border-border px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-foreground uppercase transition-colors hover:border-gold hover:text-gold"
          >
            View Bounties
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
