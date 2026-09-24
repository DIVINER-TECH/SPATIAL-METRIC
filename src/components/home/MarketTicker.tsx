import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";

export function MarketTicker() {
  const { data: snapshot } = useMarketSnapshot();
  const tickerData = snapshot?.topCompanies?.slice(0, 8) ?? [];

  if (tickerData.length === 0) {
    return (
      <div className="border-y border-border bg-card/50">
        <div className="px-6 py-3 text-sm text-muted-foreground">
          Ticker data not available yet. Run the daily snapshot to populate.
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-[#0d201d] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#0d201d] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#0d201d] to-transparent" />

      {snapshot?.asOfDate && (
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 lg:flex">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(170,245,106,0.7)]" />
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            LIVE: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      )}

      <div className="flex animate-marquee py-1">
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 border-r border-border/60 px-7 py-3 whitespace-nowrap transition-colors hover:bg-primary/5"
          >
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[-0.04em] text-primary">{item.symbol}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold tracking-[-0.04em] text-foreground">${(item.price ?? 0).toFixed(2)}</span>
              <div
                className={`flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.2em] ${
                  (item.changePercent ?? 0) >= 0 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {(item.changePercent ?? 0) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {(item.changePercent ?? 0) >= 0 ? "+" : ""}{(item.changePercent ?? 0).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
