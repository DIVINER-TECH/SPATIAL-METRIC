import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Menu,
  X,
  TrendingUp,
  Cpu,
  Calendar,
  Building2,
  Globe,
  Search,
  Rocket,
  Landmark
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
            <Button variant="default" className="hidden sm:flex">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-border/70 bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-secondary/80"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full mt-2">Dashboard</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
