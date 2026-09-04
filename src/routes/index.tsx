import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { FrontierRoles } from "@/components/site/frontier-roles";
import { Journey } from "@/components/site/journey";
import { Registration } from "@/components/site/registration";
import { BountyBoard, bountiesQueryOptions } from "@/components/site/bounty-board";
import { FinalCta } from "@/components/site/final-cta";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const title = "Sparkathon 2026 — Become a Legend of the Frontier";
const description =
  "10 real-world industry bounties, one frontier. Form your posse, scout the territory and face the Frontier Marshal at Sparkathon 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(bountiesQueryOptions),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FrontierRoles />
        <Journey />
        <Registration />
        <BountyBoard />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
