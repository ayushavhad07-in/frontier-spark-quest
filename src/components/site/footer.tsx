import { Github, Instagram, Linkedin } from "lucide-react";

const nav = [
  { label: "Home", href: "#top" },
  { label: "The Journey", href: "#journey" },
  { label: "Frontier Roles", href: "#roles" },
  { label: "Bounty Board", href: "#bounty-board" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export function Footer() {
  return (
    <footer className="border-t px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-xl tracking-[0.2em] text-foreground uppercase">
            Sparkathon
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A frontier of real industry bounties, posses and showdowns. 2026 edition.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-muted-foreground">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-muted-foreground">Reach Us</p>
          <p className="mt-4 text-sm text-foreground/80">hello@sparkathon2026.in</p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border text-foreground/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-xs text-muted-foreground">
        © 2026 Sparkathon. All rights reserved.
      </p>
    </footer>
  );
}
