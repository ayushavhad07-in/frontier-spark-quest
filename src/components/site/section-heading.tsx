import { Reveal } from "./motion-primitives";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
  tone?: "default" | "gold";
};

export function SectionHeading({
  eyebrow,
  title,
  className,
  tone = "default",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("text-center", className)}>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h2
        className={cn(
          "mt-4 font-display text-3xl uppercase tracking-wide sm:text-4xl lg:text-5xl",
          tone === "gold" ? "text-gold" : "text-foreground",
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
