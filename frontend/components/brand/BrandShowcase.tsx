import { LogoMark, LogoFull, LogoFullLight, LogoFullDark } from "./Logo";
import { brand } from "@/styles/brand";

// ─── Color swatch ────────────────────────────────────────────────────────────

function Swatch({
  hex,
  name,
  usage,
  light = false,
}: {
  hex: string;
  name: string;
  usage: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-xl border border-white/10"
        style={{ backgroundColor: hex }}
      />
      <p className={`font-mono text-xs ${light ? "text-[#0A0F0E]" : "text-[#F5FAF7]"}`}>
        {hex}
      </p>
      <p className={`font-heading text-sm font-medium ${light ? "text-[#0A0F0E]" : "text-[#F5FAF7]"}`}>
        {name}
      </p>
      <p className={`text-xs ${light ? "text-[#4A6358]" : "text-[#4A6358]"}`}>{usage}</p>
    </div>
  );
}

// ─── Type specimen ────────────────────────────────────────────────────────────

function TypeSpecimen({
  sample,
  label,
  className,
}: {
  sample: string;
  label: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className={className} style={{ color: "#F5FAF7" }}>
        {sample}
      </p>
      <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
        {label}
      </p>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <h2
          className="font-heading text-xs font-medium tracking-widest uppercase"
          style={{ color: "#4A6358" }}
        >
          {title}
        </h2>
        <div className="flex-1 h-px" style={{ backgroundColor: "#1E2E28" }} />
      </div>
      {children}
    </section>
  );
}

// ─── Main showcase ────────────────────────────────────────────────────────────

