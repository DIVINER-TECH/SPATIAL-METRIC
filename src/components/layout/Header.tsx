import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, Building2, Landmark, Cpu, CalendarDays, Globe } from "lucide-react";

const navItems = [
  { label: "Market", href: "/market-intelligence", icon: TrendingUp },
  { label: "Company", href: "/company-tracker", icon: Building2 },
  { label: "VC", href: "/vc-directory", icon: Landmark },
  { label: "Tech", href: "/tech-explain", icon: Cpu },
  { label: "Event", href: "/events", icon: CalendarDays },
  { label: "Updates", href: "/spatial-updates", icon: Globe },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-[#071611]/90 shadow-[0_12px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="SpatialMetrics logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-bold tracking-[0.12em] uppercase text-foreground">
            Spatial<span className="text-primary">Metrics</span>
          </span>
        </Link>

        <nav
          className={`hidden lg:flex items-center gap-1 rounded-full border px-1 py-1 transition-all duration-300 ${
            scrolled
              ? "border-border/60 bg-card/60 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
              : "border-transparent bg-transparent opacity-90"
          }`}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="relative group"
              >
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] transition-all ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button className="hidden sm:flex h-9 rounded-full bg-primary text-primary-foreground px-5 text-[10px] font-medium uppercase tracking-[0.24em] shadow-[0_0_18px_rgba(170,245,106,0.2)] hover:bg-primary/90">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full text-foreground/80 hover:text-foreground hover:bg-primary/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/60 bg-background/90 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-[10px] uppercase tracking-[0.24em] transition-colors ${
                    location.pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
