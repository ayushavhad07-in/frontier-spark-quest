import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { motion } from "./motion-primitives";
import { cn } from "@/lib/utils";

const links = [
  { label: "Roles", href: "#roles" },
  { label: "Journey", href: "#journey" },
  { label: "Bounty Board", href: "#bounty-board" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:grid-cols-3">
        <a
          href="#top"
          className="min-w-0 font-display text-lg tracking-[0.2em] text-foreground uppercase sm:text-xl lg:justify-self-start"
        >
          Sparkathon
        </a>

        <ul className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="eyebrow whitespace-nowrap text-muted-foreground transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-3 lg:justify-self-end">
          <a
            href="#register"
            className="hidden rounded-sm bg-rust px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-primary-foreground uppercase transition-transform duration-200 hover:scale-[1.04] hover:brightness-110 sm:inline-block"
          >
            Register
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t bg-background/98 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-6 sm:px-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.35 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/60 py-4 font-display text-lg tracking-wide text-foreground uppercase"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-sm bg-rust px-5 py-3 text-center text-xs font-bold tracking-[0.18em] text-primary-foreground uppercase"
              >
                Register
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
