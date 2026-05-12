import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import heroImg from "@/assets/sinhagad-hero.jpg";
import { useState } from "react";
import { Play, Headphones, MapPin, Clock, TrendingUp, CloudSun, Sunrise, Sunset, Languages, Download, Share2, Heart, Droplet, DoorOpen, Eye, Route as RouteIcon, Footprints, Flag, ChevronRight, Mountain, Navigation } from "lucide-react";

export const Route = createFileRoute("/fort/$id")({
  component: FortScreen,
});

const tabs = ["Overview", "Routes", "History", "Spots", "Weather"] as const;
type Tab = typeof tabs[number];

function FortScreen() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState<Tab>("Overview");
  const [lang, setLang] = useState<"EN" | "मर">("EN");

  return (
    <div className="flex-1 bg-background">
      {/* Hero */}
      <div className="relative h-72 -mb-6">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/40" />
        <AppHeader
          back
          transparent
          right={
            <div className="flex gap-2">
              <button className="size-9 grid place-items-center rounded-full bg-card/80 backdrop-blur border border-border/60">
                <Heart className="size-4" />
              </button>
              <button className="size-9 grid place-items-center rounded-full bg-card/80 backdrop-blur border border-border/60">
                <Share2 className="size-4" />
              </button>
            </div>
          }
        />
        <div className="absolute bottom-10 left-4 right-4 text-primary-foreground">
          <div className="text-xs opacity-90 capitalize">{id} Fort · Pune district</div>
          <h1 className="font-display text-4xl font-semibold mt-1">Sinhagad</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs opacity-90">
            <span className="flex items-center gap-1"><TrendingUp className="size-3" /> 1,312 m</span>
            <span className="flex items-center gap-1"><Clock className="size-3" /> 2h 40m</span>
            <span className="flex items-center gap-1"><MapPin className="size-3" /> 26 km away</span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="relative mx-4 rounded-2xl bg-card border border-border shadow-soft p-3 flex items-center gap-2">
        <Link to="/map" className="flex-1 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold text-center">
          Start trek
        </Link>
        <button className="size-10 rounded-xl bg-secondary grid place-items-center" aria-label="Download maps">
          <Download className="size-4" />
        </button>
        <button
          onClick={() => setLang(lang === "EN" ? "मर" : "EN")}
          className="h-10 px-3 rounded-xl bg-secondary text-xs font-semibold inline-flex items-center gap-1"
        >
          <Languages className="size-3.5" /> {lang}
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-5 px-4">
        <div className="flex gap-1 p-1 rounded-full bg-secondary text-xs font-medium">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-full transition ${
                tab === t ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 pb-8">
        {tab === "Overview" && <Overview />}
        {tab === "Routes" && <RoutesTab />}
        {tab === "History" && <History lang={lang} />}
        {tab === "Spots" && <Spots />}
        {tab === "Weather" && <Weather />}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="text-[10px] uppercase tracking-widest text-accent">At your pace</div>
        <div className="mt-1 flex items-baseline gap-2">
          <div className="font-display text-3xl font-semibold">2h 40m</div>
          <div className="text-xs text-muted-foreground">avg trekker: 2h 10m</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-dawn" />
        </div>
        <div className="mt-1.5 text-[11px] text-muted-foreground">Calibrated from your last 4 treks</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Mini icon={<DoorOpen className="size-4 text-primary" />} label="Entry" v="Pune Darwaza" />
        <Mini icon={<DoorOpen className="size-4 text-destructive" />} label="Exit" v="Kalyan Darwaza" />
        <Mini icon={<Droplet className="size-4 text-blue-500" />} label="Water" v="3 cisterns" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-base font-semibold">Why go</h3>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          The hill of the lion. A fort of cliffs, courage and the legend of Tanaji Malusare. Best in monsoon, magical at sunrise from Devtake point.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
        <div className="size-12 rounded-full bg-accent/15 grid place-items-center text-accent">
          <Headphones className="size-5" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">Audio tour ready</div>
          <div className="text-[11px] text-muted-foreground">7 stops · 22 min · plays automatically near each landmark</div>
        </div>
        <button className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center">
          <Play className="size-4 fill-current" />
        </button>
      </div>
    </div>
  );
}

