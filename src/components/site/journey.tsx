import j1 from "@/assets/journey-1.jpg";
import j2 from "@/assets/journey-2.jpg";
import j3 from "@/assets/journey-3.jpg";
import j4 from "@/assets/journey-4.jpg";
import j5 from "@/assets/journey-5.jpg";
import { Reveal } from "./motion-primitives";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

export type JourneyStepData = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const steps: JourneyStepData[] = [
  {
    number: "01",
    title: "Bounty Drop",
    description: "The moment the industry challenges are revealed.",
    image: j1,
    alt: "Bounty notices nailed to a saloon post at dusk",
  },
  {
    number: "02",
    title: "Scouting",
    description: "Teams investigate and understand their problem.",
    image: j2,
    alt: "A scout surveying the canyon territory",
  },
  {
    number: "03",
    title: "Prototype Solution",
    description: "What the posse builds to solve the bounty.",
    image: j3,
    alt: "Workbench with blueprints and tools under lantern light",
  },
  {
    number: "04",
    title: "Bounty Claim",
    description: "Teams officially submit their solution.",
    image: j4,
    alt: "Sheriff badge resting on a stamped claim document",
  },
  {
    number: "05",
    title: "The Showdown",
    description: "Competing posses present their solutions to the Marshal.",
    image: j5,
    alt: "Two gunslingers facing off in a dusty street at sunset",
  },
];

export function JourneyStep({ step, index }: { step: JourneyStepData; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal className="w-full">
      <article
        className={cn(
          "grid items-center gap-8 border-t border-border/50 py-12 lg:grid-cols-2 lg:gap-16",
          flipped && "lg:[&>figure]:order-last",
        )}
      >
        <figure className="overflow-hidden rounded-lg">
          <img
            src={step.image}
            alt={step.alt}
            loading="lazy"
            width={800}
            height={800}
            className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.05] sm:h-80"
          />
        </figure>
        <div>
          <span className="font-display text-3xl text-gold">{step.number}</span>
          <h3 className="mt-4 font-display text-2xl text-foreground uppercase sm:text-3xl">
            {step.title}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function Journey() {
  return (
    <section id="journey" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it unfolds" title="The Journey" />
        <div className="mt-10">
          {steps.map((step, i) => (
            <JourneyStep key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
