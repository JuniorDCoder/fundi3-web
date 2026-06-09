import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// F3 mark geometry (in a 44×44 square viewBox)
//
// The F is three left-aligned bars:
//   top (24px) + shorter middle (16px) + implied base from shared bottom bar
// The 3 is three right-aligned bars starting at x=30:
//   top (14px) + middle (14px) + implied bottom from shared bottom bar
// The shared full-width bottom bar (44px) ─ the "blockchain link" ─ bridges
// both letters and is the visual signature of the mark.
// ─────────────────────────────────────────────────────────────────────────────

interface BlocksProps {
  fill: string;
}

function Blocks({ fill }: BlocksProps) {
  return (
    <>
      {/* F — top bar (wider) */}
      <rect x="0" y="4" width="24" height="8" rx="1.5" fill={fill} />
      {/* F — middle stroke (shorter, left-aligned) */}
      <rect x="0" y="18" width="16" height="8" rx="1.5" fill={fill} />
      {/* 3 — top bar (right-aligned, starts at x=30) */}
      <rect x="30" y="4" width="14" height="8" rx="1.5" fill={fill} />
      {/* 3 — middle bar (right-aligned, same width as 3 top) */}
      <rect x="30" y="18" width="14" height="8" rx="1.5" fill={fill} />
      {/* Shared bottom bar — F stem + 3 bottom, the connecting "block" */}
      <rect x="0" y="32" width="44" height="8" rx="1.5" fill={fill} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LogoMark — icon only, 1:1 square
// ─────────────────────────────────────────────────────────────────────────────

interface LogoMarkProps {
  className?: string;
  size?: number;
  fill?: string;
}

export function LogoMark({
  className,
  size = 44,
  fill = "#0F6E56",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      role="img"
      aria-label="Fundi3"
    >
      <Blocks fill={fill} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal base for all LogoFull variants
// viewBox 148×44: mark (44×44) + 14px gap + wordmark (~90px)
// ─────────────────────────────────────────────────────────────────────────────

interface LogoFullBaseProps {
  className?: string;
  height?: number;
  markFill: string;
  wordmarkFill: string;
}

function LogoFullBase({
  className,
  height = 44,
  markFill,
  wordmarkFill,
}: LogoFullBaseProps) {
  return (
    <svg
      viewBox="0 0 148 44"
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      role="img"
      aria-label="Fundi3"
    >
      <Blocks fill={markFill} />
      <text
        x="58"
        y="22"
        dominantBaseline="middle"
        fontFamily="var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif"
        fontSize="22"
        fontWeight="600"
        letterSpacing="-0.4"
        fill={wordmarkFill}
      >
        Fundi3
      </text>
    </svg>
  );
}

interface LogoFullProps {
  className?: string;
  height?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// LogoFull — horizontal mark + wordmark (green mark, off-white text)
// Use on dark backgrounds as default
// ─────────────────────────────────────────────────────────────────────────────
export function LogoFull({ className, height }: LogoFullProps) {
  return (
    <LogoFullBase
      className={className}
      height={height}
      markFill="#0F6E56"
      wordmarkFill="#F5FAF7"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LogoFullLight — fully white version for dark or colored backgrounds
// ─────────────────────────────────────────────────────────────────────────────
export function LogoFullLight({ className, height }: LogoFullProps) {
  return (
    <LogoFullBase
      className={className}
      height={height}
      markFill="#FFFFFF"
      wordmarkFill="#FFFFFF"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LogoFullDark — dark text version for light backgrounds (docs, certificates)
// ─────────────────────────────────────────────────────────────────────────────
export function LogoFullDark({ className, height }: LogoFullProps) {
  return (
    <LogoFullBase
      className={className}
      height={height}
      markFill="#0F6E56"
      wordmarkFill="#0A0F0E"
    />
  );
}
