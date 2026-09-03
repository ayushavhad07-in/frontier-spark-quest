import { Compass, Flag, Map, Shield, Target, Users, type LucideIcon } from "lucide-react";
import { motion, staggerContainer, staggerItem } from "./motion-primitives";
import { SectionHeading } from "./section-heading";

export type Role = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const roles: Role[] = [
  { title: "Pioneers", description: "Take on real industry challenges and build solutions.", icon: Users },
  { title: "Posse", description: "A group of participants working together on one bounty.", icon: Flag },
  { title: "Bounty", description: "A real-world problem brought directly from industry.", icon: Target },
  {
    title: "Frontier Marshal",
    description: "Evaluates solutions based on the actual industry problem.",
    icon: Shield,
  },
  { title: "Trail Guides", description: "Guide posses when they get stuck during their journey.", icon: Compass },
  { title: "Territory", description: "The larger area or category in which the challenges belong.", icon: Map },
];

export function RoleCard({ title, description, icon: Icon }: Role) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="rounded-md bg-parchment p-6 text-parchment-foreground shadow-[var(--shadow-poster)]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--parchment-foreground)_92%,transparent)] text-parchment">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{description}</p>
    </motion.article>
  );
}

export function FrontierRoles() {
  return (
    <section id="roles" className="px-5 pb-20 sm:px-8">
      <div
        className="mx-auto max-w-6xl rounded-xl px-5 py-16 shadow-[var(--shadow-frontier)] sm:px-10 sm:py-20"
        style={{ background: "var(--gradient-prairie)" }}
      >
        <SectionHeading eyebrow="Know your territory" title="The Frontier Roles" tone="gold" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roles.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
