import { Reveal } from "./motion-primitives";

export type Stat = {
  value: string;
  label: string;
};

// Static for Phase 1 — swap this array for a data source later.
const stats: Stat[] = [
  { value: "10", label: "Bounties" },
  { value: "40", label: "Pioneers" },
  { value: "10", label: "Legends" },
];

export function StatItem({ value, label }: Stat) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl text-foreground sm:text-5xl">{value}</p>
      <p className="eyebrow mt-3 text-muted-foreground">{label}</p>
    </div>
  );
}

export function Stats({ items = stats }: { items?: Stat[] }) {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-10 border-y border-border/60 py-12 sm:grid-cols-3">
        {items.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </Reveal>
    </section>
  );
}
