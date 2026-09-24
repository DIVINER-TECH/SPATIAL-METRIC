import { Link } from "react-router-dom";
import { BarChart3, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  content: [
    { label: "Market Intelligence", href: "/market-intelligence" },
    { label: "Company Tracker", href: "/company-tracker" },
    { label: "Tech Explain", href: "/tech-explain" },
    { label: "Events & Ecosystem", href: "/events" },
  ],
  resources: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "API Access", href: "/api" },
    { label: "Reports", href: "/reports" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/90 mt-20 backdrop-blur-xl">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_18px_rgba(245,208,76,0.15)]">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SpatialMetrics</span>
            </Link>
            <p className="text-sm text-foreground/75 mb-4 leading-relaxed">
              Your premier source for spatial computing investment insights and market intelligence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Content</h4>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[10px] font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary mb-6">Corporate</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[10px] font-mono text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} SpatialMetrics // System Version 4.2.0
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
