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
      title: "Global Capability index",
      value: latestIndex ? latestIndex.value.toFixed(1) : "SCANNING...",
      change: latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "",
      positive: indexChangePercent >= 0,
      icon: Activity,
    },
    {
      title: "Aggregate Valuation",
      value: formatMarketCap(totalStaticMarketCap),
      change: "",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Vertical Integration",
      value: `${uniqueSectors} SECTORS`,
      change: "",
      positive: true,
      icon: Layers,
    },
    {
      title: "Neural Node Count",
      value: `${staticCompanies.length} ENTITIES`,
      change: "",
      positive: true,
      icon: Building2,
    },
  ];

  return (
    <section className="container py-32 md:py-48 relative">
      <div className="absolute top-0 right-10 w-px h-64 bg-gradient-to-b from-primary/30 to-transparent opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-card/60 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.06em] text-foreground uppercase leading-none">
              Market <span className="text-primary">dynamics</span>
            </h2>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Spatial computing market variance & vector analytics
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="glass-premium overflow-hidden h-full group">
            <CardHeader className="border-b border-border/60 bg-card/60 p-6">
              <CardTitle className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">
                  <Activity className="h-4 w-4 text-primary" />
                  Performance vector matrix
                </span>
                <div className={`flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${indexChangePercent >= 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {indexChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {latestIndex ? `${indexChangePercent >= 0 ? "+" : ""}${indexChangePercent.toFixed(2)}%` : "Synchronizing"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[400px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={indexSeries}>
                    <defs>
                      <linearGradient id="colorValueV3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} 
                      tickFormatter={formatAxisDate} 
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9, fontFamily: "var(--font-mono)" }} 
                      tickFormatter={value => `$${value}`} 
                      dx={-15}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))", 
                        borderRadius: "12px",
                        backdropFilter: "blur(20px)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.18)"
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
                      animationDuration={3000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-premium h-full group transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-secondary/80">
                      <stat.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                    </div>
                    {stat.change ? (
                      <div className={`flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] ${stat.positive ? "text-primary" : "text-muted-foreground"}`}>
                        {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {stat.change}
                      </div>
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{stat.title}</p>
                    <p className="text-4xl font-semibold tracking-[-0.06em] text-foreground transition-colors duration-500 group-hover:text-primary">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
