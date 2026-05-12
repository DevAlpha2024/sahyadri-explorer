import { Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

export function AppHeader({
  title,
  subtitle,
  back = false,
  right,
  transparent = false,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  transparent?: boolean;
}) {
  const router = useRouter();
  return (
    <header
      className={`sticky top-0 z-30 px-4 pt-[max(env(safe-area-inset-top),12px)] pb-3 ${
        transparent ? "bg-transparent" : "bg-background/85 backdrop-blur-xl border-b border-border/60"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {back && (
            <button
              onClick={() => router.history.back()}
              className="size-9 -ml-1 grid place-items-center rounded-full bg-card border border-border"
              aria-label="Back"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          <div className="min-w-0">
            {subtitle && (
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {subtitle}
              </div>
            )}
            {title && (
              <h1 className="font-display text-lg font-semibold truncate">{title}</h1>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {right ?? (
            <Link
              to="/profile"
              className="size-9 grid place-items-center rounded-full bg-card border border-border text-muted-foreground"
            >
              <MoreHorizontal className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
