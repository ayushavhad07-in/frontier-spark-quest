import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import paper from "@/assets/paper.jpg";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/motion-primitives";
import { getBounty } from "@/lib/sparkathon.functions";

export const Route = createFileRoute("/bounties/$id")({
  loader: async ({ params }) => {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.id);
    if (!isUuid) throw notFound();
    const bounty = await getBounty({ data: { id: params.id } });
    if (!bounty) throw notFound();
    return { bounty };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Bounty not found — Sparkathon 2026" }, { name: "robots", content: "noindex" }],
      };
    }
    const { bounty } = loaderData;
    const title = `${bounty.territory} Bounty — Sparkathon 2026`;
    return {
      meta: [
        { title },
        { name: "description", content: bounty.description },
        { property: "og:title", content: title },
        { property: "og:description", content: bounty.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BountyDetail,
  notFoundComponent: BountyNotFound,
  errorComponent: BountyError,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/"
      hash="bounty-board"
      className="eyebrow text-muted-foreground transition-colors hover:text-gold"
    >
      ← Back to the Bounty Board
    </Link>
  );
}

function BountyNotFound() {
  return (
    <Shell>
      <BackLink />
      <h1 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">Poster torn down</h1>
      <p className="mt-4 text-muted-foreground">
        That bounty isn't on the board — it may have been claimed or removed.
      </p>
    </Shell>
  );
}

function BountyError() {
  return (
    <Shell>
      <BackLink />
      <h1 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">Trail went cold</h1>
      <p className="mt-4 text-muted-foreground">
        We couldn't load this bounty right now. Please try again in a moment.
      </p>
    </Shell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-parchment-foreground/20 pb-2">
      <dt className="opacity-60">{label}</dt>
      <dd className="text-right font-bold">{value}</dd>
    </div>
  );
}

function BountyDetail() {
  const { bounty } = Route.useLoaderData();

  return (
    <Shell>
      <BackLink />

      <Reveal>
        <p className="eyebrow mt-6 text-gold">{bounty.category}</p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-foreground uppercase sm:text-5xl">
          {bounty.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {bounty.description}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div
            className="rounded-sm p-6 text-parchment-foreground shadow-[var(--shadow-poster)] sm:p-8"
            style={{ backgroundImage: `url(${paper})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <h2 className="font-display text-xl uppercase">The Particulars</h2>
            <dl className="mt-5 space-y-3 font-stencil text-[0.75rem] tracking-[0.12em] uppercase">
              <Detail label="Territory" value={bounty.territory} />
              <Detail label="Category" value={bounty.category} />
              <Detail label="Difficulty" value={bounty.difficulty} />
              <Detail label="Organization" value={bounty.organization} />
              <Detail
                label="Deadline"
                value={
                  bounty.deadline
                    ? new Date(bounty.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "To be announced"
                }
              />
              <Detail label="Reward" value={bounty.reward} />
              <Detail label="Status" value={bounty.status} />
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border bg-card/70 p-6 shadow-[var(--shadow-frontier)] sm:p-8">
            <h2 className="font-display text-xl text-foreground uppercase">Requirements</h2>
            {bounty.requirements.length > 0 ? (
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {bounty.requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                Requirements will be posted closer to the ride out.
              </p>
            )}

            <Link
              to="/"
              hash="register"
              className="mt-8 inline-block rounded-sm bg-rust px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase"
            >
              Claim this Bounty
            </Link>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}
