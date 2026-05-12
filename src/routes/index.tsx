import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/sinhagad-hero.jpg";
import topoImg from "@/assets/topo-texture.jpg";
import {
  MapPin, Navigation, Activity, CloudSun, Siren, Compass,
  Headphones, Mountain, BatteryCharging, Clock, Download,
  Wifi, WifiOff, Languages, Footprints, ArrowUpRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sahyadri — Offline Forts of Maharashtra" },
      { name: "description", content: "Premium offline trekking companion for Maharashtra's forts. Maps, history, weather, and SOS — all without signal." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <StatsBar />
      <PhaseSection
        eyebrow="Phase 1 · Core & Smart"
        title="Everything you need on the mountain."
        subtitle="Built for the moment your signal disappears at the basecamp."
        features={phase1}
        accent="forest"
      />
      <AppPreview />
      <PhaseSection
        eyebrow="Phase 2 · Premium & Immersion"
        title="Hear the stories. Feel the history."
        subtitle="Geofenced narration, inter-fort sightlines, and battery-saving intelligence."
        features={phase2}
        accent="dawn"
      />
      <Roadmap />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-lg bg-gradient-forest grid place-items-center shadow-soft">
            <Mountain className="size-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold">Sahyadri</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Offline Forts</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#preview" className="hover:text-foreground transition">Preview</a>
          <a href="#roadmap" className="hover:text-foreground transition">Roadmap</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-soft">
          <Download className="size-4" /> Get APK
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sinhagad fort at sunrise" className="size-full object-cover" width={1600} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-44">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Now on field-test at Sinhagad Fort
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold leading-[0.95] text-balance">
            The Sahyadri,<br />
            <span className="italic text-accent">in your pocket.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance">
            A hyper-local, offline-first companion for Maharashtra's forts. Maps that work without signal. History that finds you. Safety that doesn't blink.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 font-medium shadow-fort hover:scale-[1.02] transition">
              <Download className="size-4" /> Download for Android
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-6 py-3 font-medium hover:bg-card transition">
              See features <ArrowUpRight className="size-4" />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
            <Pill icon={<WifiOff className="size-3.5" />} label="100% Offline" />
            <Pill icon={<Languages className="size-3.5" />} label="मराठी / English" />
            <Pill icon={<Siren className="size-3.5" />} label="SMS SOS" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-accent">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { v: "350+", l: "Sahyadri forts mapped" },
    { v: "0 KB", l: "Mobile data on trail" },
    { v: "<10%", l: "Battery / hour tracking" },
    { v: "20 m", l: "Geofence audio trigger" },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display text-3xl md:text-4xl font-semibold">{s.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

type Feature = { icon: React.ReactNode; title: string; body: string; tag: string };

const phase1: Feature[] = [
  { icon: <MapPin className="size-5" />, tag: "Core", title: "Offline maps + GPS dot", body: "MapLibre renders .mbtiles straight from device storage. A live blue dot keeps you oriented even at 0 bars." },
  { icon: <Activity className="size-5" />, tag: "Smart", title: "Live track & stats", body: "Distance, elevation gain, calories — recorded by a foreground service and exportable as GPX." },
  { icon: <Navigation className="size-5" />, tag: "Core", title: "Routes & best spots", body: "Color-coded Darwazas (entry · exit · alt) plus the top 5 viewpoints and water cisterns with bottom-sheet lore." },
  { icon: <Clock className="size-5" />, tag: "Smart", title: "Personal time prediction", body: "Learns your pace from past tracks and predicts route times for you, not the average trekker." },
  { icon: <CloudSun className="size-5" />, tag: "Core", title: "Weather & best dates", body: "3-day Open-Meteo forecast and sunrise/sunset times pre-cached before you lose signal." },
  { icon: <Siren className="size-5" />, tag: "Safety", title: "Emergency SOS", body: "One tap dispatches an SMS with your live coordinates to chosen contacts. No data needed." },
];

const phase2: Feature[] = [
  { icon: <Headphones className="size-5" />, tag: "Info", title: "Audio narration", body: "Walk near Tanaji's Samadhi and the story plays itself. Geofenced, offline, in Marathi or English." },
  { icon: <Compass className="size-5" />, tag: "Premium", title: "Inter-fort sightlines", body: "Compass overlay shows bearing and distance to Rajgad, Torna and beyond — visible from where you stand." },
  { icon: <Footprints className="size-5" />, tag: "Smart", title: "Spot-by-spot time", body: "Geofenced check-ins log how long you spent at Taramati, Kalyan Darwaza, and every viewpoint." },
  { icon: <BatteryCharging className="size-5" />, tag: "Tech", title: "Battery-saver mode", body: "Polling drops from 1s → 5s when you stop, screen dims when the map idles. Hours of extra runtime." },
];

function PhaseSection({
  eyebrow, title, subtitle, features, accent,
}: { eyebrow: string; title: string; subtitle: string; features: Feature[]; accent: "forest" | "dawn" }) {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <div className={`inline-block text-xs font-medium tracking-[0.2em] uppercase ${accent === "dawn" ? "text-accent" : "text-primary"}`}>
          {eyebrow}
        </div>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">{title}</h2>
        <p className="mt-4 text-lg text-muted-foreground text-balance">{subtitle}</p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f) => (
          <article key={f.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-fort hover:-translate-y-1 transition-all duration-300">
            <div className={`absolute -top-12 -right-12 size-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition ${accent === "dawn" ? "bg-accent" : "bg-primary"}`} />
            <div className="flex items-center justify-between">
              <div className={`size-11 rounded-xl grid place-items-center ${accent === "dawn" ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"}`}>
                {f.icon}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2 py-0.5">
                {f.tag}
              </span>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section id="preview" className="relative overflow-hidden bg-gradient-forest text-primary-foreground">
      <img src={topoImg} alt="" className="absolute inset-0 size-full object-cover opacity-[0.06] mix-blend-screen" loading="lazy" width={1280} height={1280} />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-accent">Live preview</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance">
            One screen. Every answer the mountain might ask of you.
          </h2>
          <p className="mt-5 text-primary-foreground/70 text-lg max-w-lg">
            Your live position, the next viewpoint, your pace, the weather closing in — and a single button to call for help.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            {[
              "Pinch-zoom on cached vector tiles, no tile errors.",
              "Pace-aware ETAs that update every 30 seconds.",
              "SOS button is always one thumb-press away.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1.5 size-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative w-[320px] h-[640px] rounded-[3rem] bg-foreground p-3 shadow-fort">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 rounded-b-2xl bg-foreground z-20" />
      <div className="relative size-full rounded-[2.4rem] overflow-hidden bg-card flex flex-col">
        {/* Map area */}
        <div className="relative flex-1 bg-[oklch(0.92_0.03_140)] overflow-hidden">
          <img src={topoImg} alt="" className="absolute inset-0 size-full object-cover opacity-80" loading="lazy" />
          {/* Trail */}
          <svg viewBox="0 0 300 400" className="absolute inset-0 size-full">
            <path d="M40 380 Q 90 300 70 240 T 150 140 Q 200 100 230 60" fill="none" stroke="oklch(0.72 0.18 55)" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
            <circle cx="40" cy="380" r="6" fill="oklch(0.32 0.06 155)" />
            <circle cx="230" cy="60" r="6" fill="oklch(0.55 0.22 27)" />
          </svg>
          {/* POI dots */}
          <div className="absolute top-[28%] left-[55%] size-3 rounded-full bg-accent ring-4 ring-accent/30" />
          <div className="absolute top-[55%] left-[35%] size-3 rounded-full bg-primary ring-4 ring-primary/30" />
          {/* Live blue dot */}
          <div className="absolute top-[68%] left-[45%]">
            <div className="absolute inset-0 size-5 rounded-full bg-blue-500/30 animate-ping" />
            <div className="relative size-5 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
          </div>
          {/* Status pill */}
          <div className="absolute top-12 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
              <WifiOff className="size-3 text-muted-foreground" /> Offline · Maps cached
            </div>
            <div className="rounded-full bg-card/95 backdrop-blur px-2.5 py-1.5 text-[11px] font-medium flex items-center gap-1">
              <CloudSun className="size-3 text-accent" /> 24°
            </div>
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="bg-card p-4 border-t border-border">
          <div className="mx-auto h-1 w-10 rounded-full bg-border mb-3" />
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Donje Route</div>
              <div className="font-display text-lg font-semibold">Tanaji Samadhi</div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-semibold text-accent">2h 40m</div>
              <div className="text-[10px] text-muted-foreground">at your pace</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Stat label="Dist" v="3.2km" />
            <Stat label="Gain" v="420m" />
            <Stat label="Pace" v="4.1km/h" />
          </div>
          <button className="mt-3 w-full rounded-xl bg-destructive text-destructive-foreground py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
            <Siren className="size-4" /> Emergency SOS
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg bg-muted py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{v}</div>
    </div>
  );
}

function Roadmap() {
  const items = [
    { phase: "Phase 1", title: "MVP — Sinhagad", body: "Maps, GPS, GPX tracking, weather, SOS. Battle-tested on Donje route.", status: "In build" },
    { phase: "Phase 2", title: "Audio & Sightlines", body: "Geofenced narration, inter-fort compass, spot timers, battery-saver.", status: "Q3" },
    { phase: "Phase 3", title: "All Sahyadri", body: "Rajgad, Torna, Raigad, Harishchandragad — and the rest of the 350.", status: "Q4" },
  ];
  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="text-xs uppercase tracking-[0.2em] text-primary">Roadmap</div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold max-w-2xl text-balance">
        From one fort to every fort.
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-5">
        {items.map((i, idx) => (
          <div key={i.title} className="relative rounded-2xl border border-border bg-card p-7">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground tracking-widest uppercase">{i.phase}</span>
              <span className="rounded-full bg-accent/15 text-accent px-2 py-0.5 font-medium">{i.status}</span>
            </div>
            <div className="mt-6 font-display text-7xl font-semibold text-primary/10">0{idx + 1}</div>
            <h3 className="mt-4 font-display text-xl font-semibold">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-forest grid place-items-center">
            <Mountain className="size-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display font-semibold">Sahyadri</div>
            <div className="text-xs text-muted-foreground">Built by trekkers, for trekkers. Pune, India.</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Wifi className="size-3.5" /> v0.1 · Sinhagad alpha
        </div>
      </div>
    </footer>
  );
}
