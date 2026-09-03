import paper from "@/assets/paper.jpg";
import { motion, staggerContainer, staggerItem } from "./motion-primitives";
import { SectionHeading } from "./section-heading";

export type Bounty = {
  id: string;
  title: string;
  description: string;
  category: string;
  territory: string;
  difficulty: "Greenhorn" | "Ranger" | "Outlaw";
  status: "Open" | "Claimed";
  reward: string;
};

// Placeholder data for Phase 1.
const bounties: Bounty[] = [
  {
    id: "fintech-01",
    title: "Wanted: Solution Required",
    description: "Fraud slips through the wire before the ledger ever settles.",
    category: "Risk",
    territory: "Fintech",
    difficulty: "Outlaw",
    status: "Open",
    reward: "₹40,000",
  },
  {
    id: "healthcare-01",
    title: "Wanted: Solution Required",
    description: "Rural clinics lose patient history between every visit.",
    category: "Data",
    territory: "Healthcare",
    difficulty: "Ranger",
    status: "Open",
    reward: "₹35,000",
  },
  {
    id: "logistics-01",
    title: "Wanted: Solution Required",
    description: "Last-mile routes buckle the moment the weather turns.",
    category: "Optimisation",
    territory: "Logistics",
    difficulty: "Ranger",
    status: "Open",
    reward: "₹30,000",
  },
  {
    id: "energy-01",
    title: "Wanted: Solution Required",
    description: "Micro-grids waste stored power with no demand forecast.",
    category: "Forecasting",
    territory: "Energy",
    difficulty: "Outlaw",
    status: "Claimed",
    reward: "₹45,000",
  },
  {
    id: "agritech-01",
    title: "Wanted: Solution Required",
    description: "Crop disease is spotted a fortnight too late.",
    category: "Vision",
    territory: "Agritech",
    difficulty: "Greenhorn",
    status: "Open",
    reward: "₹25,000",
  },
  {
    id: "retail-01",
    title: "Wanted: Solution Required",
    description: "Shelf stock counts drift from the system within hours.",
    category: "Operations",
    territory: "Retail",
    difficulty: "Greenhorn",
    status: "Open",
    reward: "₹25,000",
  },
  {
    id: "mobility-01",
    title: "Wanted: Solution Required",
    description: "Fleet drivers get no warning before a breakdown.",
    category: "Predictive",
    territory: "Mobility",
    difficulty: "Ranger",
    status: "Open",
    reward: "₹32,000",
  },
  {
    id: "edtech-01",
    title: "Wanted: Solution Required",
    description: "Learners drop off and nobody notices for weeks.",
    category: "Engagement",
    territory: "Edtech",
    difficulty: "Greenhorn",
    status: "Claimed",
    reward: "₹22,000",
  },
  {
    id: "insurance-01",
    title: "Wanted: Solution Required",
    description: "Claim documents take five humans to read.",
    category: "Automation",
    territory: "Insurance",
    difficulty: "Ranger",
    status: "Open",
    reward: "₹34,000",
  },
  {
    id: "climate-01",
    title: "Wanted: Solution Required",
    description: "Emission reporting relies on spreadsheets and guesswork.",
    category: "Analytics",
    territory: "Climate",
    difficulty: "Outlaw",
    status: "Open",
    reward: "₹42,000",
  },
];

export function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -8, rotate: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="relative overflow-hidden rounded-sm p-6 text-parchment-foreground shadow-[var(--shadow-poster)]"
      style={{ backgroundImage: `url(${paper})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-stencil text-[0.65rem] tracking-[0.2em] uppercase opacity-70">
          {bounty.category}
        </span>
        <span
          className={
            bounty.status === "Open"
              ? "rounded-full border border-current px-2 py-0.5 font-stencil text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.14_140)]"
              : "rounded-full border border-current px-2 py-0.5 font-stencil text-[0.6rem] tracking-[0.15em] uppercase opacity-60"
          }
        >
          {bounty.status}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl leading-tight uppercase">{bounty.title}</h3>
      <p className="mt-3 font-stencil text-sm leading-relaxed opacity-80">{bounty.description}</p>

      <dl className="mt-6 space-y-1.5 border-t border-parchment-foreground/25 pt-4 font-stencil text-[0.7rem] tracking-[0.12em] uppercase">
        <div className="flex justify-between gap-3">
          <dt className="opacity-60">Territory</dt>
          <dd className="font-bold">{bounty.territory}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="opacity-60">Difficulty</dt>
          <dd className="font-bold">{bounty.difficulty}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="opacity-60">Reward</dt>
          <dd className="font-bold">{bounty.reward}</dd>
        </div>
      </dl>
    </motion.article>
  );
}

export function BountyBoard() {
  return (
    <section id="bounty-board" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Claim your target" title="The Bounty Board" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {bounties.map((bounty) => (
            <BountyCard key={bounty.id} bounty={bounty} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
