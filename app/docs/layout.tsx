"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { useLanguage } from "@/hooks/useLanguage";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div style={{ backgroundColor: "#0A0F0E", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="flex gap-12">

          {/* Sidebar — desktop */}
          <aside
            className="hidden lg:block w-60 xl:w-64 flex-shrink-0 sticky top-24 self-start h-[calc(100vh-7rem)] overflow-y-auto"
          >
            <DocsSidebar lang={lang} />
          </aside>

          {/* Mobile nav toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-body font-medium text-sm"
              style={{ backgroundColor: "#0F6E56", color: "#F5FAF7" }}
              aria-label="Open docs navigation"
            >
              <BookOpen size={16} />
              {lang === "fr" ? "Navigation" : "Contents"}
            </button>
          </div>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {mobileNavOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                  onClick={() => setMobileNavOpen(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 z-50 w-72 p-6 overflow-y-auto lg:hidden"
                  style={{ backgroundColor: "#111915" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-semibold text-sm" style={{ color: "#F5FAF7" }}>
                      {lang === "fr" ? "Documentation" : "Documentation"}
                    </span>
                    <button
                      onClick={() => setMobileNavOpen(false)}
                      style={{ color: "#4A6358" }}
                      aria-label="Close navigation"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <DocsSidebar lang={lang} onNavigate={() => setMobileNavOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
