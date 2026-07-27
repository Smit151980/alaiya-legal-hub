import { Moon, Sun, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/theme";
import { LANGUAGES, useI18n } from "@/lib/i18n";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <motion.button
      onClick={toggle}
      aria-label={t("theme.toggle")}
      whileTap={{ scale: 0.9, rotate: 20 }}
      whileHover={{ scale: 1.05 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -8, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 8, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
          className="absolute"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

export function LanguagePicker() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const current = LANGUAGES.find((l) => l.code === lang);
  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.select")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground hover:bg-muted"
      >
        <Languages className="h-3.5 w-3.5" />
        <span>{current?.label}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 max-h-72 w-40 overflow-auto rounded-md border border-border bg-card p-1 shadow-lg"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`flex w-full items-center justify-between rounded px-2.5 py-1.5 text-left text-sm hover:bg-muted ${l.code === lang ? "text-primary font-medium" : "text-foreground"}`}
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-muted-foreground uppercase">{l.code}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
