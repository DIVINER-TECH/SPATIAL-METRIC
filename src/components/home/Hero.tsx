import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Activity, Zap, Target, ChevronRight } from "lucide-react";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { MarketTicker } from "./MarketTicker";

export function Hero() {
  const { data: snapshot } = useMarketSnapshot();
  const companies = snapshot?.topCompanies ?? [];
  const totalMarketCap = companies.reduce((sum, c) => sum + (c.marketCap ?? 0), 0);

  const formatMarketCap = (value: number) => {
    if (!value) return "—";
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(0)}M`;
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-[#020707]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_section.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,7,7,0.78)_0%,rgba(2,7,7,0.52)_32%,rgba(2,7,7,0.36)_52%,rgba(2,7,7,0.62)_100%)]" />
      <div className="absolute inset-0 bg-grid-dynamic opacity-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container relative py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary"
            >
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(170,245,106,0.9)]" />
              Spatial intelligence active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-foreground md:text-7xl"
            >
              Intelligence for the
              <span className="mt-2 block text-gradient">next frontier.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-base"
            >
              Real-time market velocity, company-level signal mapping, and strategic intelligence across the global spatial computing ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link to="/dashboard">
                <Button size="lg" className="group h-12 gap-3 rounded-full bg-primary px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_22px_rgba(170,245,106,0.24)] hover:bg-primary/90">
                  Access dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/market-intelligence">
                <Button size="lg" variant="outline" className="h-12 rounded-full border-border/70 bg-card/50 px-6 text-[10px] font-medium uppercase tracking-[0.22em] text-foreground hover:bg-card">
                  Market view
                </Button>
              </Link>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Capitalization", value: formatMarketCap(totalMarketCap), icon: Activity },
                { label: "Tracked entities", value: companies.length ? `${companies.length}` : "—", icon: Target },
                { label: "Signal cadence", value: "24H/RT", icon: Zap },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-card/60 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-secondary/60">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-semibold tracking-[-0.05em] text-foreground">{stat.value}</div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-[28px] border border-border/60 bg-card/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[20px] border border-border/60 bg-[#081713]">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Market map</span>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Capital index</span>
                      <span className="text-[10px] font-semibold text-primary">+4.82%</span>
                    </div>
                    <div className="flex h-28 items-end gap-2">
                      {[18, 36, 28, 52, 44, 64, 58, 85, 76, 92].map((bar, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-primary/25 to-primary"
                          style={{ height: `${bar}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Top region</div>
                      <div className="mt-3 text-xl font-semibold text-foreground">North America</div>
                      <div className="mt-2 text-sm text-primary">$1.28T signal load</div>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">AI infra</div>
                      <div className="mt-3 text-xl font-semibold text-foreground">+13.4%</div>
                      <div className="mt-2 text-sm text-primary">Momentum</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-primary/10 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Critical signal</div>
                        <div className="mt-2 text-lg font-semibold text-foreground">XR infrastructure is compounding</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 border-t border-border/60 bg-card/60 backdrop-blur-xl">
        <MarketTicker />
      </div>
    </section>
  );
}
