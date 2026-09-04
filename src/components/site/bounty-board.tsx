import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import paper from "@/assets/paper.jpg";
import { motion, staggerContainer, staggerItem } from "./motion-primitives";
import { SectionHeading } from "./section-heading";
import { listBounties, type Bounty } from "@/lib/sparkathon.functions";

export type { Bounty };

export const bountiesQueryOptions = {
  queryKey: ["bounties"] as const,
  queryFn: () => listBounties(),
};

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

      <Link
        to="/bounties/$id"
        params={{ id: bounty.id }}
        className="mt-6 inline-block font-stencil text-[0.7rem] tracking-[0.18em] uppercase underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
      >
        Read the Poster
      </Link>
    </motion.article>
  );
}

function BountySkeleton() {
  return (
    <div className="h-72 animate-pulse rounded-sm border border-border/60 bg-card/50" aria-hidden />
  );
}

export function BountyBoard() {
  const { data, isPending, isError } = useQuery(bountiesQueryOptions);

  return (
    <section id="bounty-board" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Claim your target" title="The Bounty Board" />

        {isPending && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BountySkeleton key={index} />
            ))}
          </div>
        )}

        {isError && (
          <p className="mt-12 text-center font-stencil text-sm text-rust" role="alert">
            The board couldn't be reached. Try again in a moment.
          </p>
        )}

        {!isPending && !isError && data.length === 0 && (
          <p className="mt-12 text-center font-stencil text-sm text-muted-foreground">
            No bounties posted yet — check back before the ride out.
          </p>
        )}

        {!isPending && !isError && data.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
