import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Compass as CompassIcon, Mountain, Eye } from "lucide-react";

export const Route = createFileRoute("/compass")({
  component: CompassScreen,
});

const sights = [
  { name: "Rajgad", bearing: 142, dist: "21 km", elev: "1,395 m", visible: true },
  { name: "Torna", bearing: 168, dist: "26 km", elev: "1,403 m", visible: true },
  { name: "Purandar", bearing: 92, dist: "18 km", elev: "1,387 m", visible: false },
  { name: "Lohagad", bearing: 318, dist: "44 km", elev: "1,033 m", visible: false },
];

function CompassScreen() {
  const heading = 28;
  return (
    <div className="flex-1 bg-background">
      <AppHeader title="Inter-fort sightlines" subtitle="From Sinhagad summit" />

      <div className="px-4 pb-6">
        {/* Compass */}
        <div className="relative mx-auto mt-2 aspect-square w-full max-w-[320px] rounded-full bg-gradient-forest text-primary-foreground shadow-fort overflow-hidden">
          {/* tick ring */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
            {Array.from({ length: 72 }).map((_, i) => {
              const big = i % 9 === 0;
              return (
                <line
                  key={i}
                  x1="100" y1="6" x2="100" y2={big ? 16 : 11}
                  stroke="white" strokeWidth={big ? 1.4 : 0.6} opacity={big ? 0.9 : 0.4}
                  transform={`rotate(${i * 5} 100 100)`}
                />
              );
            })}
            {/* cardinal labels */}
            {[
              ["N", 0], ["E", 90], ["S", 180], ["W", 270],
            ].map(([l, a]) => {
              const rad = (Number(a) - 90) * Math.PI / 180;
              const x = 100 + Math.cos(rad) * 78;
              const y = 100 + Math.sin(rad) * 78;
              return (
                <text key={l as string} x={x} y={y} fill="white" fontSize="10" fontWeight="600" textAnchor="middle" dominantBaseline="central" opacity={l === "N" ? 1 : 0.6}>
                  {l}
                </text>
              );
            })}
            {/* Fort bearings */}
            {sights.map((s) => {
              const rad = (s.bearing - heading - 90) * Math.PI / 180;
              const x = 100 + Math.cos(rad) * 60;
              const y = 100 + Math.sin(rad) * 60;
              return (
                <g key={s.name}>
                  <circle cx={x} cy={y} r="4" fill={s.visible ? "oklch(0.72 0.18 55)" : "white"} opacity={s.visible ? 1 : 0.5} />
                </g>
              );
            })}
            {/* needle */}
            <g transform="translate(100 100)">
              <polygon points="0,-50 6,0 0,8 -6,0" fill="oklch(0.72 0.18 55)" />
              <circle r="4" fill="white" />
            </g>
          </svg>

          {/* center label */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-center mt-24">
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">Heading</div>
              <div className="font-display text-2xl font-semibold">{heading}° NE</div>
            </div>
          </div>
        </div>

        {/* Visibility toggle */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-card p-3 px-4">
          <div className="flex items-center gap-2">
            <Eye className="size-4 text-accent" />
            <div className="text-sm font-medium">Show only visible from here</div>
          </div>
          <div className="w-10 h-6 rounded-full bg-primary p-0.5 flex justify-end">
            <div className="size-5 rounded-full bg-white" />
          </div>
        </div>

        {/* Sightline list */}
        <h3 className="mt-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">In your line of sight</h3>
        <div className="mt-2 space-y-2.5">
          {sights.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className={`size-11 rounded-xl grid place-items-center ${s.visible ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"}`}>
                <Mountain className="size-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-display text-base font-semibold">{s.name}</div>
                  {s.visible && <span className="text-[9px] uppercase tracking-widest text-accent font-semibold">visible</span>}
                </div>
                <div className="text-[11px] text-muted-foreground">{s.dist} · summit {s.elev}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs font-semibold tabular-nums">
                  <CompassIcon className="size-3 text-muted-foreground" /> {s.bearing}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