export function BrandShowcase() {
  return (
    <div
      className="min-h-screen p-8 md:p-16 space-y-16"
      style={{ backgroundColor: "#0A0F0E", color: "#F5FAF7" }}
    >
      {/* Header */}
      <div className="space-y-2">
        <LogoFull height={32} />
        <p className="font-mono text-xs mt-4" style={{ color: "#4A6358" }}>
          Brand &amp; Design System · Internal Reference
        </p>
      </div>

      {/* ── Logo variants ── */}
      <Section title="Logo Variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark background — primary usage */}
          <div
            className="rounded-2xl p-8 space-y-6 border"
            style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
          >
            <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
              LogoMark — on dark
            </p>
            <LogoMark size={48} />
          </div>

          <div
            className="rounded-2xl p-8 space-y-6 border"
            style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
          >
            <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
              LogoFull — on dark (primary)
            </p>
            <LogoFull height={36} />
          </div>

          <div
            className="rounded-2xl p-8 space-y-6 border"
            style={{ backgroundColor: "#0F6E56", borderColor: "#0F6E56" }}
          >
            <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              LogoFullLight — on green/colored bg
            </p>
            <LogoFullLight height={36} />
          </div>

          {/* Light background */}
          <div className="rounded-2xl p-8 space-y-6 border bg-white" style={{ borderColor: "#E5E7EB" }}>
            <p className="font-mono text-xs text-gray-400">
              LogoFullDark — on light bg (docs, certs)
            </p>
            <LogoFullDark height={36} />
          </div>
        </div>

        {/* Size range */}
        <div
          className="rounded-2xl p-8 border flex items-end gap-8 flex-wrap"
          style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
        >
          <p className="font-mono text-xs w-full" style={{ color: "#4A6358" }}>
            LogoMark at all sizes
          </p>
          {[16, 24, 32, 44, 56, 72].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <LogoMark size={s} />
              <span className="font-mono text-xs" style={{ color: "#4A6358" }}>
                {s}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Color palette ── */}
      <Section title="Color Palette">
        {/* Primary green */}
        <div>
          <p className="font-mono text-xs mb-4" style={{ color: "#4A6358" }}>
            Green — primary. Growth, Africa, life.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <Swatch hex={brand.green[50]}  name="green-50"  usage="Backgrounds" />
            <Swatch hex={brand.green[100]} name="green-100" usage="Highlights" />
            <Swatch hex={brand.green[400]} name="green-400" usage="Accent teal" />
            <Swatch hex={brand.green[600]} name="green-600" usage="PRIMARY" />
            <Swatch hex={brand.green[800]} name="green-800" usage="Deep" />
            <Swatch hex={brand.green[900]} name="green-900" usage="Darkest" />
          </div>
        </div>

        {/* Amber */}
        <div>
          <p className="font-mono text-xs mb-4" style={{ color: "#4A6358" }}>
            Amber — secondary. Energy, Web3, warmth.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            <Swatch hex={brand.amber[50]}  name="amber-50"  usage="Backgrounds" />
            <Swatch hex={brand.amber[100]} name="amber-100" usage="Highlights" />
            <Swatch hex={brand.amber[400]} name="amber-400" usage="SECONDARY · CTA" />
            <Swatch hex={brand.amber[600]} name="amber-600" usage="Hover state" />
            <Swatch hex={brand.amber[800]} name="amber-800" usage="Deep" />
          </div>
        </div>

        {/* Dark neutrals */}
        <div>
          <p className="font-mono text-xs mb-4" style={{ color: "#4A6358" }}>
            Neutrals — dark-first UI
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Swatch hex={brand.dark.bg}      name="dark.bg"      usage="Page background" />
            <Swatch hex={brand.dark.surface} name="dark.surface" usage="Card surface" />
            <Swatch hex={brand.dark.border}  name="dark.border"  usage="Borders" />
            <Swatch hex={brand.dark.muted}   name="dark.muted"   usage="Muted text" />
          </div>
        </div>

        {/* Off-white */}
        <div>
          <p className="font-mono text-xs mb-4" style={{ color: "#4A6358" }}>
            Off-white — text on dark backgrounds
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Swatch hex={brand.white} name="white" usage="Body text / logo on dark" />
          </div>
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div className="space-y-6">
          <TypeSpecimen
            sample="Web3, Enfin Clair."
            label="Space Grotesk 600 · 48px · heading (h1)"
            className="font-heading font-semibold text-5xl"
          />
          <TypeSpecimen
            sample="La première plateforme Web3 pour l'Afrique"
            label="Space Grotesk 500 · 30px · heading (h2)"
            className="font-heading font-medium text-3xl"
          />
          <TypeSpecimen
            sample="Learn blockchain, DeFi, and smart contracts in French and English"
            label="Inter 400 · 18px · body (lg)"
            className="font-body text-lg"
          />
          <TypeSpecimen
            sample="Works on 3G. Text-first. African examples."
            label="Inter 400 · 16px · body (base)"
            className="font-body text-base"
          />
          <TypeSpecimen
            sample="BEGINNER · FREE · 6 LESSONS"
            label="Inter 500 · 12px · label / badge"
            className="font-body font-medium text-xs tracking-widest uppercase"
          />
          <TypeSpecimen
            sample={`const njangi = await program.methods.createGroup().rpc();`}
            label="JetBrains Mono 400 · 14px · code"
            className="font-mono text-sm"
          />
        </div>
      </Section>

      {/* ── Glassmorphism ── */}
      <Section title="Glass Card Utility">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Blockchain 101", "DeFi Essentials", "Njangi DApp"].map((title) => (
            <div key={title} className="glass-card p-6 space-y-2">
              <p className="font-heading font-semibold" style={{ color: "#F5FAF7" }}>
                {title}
              </p>
              <p className="text-sm" style={{ color: "#4A6358" }}>
                Hover to see border brighten
              </p>
              <div className="flex gap-2 pt-2">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#0F6E5620", color: "#1D9E75" }}
                >
                  Free
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#EF9F2720", color: "#EF9F27" }}
                >
                  Beginner
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Design rules ── */}
      <Section title="Design Rules">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Dark first", "Background always #0A0F0E. Light mode not for launch."],
            ["Glassmorphism", "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"],
            ["Green = action", "Primary CTAs, progress indicators, success states"],
            ["Amber = reward", "Tokens, badges, streaks, secondary CTAs"],
            ["Mobile first", "Design at 375px, scale up. Test on real Android."],
            ["Low bandwidth", "No autoplay video. Lazy-load images. Prefer SVG."],
            ["Always bilingual", "Every string through t(). Never hardcode EN or FR."],
            ["Framer Motion", "All page transitions and scroll-triggered animations."],
          ].map(([rule, desc]) => (
            <div
              key={rule}
              className="rounded-xl p-4 border"
              style={{ backgroundColor: "#111915", borderColor: "#1E2E28" }}
            >
              <p className="font-heading font-medium text-sm mb-1" style={{ color: "#F5FAF7" }}>
                {rule}
              </p>
              <p className="font-mono text-xs" style={{ color: "#4A6358" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
