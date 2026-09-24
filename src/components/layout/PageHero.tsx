import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type PageHeroProps = {
  title: ReactNode;
  description: string;
  icon: LucideIcon;
  action?: ReactNode;
  accentClassName?: string;
};

export function PageHero({ title, description, icon: Icon, action, accentClassName = "text-primary" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[#050d0b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,214,122,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.12),transparent_25%)]" />
      <div className="absolute inset-0 bg-grid-dynamic opacity-[0.08] pointer-events-none" />
      <div className="container relative z-10 pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-card/80 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm">
              <Icon className={`h-6 w-6 ${accentClassName}`} />
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-[-0.06em] text-foreground md:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-[10px] font-medium uppercase tracking-[0.38em] text-muted-foreground md:text-[11px]">
                {description}
              </p>
            </div>
          </div>

          {action ? (
            <div className="flex items-center justify-start lg:justify-end">
              {action}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
