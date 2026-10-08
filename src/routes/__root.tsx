import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logoAsset from "../assets/alaiya-logo.ico.asset.json";
import { ThemeProvider } from "../lib/theme";
import { I18nProvider, useI18n } from "../lib/i18n";
import { ThemeToggle, LanguagePicker } from "../components/Controls";
import { ScrollProgress } from "../components/ScrollProgress";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alaiya Technologies — Engineering tomorrow's software" },
      { name: "description", content: "Alaiya Technologies builds modern software, cloud platforms, and AI-driven products for forward-thinking businesses." },
      { property: "og:title", content: "Alaiya Technologies" },
      { property: "og:description", content: "Modern software, cloud, and AI engineering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/privacy", label: t("nav.privacy") },
    { to: "/terms", label: t("nav.terms") },
  ] as const;
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
        <Link to="/" className="flex min-w-0 items-center gap-2 group">
          <motion.img
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={logoAsset.url}
            alt="Alaiya Technologies logo"
            className="h-8 w-8 shrink-0 rounded-lg object-cover sm:h-9 sm:w-9"
          />
          <span className="truncate font-display text-base font-semibold tracking-tight sm:text-lg">
            <span className="sm:hidden">Alaiya</span>
            <span className="hidden sm:inline">Alaiya Technologies</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm md:gap-6">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
          ))}
          <LanguagePicker />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 md:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <a href="tel:+919106158544" className="mt-1 mb-2 rounded-md bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground">
                +91 91061 58544
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt="Alaiya Technologies logo" className="h-7 w-7 rounded-md object-cover" />
              <span className="font-display font-semibold">Alaiya Technologies</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">{t("footer.tag")}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("footer.contact")}: <a href="tel:+919106158544" className="text-foreground hover:underline">+91 91061 58544</a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">{t("nav.home")}</Link>
            <Link to="/careers" className="hover:text-foreground">{t("nav.careers")}</Link>
            <Link to="/privacy" className="hover:text-foreground">{t("nav.privacy")}</Link>
            <Link to="/terms" className="hover:text-foreground">{t("nav.terms")}</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alaiya Technologies (Sole Proprietorship). {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <ScrollProgress />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"><Outlet /></main>
            <Footer />
          </div>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
