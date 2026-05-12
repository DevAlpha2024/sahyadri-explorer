import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Pause, Square, Flag, TrendingUp, Flame, Clock, Footprints, Save } from "lucide-react";

export const Route = createFileRoute("/track")({
  component: TrackScreen,
});

function TrackScreen() {
  return (
    <div className="flex-1 bg-background">
      <AppHeader title="Live Trek" subtitle="Recording · Donje route" />

      <div className="px-4 pb-6">
        {/* Big timer */}
        <div className="mt-2 rounded-3xl bg-gradient-forest text-primary-foreground p-6 shadow-fort relative overflow-hidden">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-80">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" /> Recording
            </div>
            <div className="mt-3 font-display text-6xl font-semibold tabular-nums">
              01:24<span className="text-3xl opacity-70">:36</span>
            </div>
            <div className="mt-2 text-xs opacity-80">at your pace · ETA 2h 40m to summit</div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <MiniStat label="Distance" v="3.2" unit="km" />
              <MiniStat label="Gain" v="420" unit="m" />
              <MiniStat label="Pace" v="4.1" unit="km/h" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-card border border-border">
            <Flag className="size-5 text-accent" />
            <span className="text-xs font-medium">Mark spot</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-accent text-accent-foreground">
            <Pause className="size-5" />
            <span className="text-xs font-semibold">Pause</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-card border border-border">
            <Square className="size-5 text-destructive" />
            <span className="text-xs font-medium">Stop</span>
          </button>
        </div>

        {/* Stats grid */}
        <h2 className="mt-7 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">This trek</h2>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <StatCard icon={<TrendingUp className="size-4" />} label="Elevation gain" v="420 m" sub="of ~520 m" />
          <StatCard icon={<Flame className="size-4" />} label="Calories" v="612" sub="kcal burned" />
          <StatCard icon={<Footprints className="size-4" />} label="Steps" v="4,820" sub="counted" />
          <StatCard icon={<Clock className="size-4" />} label="Moving time" v="1h 18m" sub="6 min paused" />
        </div>

        {/* Elevation chart */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium">Elevation profile</div>
            <div className="text-[10px] text-muted-foreground">m over km</div>
          </div>
          <svg viewBox="0 0 300 100" className="mt-2 w-full h-24">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.32 0.06 155)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="oklch(0.32 0.06 155)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80 L40 70 L80 60 L120 45 L160 50 L200 30 L240 20 L280 12 L300 8 L300 100 L0 100 Z" fill="url(#g)" />
            <path d="M0 80 L40 70 L80 60 L120 45 L160 50 L200 30 L240 20 L280 12 L300 8" fill="none" stroke="oklch(0.32 0.06 155)" strokeWidth="2" />
            <circle cx="120" cy="45" r="4" fill="oklch(0.72 0.18 55)" />
          </svg>
          <div className="mt-1 text-[10px] text-muted-foreground">You are here · 1,022 m</div>
        </div>

        <button className="mt-5 w-full rounded-2xl bg-primary text-primary-foreground py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Save className="size-4" /> Export GPX & finish
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, v, unit }: { label: string; v: string; unit: string }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur py-3">
      <div className="font-display text-2xl font-semibold tabular-nums">{v}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-70 mt-0.5">{label} · {unit}</div>
    </div>
  );
}

function StatCard({ icon, label, v, sub }: { icon: React.ReactNode; label: string; v: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-accent">{icon}</span>
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <div className="mt-2 font-display text-2xl font-semibold tabular-nums">{v}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}
