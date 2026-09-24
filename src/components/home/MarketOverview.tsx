import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Layers, Building2, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";
import { companies as staticCompanies } from "@/data/companies";
import { format } from "date-fns";

const formatAxisDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return format(parsed, "MMM d");
};

const formatMarketCap = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  return `$${(value / 1e6).toFixed(0)}M`;
};

export function MarketOverview() {
  const { data: snapshot } = useMarketSnapshot();
  const indexSeries = snapshot?.indexSeries ?? [];
  const snapshotCompanies = snapshot?.topCompanies ?? [];

  const latestIndex = indexSeries.length > 0 ? indexSeries[indexSeries.length - 1] : undefined;
  const prevIndex = indexSeries.length > 1 ? indexSeries[indexSeries.length - 2] : undefined;
  const indexChangePercent = latestIndex && prevIndex && prevIndex.value !== 0
    ? ((latestIndex.value - prevIndex.value) / prevIndex.value) * 100
    : 0;

  const totalStaticMarketCap = staticCompanies.reduce((s, c) => s + c.marketCap, 0);
  const uniqueSectors = new Set(staticCompanies.map(c => c.sector)).size;

  const stats = [
    {
      title: "Global capability index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "SCANNING...",
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: Activity,
    },
    {
      title: "Aggregate valuation",
      value: formatMarketCap(totalStaticMarketCap),
      change: "",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Vertical integration",
      value: `${uniqueSectors} sectors`,
      change: "",
      positive: true,
      icon: Layers,
    },
    {
      title: "Neural nodes",
      value: `${staticCompanies.length} entities`,
      change: "",
      positive: true,
      icon: Building2,
    },
  ];

  return (
    <section className="relative container py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(170,245,106,0.15),transparent_25%)]" />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative mb-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/8 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Market intelligence</p>
            <h2 className="mt-2 text-4xl font-bold tracking-[-0.06em] text-foreground md:text-5xl">
              Market <span className="text-primary">dynamics</span>
            </h2>
          </div>
        </div>
      </motion.div>

      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[28px] border border-border/60 bg-card/60 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-border/60 bg-[#071611]/70 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground">Performance vector matrix</span>
            </div>
            <div className={`flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] ${indexChangePercent >= 0 ? "text-primary" : "text-muted-foreground"}`}>
              {indexChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "Synchronizing"}
            </div>
          </div>

          <div className="h-[420px] p-4 pb-0">
            <div className="h-full w-full overflow-hidden rounded-b-[20px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indexSeries} margin={{ top: 18, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValueV3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.38} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    minTickGap={20}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }}
                    tickFormatter={formatAxisDate}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={['dataMin - 10', 'dataMax + 10']}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }}
                    tickFormatter={value => `$${value}`}
                    dx={-8}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "14px",
                      backdropFilter: "blur(20px)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      boxShadow: "0 18px 50px rgba(0,0,0,0.3)"
                    }}
                    labelStyle={{ color: "hsl(var(--primary))", fontWeight: "bold", marginBottom: "4px" }}
                    formatter={(value: number) => [`${value.toFixed(2)} UNIT`, "VALUE"]}
                    labelFormatter={formatAxisDate}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValueV3)"
                    isAnimationActive={true}
                    animationDuration={2600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="group rounded-[24px] border border-border/60 bg-card/60 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-primary/30 hover:bg-card">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{stat.title}</p>
                  </div>
                  {stat.change ? (
                    <div className={`rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[8px] uppercase tracking-[0.2em] ${stat.positive ? "text-primary" : "text-muted-foreground"}`}>
                      {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    </div>
                  ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <div className="text-3xl font-semibold tracking-[-0.06em] text-foreground group-hover:text-primary">{stat.value}</div>
                {stat.change && <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-primary">{stat.change}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
