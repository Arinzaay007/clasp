"use client";
type LogoProps = {
  /** Rendered size of the mark in px. */
  size?: number;
  /** Hide the CLASP wordmark (used inside dense cards). */
  markOnly?: boolean;
  className?: string;
};

/**
 * The CLASP brand mark — the approved logo artwork, presented in a
 * gradient-lit frame so it reads on both light and dark surfaces.
 */
export default function Logo({
  size = 42,
  markOnly = false,
  className = '',
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%]"
        style={{
          width: size,
          height: size,
          background:
            'linear-gradient(150deg, rgba(240,180,41,0.22), rgba(217,155,46,0.12))',
          border: '1px solid rgba(240,180,41,0.38)',
          boxShadow:
            '0 12px 30px rgba(240,180,41,0.22), inset 0 1px 0 rgba(255,255,255,0.14)',
        }}
      >
        <img
          src="/uploads/clasp-logo.jpg"
          alt="CLASP logo"
          width={size}
          height={size}
          className="logo-gold h-full w-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(255,255,255,0.16), transparent 42%)',
          }}
        />
      </span>

      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-[0.2em] text-[#eef5ff]"
            style={{ fontSize: Math.round(size * 0.44) }}
          >
            CLASP
          </span>
          {size >= 38 && (
            <span
              className="mt-[5px] font-mono uppercase text-[#7c97b6]"
              style={{
                fontSize: Math.max(8, Math.round(size * 0.2)),
                letterSpacing: '0.22em',
              }}
            >
              Stocknized agents
            </span>
          )}
        </span>
      )}
    </span>
  );
}
