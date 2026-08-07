import { forwardRef } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/**
 * Shared primitives for the Orbital Simulator Hub design system.
 * Tokens come from styles/osh-theme.css. No component defines its own colour.
 */

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Small mono section label. Replaces the old large icon headers. */
export function Kicker({
  children,
  tone = "amber",
  className,
}: {
  children: ReactNode;
  tone?: "amber" | "cyan" | "faint";
  className?: string;
}) {
  const color =
    tone === "amber"
      ? "text-osh-amber"
      : tone === "cyan"
        ? "text-osh-cyan"
        : "text-osh-faint";
  return (
    <p
      className={cx(
        "font-mono text-[11px] font-medium uppercase tracking-[0.22em]",
        color,
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Frosted content plane. Everything on a 3D backdrop sits in one of these. */
export const Panel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Panel({ className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx("osh-glass rounded-osh-md", className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

/** A single labelled readout. Value is always mono and tabular. */
export function StatCard({
  label,
  value,
  unit,
  tone = "cyan",
}: {
  label: string;
  value: string | number;
  unit?: string;
  tone?: "amber" | "cyan";
}) {
  return (
    <Panel className="flex min-w-[130px] flex-1 flex-col gap-1.5 p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-osh-faint">
        {label}
      </span>
      <span
        className={cx(
          "osh-num text-[26px] font-semibold leading-none",
          tone === "amber" ? "text-osh-amber" : "text-osh-cyan",
        )}
      >
        {value}
      </span>
      {unit ? (
        <span className="font-mono text-[10px] text-osh-faint">{unit}</span>
      ) : null}
    </Panel>
  );
}

/** Pill used for filters, tags and status. */
export function Chip({
  active = false,
  dot,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  dot?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx(
        "inline-flex items-center gap-2 rounded-osh-pill border px-3.5 py-2",
        "font-mono text-[12px] transition-colors duration-150 ease-osh",
        active
          ? "border-osh-amber/45 bg-osh-amber-dim text-osh-amber"
          : "border-osh-line bg-white/[0.02] text-osh-muted hover:border-osh-line-strong hover:text-osh-text",
        className,
      )}
      style={{ borderRadius: 999 }}
      {...rest}
    >
      {dot ? (
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: dot }}
        />
      ) : null}
      {children}
    </button>
  );
}

/** Primary action. Amber is reserved for these. */
export function ActionButton({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex items-center gap-2 rounded-osh-pill px-5 py-2.5",
        "font-mono text-[13px] font-medium transition-all duration-150 ease-osh",
        variant === "primary"
          ? "bg-osh-amber text-osh-void hover:brightness-110"
          : "border border-osh-line text-osh-text hover:border-osh-line-strong",
        className,
      )}
      style={{ borderRadius: 999 }}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Body prose block with the house measure and colour. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "max-w-[62ch] text-[15px] leading-relaxed text-osh-muted [text-wrap:pretty]",
        className,
      )}
    >
      {children}
    </div>
  );
}
