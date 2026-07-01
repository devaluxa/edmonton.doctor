import { businessName } from "../../lib/business/config";

type BrandMarkProps = {
  tone?: "light" | "dark";
};

export default function BrandMark({ tone = "light" }: BrandMarkProps) {
  const isLight = tone === "light";

  return (
    <span className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
          isLight
            ? "bg-white text-[var(--brand-color-primary)]"
            : "bg-[var(--brand-color-primary)] text-white"
        }`}
      >
        <span className="relative h-6 w-6">
          <span className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-current" />
        </span>
      </span>
      <span className="min-w-0 leading-none">
        <span
          className={`block text-lg font-black tracking-[0.02em] ${
            isLight ? "text-white" : "text-[var(--brand-color-ink)]"
          }`}
        >
          {businessName}
        </span>
        <span
          className={`mt-1 block text-[0.68rem] font-black uppercase tracking-[0.18em] ${
            isLight ? "text-white/70" : "text-slate-500"
          }`}
        >
          Family & Walk-In Care
        </span>
      </span>
    </span>
  );
}
