import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TrustedBy() {
  const techs = ["React", "Node.js", "Python", "Go", "TypeScript", "Rust", "Next.js", "Tailwind CSS"];

  return (
    <section className="py-12 border-y border-border bg-muted/10 overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full">
        <InfiniteMovingCards
          items={techs}
          direction="right"
          speed="normal"
        />
      </div>
    </section>
  );
}
