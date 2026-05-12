import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import heroImg from "@/assets/sinhagad-hero.jpg";
import rajgadImg from "@/assets/fort-rajgad.jpg";
import tornaImg from "@/assets/fort-torna.jpg";
import raigadImg from "@/assets/fort-raigad.jpg";
import { Search, MapPin, Download, CheckCircle2, ArrowRight, Mountain, CloudSun } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeScreen,
});

const forts = [
  { id: "sinhagad", name: "Sinhagad", region: "Pune", dist: "26 km", img: heroImg, downloaded: true, elev: "1312 m" },
  { id: "rajgad", name: "Rajgad", region: "Pune", dist: "55 km", img: rajgadImg, downloaded: true, elev: "1395 m" },
  { id: "torna", name: "Torna", region: "Pune", dist: "60 km", img: tornaImg, downloaded: false, elev: "1403 m" },
  { id: "raigad", name: "Raigad", region: "Raigad", dist: "138 km", img: raigadImg, downloaded: false, elev: "820 m" },
];

function HomeScreen() {
  return (
    <div className="flex-1 bg-background">
      <AppHeader subtitle="नमस्कार · Welcome" title="Sahyadri" />

      <div className="px-4 pb-6">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 h-12">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Search forts, routes, viewpoints…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Featured Sinhagad */}
        <Link
          to="/fort/$id"
          params={{ id: "sinhagad" }}
          className="mt-5 block relative h-56 rounded-3xl overflow-hidden shadow-fort"
        >
          <img src={heroImg} alt="Sinhagad" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
            <CheckCircle2 className="size-3" /> Maps cached
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
            <div className="text-xs opacity-80">Featured · Best in monsoon</div>
            <div className="font-display text-3xl font-semibold">Sinhagad Fort</div>
            <div className="mt-2 flex items-center gap-3 text-xs opacity-90">
              <span className="flex items-center gap-1"><MapPin className="size-3" /> Donje route</span>
              <span className="flex items-center gap-1"><CloudSun className="size-3" /> 24°, clear</span>
            </div>
          </div>
        </Link>

        {/* Continue trek */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Resume</div>
              <div className="font-display text-base font-semibold">Donje → Pune Darwaza</div>
              <div className="text-xs text-muted-foreground mt-0.5">3.2 km recorded · paused 12 min ago</div>
            </div>
            <Link
              to="/track"
              className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3.5 py-2 text-xs font-semibold"
            >
              Continue <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Nearby forts */}
        <div className="mt-7 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Forts near you</h2>
          <button className="text-xs text-muted-foreground">See all</button>
        </div>
        <div className="mt-3 space-y-3">
          {forts.map((f) => (
            <Link
              key={f.id}
              to="/fort/$id"
              params={{ id: f.id }}
              className="flex gap-3 rounded-2xl border border-border bg-card p-2.5 active:scale-[0.99] transition"
            >
              <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
                <img src={f.img} alt={f.name} className="size-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-base font-semibold truncate">{f.name}</div>
                  {f.downloaded ? (
                    <span className="text-[10px] text-primary inline-flex items-center gap-0.5">
                      <CheckCircle2 className="size-3" /> Cached
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-foreground inline-flex items-center gap-0.5">
                      <Download className="size-3" /> 18 MB
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{f.region} district</div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="size-3" /> {f.dist}</span>
                  <span className="flex items-center gap-1"><Mountain className="size-3" /> {f.elev}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
