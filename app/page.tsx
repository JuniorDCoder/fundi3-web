import { t } from "@/lib/i18n";

export default function Home() {
  const lang = "fr" as const;

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <h1 className="font-heading text-5xl font-semibold text-off-white">
          {t("hero.headline", lang)}
        </h1>
        <p className="font-body text-muted text-lg">
          {t("hero.subheadline", lang)}
        </p>
        <p className="font-mono text-sm text-green-400 mt-8">
          Priority 4 — Landing page coming next
        </p>
      </div>
    </main>
  );
}
