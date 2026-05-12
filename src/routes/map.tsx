import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { SosFab } from "@/components/SosFab";
import topoImg from "@/assets/topo-texture.jpg";
import { Layers, Locate, WifiOff, Plus, Minus, Droplet, Eye, DoorOpen } from "lucide-react";

export const Route = createFileRoute("/map")({
  component: MapScreen,
});

function MapScreen() {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <AppHeader
        title="Sinhagad Fort"
        subtitle="Donje route"
        right={
          <button className="size-9 grid place-items-center rounded-full bg-card border border-border">
            <Layers className="size-5" />
          </button>
        }
      />

      <div className="relative flex-1 overflow-hidden">
        {/* Map canvas */}
        <img src={topoImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/40" />

        {/* Trail path */}
        <svg viewBox="0 0 400 700" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
          <path
            d="M60 640 Q 120 540 90 440 T 200 280 Q 270 200 320 100"
            fill="none"
            stroke="oklch(0.72 0.18 55)"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />
        </svg>

        {/* Offline pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-[11px] font-medium border border-border shadow-soft">
          <WifiOff className="size-3.5 text-muted-foreground" /> Offline · 24 MB cached
        </div>

        {/* POIs */}
        <Marker top="22%" left="78%" color="bg-accent" icon={<Eye className="size-3" />} label="Devtake" />
        <Marker top="40%" left="55%" color="bg-primary" icon={<DoorOpen className="size-3" />} label="Pune Darwaza" />
        <Marker top="55%" left="32%" color="bg-blue-500" icon={<Droplet className="size-3" />} label="Dev Tank" />
        <Marker top="62%" left="68%" color="bg-destructive" icon={<DoorOpen className="size-3" />} label="Kalyan Exit" />

        {/* Live blue dot */}
        <div className="absolute top-[78%] left-[42%]">
          <div className="absolute -inset-2 size-8 rounded-full bg-blue-500/25 animate-ping" />
          <div className="relative size-5 rounded-full bg-blue-500 border-[3px] border-white shadow-fort" />
        </div>

        {/* Right side controls */}
        <div className="absolute right-3 top-20 flex flex-col gap-2">
          <button className="size-10 rounded-xl bg-card border border-border grid place-items-center shadow-soft">
            <Plus className="size-4" />
          </button>
          <button className="size-10 rounded-xl bg-card border border-border grid place-items-center shadow-soft">
            <Minus className="size-4" />
          </button>
          <button className="size-10 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-soft">
            <Locate className="size-4" />
          </button>
        </div>

        {/* Bottom POI sheet */}
        <div className="absolute left-3 right-3 bottom-3 rounded-2xl bg-card border border-border shadow-fort p-4">
          <div className="mx-auto h-1 w-10 rounded-full bg-border mb-3" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-accent">Viewpoint · 220 m away</div>
              <div className="font-display text-lg font-semibold mt-0.5">Devtake Point</div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Sweeping cliff edge facing east — best for sunrise. Watch your step in monsoon.
              </p>
            </div>
            <Link
              to="/fort/$id"
              params={{ id: "sinhagad" }}
              className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
            >
              Details
            </Link>
          </div>
        </div>
      </div>

      <SosFab />
    </div>
  );
}

function Marker({ top, left, color, icon, label }: { top: string; left: string; color: string; icon: React.ReactNode; label: string }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top, left }}>
      <div className={`size-7 rounded-full ${color} text-white grid place-items-center shadow-fort ring-2 ring-white`}>
        {icon}
      </div>
      <div className="mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-card/95 border border-border whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