function History({ lang }: { lang: "EN" | "मर" }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">1670 CE · The Battle of Sinhagad</div>
        <h3 className="font-display text-xl font-semibold mt-1">
          {lang === "EN" ? "The lion who took the fort" : "गड आला पण सिंह गेला"}
        </h3>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          {lang === "EN"
            ? "On a moonless February night, Tanaji Malusare scaled the western cliffs with a monitor lizard rope. He took the fort for Shivaji Maharaj — and lost his life doing so. 'Gad ala pan Sinh gela.'"
            : "एका अमावास्येच्या रात्री तानाजी मालुसरे यांनी घोरपडीच्या साहाय्याने पश्चिम कडा चढून शिवाजी महाराजांसाठी हा गड जिंकला — पण स्वतःचा जीव गमावला."}
        </p>

        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/15 text-accent px-3 py-1.5 text-xs font-semibold">
          <Headphones className="size-3.5" /> Play 4 min narration
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display text-base font-semibold">Tanaji's Samadhi</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          A simple stone memorial at the western edge marks where the Subhedar fell. Audio narration triggers when you walk within 20 m.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="size-3" /> 18.3661° N · 73.7551° E
        </div>
      </div>
    </div>
  );
}

function Spots() {
  const items = [
    { icon: <Eye className="size-4" />, name: "Devtake Point", type: "Viewpoint", time: "15 min", color: "bg-accent/15 text-accent" },
    { icon: <Eye className="size-4" />, name: "Taramati Peak", type: "Viewpoint", time: "20 min", color: "bg-accent/15 text-accent" },
    { icon: <DoorOpen className="size-4" />, name: "Pune Darwaza", type: "Entry gate", time: "—", color: "bg-primary/15 text-primary" },
    { icon: <DoorOpen className="size-4" />, name: "Kalyan Darwaza", type: "Exit gate", time: "—", color: "bg-destructive/15 text-destructive" },
    { icon: <Droplet className="size-4" />, name: "Dev Tank", type: "Water cistern", time: "5 min", color: "bg-blue-500/15 text-blue-600" },
    { icon: <Droplet className="size-4" />, name: "Ganesh Tank", type: "Water cistern", time: "5 min", color: "bg-blue-500/15 text-blue-600" },
  ];
  return (
    <div className="space-y-2.5">
      {items.map((i) => (
        <div key={i.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
          <div className={`size-10 rounded-xl grid place-items-center ${i.color}`}>{i.icon}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{i.name}</div>
            <div className="text-[11px] text-muted-foreground">{i.type}</div>
          </div>
          <div className="text-[11px] text-muted-foreground">{i.time}</div>
        </div>
      ))}
    </div>
  );
}

function Weather() {
  const days = [
    { d: "Today", t: "24°", c: "Clear", i: "☀️" },
    { d: "Tue", t: "23°", c: "Clouds", i: "⛅" },
    { d: "Wed", t: "21°", c: "Light rain", i: "🌦️" },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-dawn text-primary-foreground p-5 shadow-fort">
        <div className="flex items-center gap-2 text-xs opacity-90">
          <CloudSun className="size-4" /> Cached 14 min ago · Open-Meteo
        </div>
        <div className="mt-3 font-display text-5xl font-semibold">24°</div>
        <div className="text-sm opacity-90">Clear · feels like 22° · wind 8 km/h NE</div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Sunrise className="size-4" />
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Sunrise</div>
              <div className="font-semibold">06:24</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sunset className="size-4" />
            <div>
              <div className="text-[10px] uppercase tracking-wider opacity-70">Sunset</div>
              <div className="font-semibold">18:48</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-2">
        {days.map((d, i) => (
          <div
            key={d.d}
            className={`flex items-center justify-between p-3 ${i < days.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{d.i}</div>
              <div>
                <div className="text-sm font-semibold">{d.d}</div>
                <div className="text-[11px] text-muted-foreground">{d.c}</div>
              </div>
            </div>
            <div className="font-display text-lg font-semibold">{d.t}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-secondary/40 p-4">
        <div className="text-[10px] uppercase tracking-widest text-primary">Best dates to visit</div>
        <div className="mt-1 text-sm">
          <span className="font-semibold">Sat 15 Jun</span> · clear sunrise window, 22°, wind 6 km/h
        </div>
      </div>
    </div>
  );
}

function Mini({ icon, label, v }: { icon: React.ReactNode; label: string; v: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div>{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">{label}</div>
      <div className="text-xs font-semibold mt-0.5 truncate">{v}</div>
    </div>
  );
}
