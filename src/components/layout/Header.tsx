import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  TrendingUp,
  Cpu,
  Calendar,
  Building2,
  Globe,
  Search,
  Rocket,
  Landmark,
  Moon,
  Sun
} from "lucide-react";

const navItems = [
  { label: "Market Intelligence", href: "/market-intelligence", icon: TrendingUp },
  { label: "Company Tracker", href: "/company-tracker", icon: Rocket },
  { label: "VC Directory", href: "/vc-directory", icon: Landmark },
  { label: "Tech Explain", href: "/tech-explain", icon: Cpu },
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Spatial Updates", href: "/spatial-updates", icon: Globe },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-[0_0_18px_rgba(245,208,76,0.15)]">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Spatial<span className="text-primary">Metrics</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/75 hover:text-foreground transition-colors rounded-full hover:bg-secondary/80"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex text-foreground/80 hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/dashboard">
            <Button className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.2em] px-6 h-9 rounded-full bg-primary text-black hover:bg-primary/80 shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all border-none">
              Access Terminal
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-primary/5 rounded-full"
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
            className="lg:hidden border-t border-primary/10 bg-background/95 backdrop-blur-2xl overflow-hidden"
          >
            <nav className="container py-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-4 px-6 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-xl border border-transparent hover:border-primary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
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
