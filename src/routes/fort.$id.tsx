import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import heroImg from "@/assets/sinhagad-hero.jpg";
import { useState } from "react";
import { Play, Headphones, MapPin, Clock, TrendingUp, CloudSun, Sunrise, Sunset, Languages, Download, Share2, Heart, Droplet, DoorOpen, Eye, Route as RouteIcon, Footprints, Flag, ChevronRight, Mountain, Navigation, Quote, Signal, Ticket, ParkingSquare, Calendar, Landmark, Castle, ArrowRight, BookOpen } from "lucide-react";

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
      {/* Pace card */}
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

      {/* Famous quote */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
        <Quote className="size-4 text-accent" />
        <p className="font-display text-base italic mt-2 leading-snug">
          "गड आला, पण सिंह गेला"
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">
          The fort is won, but the lion is lost. — Shivaji Maharaj on Tanaji's death
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <Mini icon={<Mountain className="size-4 text-primary" />} label="Elevation" v="1,316 m" />
        <Mini icon={<Castle className="size-4 text-primary" />} label="Original" v="Kondhana" />
        <Mini icon={<Droplet className="size-4 text-blue-500" />} label="Cisterns" v="2 listed" />
      </div>

      {/* Visitor info */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-base font-semibold mb-3">Visitor info</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <InfoRow icon={<Clock className="size-3.5" />} label="Timings" v="06:00 – 18:00" />
          <InfoRow icon={<Ticket className="size-3.5" />} label="Entry" v="Free" />
          <InfoRow icon={<ParkingSquare className="size-3.5" />} label="2-wheeler" v="₹50" />
          <InfoRow icon={<ParkingSquare className="size-3.5" />} label="4-wheeler" v="₹100" />
          <InfoRow icon={<Signal className="size-3.5" />} label="Network" v="Poor" />
          <InfoRow icon={<Calendar className="size-3.5" />} label="Best" v="Jun–Feb" />
        </div>
      </div>

      {/* Gates */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="font-display text-base font-semibold">Fort gates</h3>
        <div className="mt-3 space-y-2.5">
          <GateRow color="bg-primary" name="Pune Darwaza" tag="Main NE entrance" desc="Massive wooden doors with deep defensive curves." />
          <GateRow color="bg-destructive" name="Kalyan Darwaza" tag="SE gateway" desc="Historically used for communication with Raigad." />
        </div>
      </div>

      {/* Audio tour */}
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
            ? "On a moonless February night, Tanaji Malusare scaled the western cliffs with a monitor lizard rope. He took the fort for Shivaji Maharaj — and lost his life fighting Udaybhan Rathod. Shivaji renamed Kondhana to Sinhagad in his honour."
            : "एका अमावास्येच्या रात्री तानाजी मालुसरे यांनी घोरपडीच्या साहाय्याने पश्चिम कडा चढून शिवाजी महाराजांसाठी हा गड जिंकला — पण उदयभान राठोडशी लढताना स्वतःचा जीव गमावला."}
        </p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/15 text-accent px-3 py-1.5 text-xs font-semibold">
          <Headphones className="size-3.5" /> Play 4 min narration
        </button>
      </div>

      {/* Timeline of rulers */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display text-base font-semibold mb-3">Who held Kondhana</h3>
        <ol className="relative space-y-3">
          {[
            { era: "Ancient", who: "Yadavas", note: "Original builders. Amruteshwar temple dates to this era." },
            { era: "14th c.", who: "Bahamani Sultanate", note: "Held briefly during Deccan expansion." },
            { era: "1670", who: "Marathas", note: "Tanaji's night raid. Renamed Sinhagad." },
            { era: "1700", who: "Mughals & Marathas", note: "Rajaram Maharaj passed away here during the wars." },
          ].map((t, i, arr) => (
            <li key={t.era} className="relative pl-7">
              {i < arr.length - 1 && <span className="absolute left-[10px] top-5 bottom-[-12px] w-px bg-border" />}
              <span className="absolute left-0 top-1 size-5 rounded-full bg-primary/15 border border-primary/30 grid place-items-center text-[10px] font-semibold text-primary">{i + 1}</span>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.era}</div>
              <div className="text-sm font-semibold">{t.who}</div>
              <div className="text-[11px] text-muted-foreground">{t.note}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display text-base font-semibold">Tanaji's Samadhi</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          A simple stone memorial at the western edge marks where the Subhedar fell. Audio narration triggers when you walk within 20 m.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="size-3" /> 18.3645° N · 73.7560° E
        </div>
      </div>
    </div>
  );
}

type Spot = { name: string; type: string; lore?: string; tag?: string; iconKey: "monument" | "view" | "water" | "gate"; potable?: boolean };

const MONUMENTS: Spot[] = [
  { name: "Tanaji Malusare Samadhi", type: "Memorial", iconKey: "monument", lore: "In 1670, Tanaji left his son's wedding to recapture this fort for Shivaji Maharaj. He died fighting the Rajput commander Udaybhan." },
  { name: "Rajaram Maharaj Samadhi", type: "Cenotaph", iconKey: "monument", lore: "Chhatrapati Rajaram retreated here during the Mughal-Maratha wars and passed away on the fort in 1700. Architecture shows Rajasthani influence." },
  { name: "Lokmanya Tilak Bungalow", type: "Heritage retreat", iconKey: "monument", lore: "Tilak's summer retreat. Mahatma Gandhi met him here in 1915 to discuss the freedom struggle." },
  { name: "Amruteshwar Bhairav Temple", type: "Yadava-era temple", iconKey: "monument", lore: "Predates the Maratha empire. Proves the fort's ancient Yadava origins." },
  { name: "Darukhana (Armory)", type: "Ruin", iconKey: "monument", lore: "Thick stone walls prevented accidental explosions — the garrison's gunpowder store." },
];

const VIEWPOINTS: Spot[] = [
  { name: "Zunjar Buruj", type: "Southern bastion", iconKey: "view", lore: "Spectacular panoramic shots — best at golden hour." },
  { name: "Kalavantin Buruj", type: "Watchtower", iconKey: "view", lore: "Used historically for surveillance of the Purandar valley." },
  { name: "Hawa Point", type: "Wind viewpoint", iconKey: "view", lore: "Famous for extreme winds and sweeping valley views." },
];

const WATER: Spot[] = [
  { name: "Dev Taake (देव टाके)", type: "Drinking cistern", iconKey: "water", potable: true, lore: "Sweet, crystal-clear, naturally chilled water — the trekker's primary source." },
  { name: "Hatti Taake", type: "Elephant cistern", iconKey: "water", potable: false, lore: "Massive rock-cut cistern historically used for bathing the garrison's war elephants." },
];

function Spots() {
  return (
    <div className="space-y-5">
      <SpotGroup title="Monuments & ruins" items={MONUMENTS} />
      <SpotGroup title="Bastions & viewpoints" items={VIEWPOINTS} />
      <SpotGroup title="Water sources" items={WATER} />

      {/* Internal paths */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-2 px-1">Inside the fort</h3>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          <PathRow from="Pune Darwaza" to="Tanaji Samadhi" desc="Walk straight past the food stalls. The path gently slopes up towards the centre of the plateau." />
          <PathRow from="Tanaji Samadhi" to="Dev Taake" via="Tilak Bungalow" desc="Take the westward trail. You'll pass the Tilak Bungalow on your right before reaching the cistern." />
        </div>
      </div>
    </div>
  );
}

function SpotGroup({ title, items }: { title: string; items: Spot[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold mb-2 px-1">{title}</h3>
      <div className="space-y-2.5">
        {items.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border bg-card p-3.5">
            <div className="flex items-start gap-3">
              <div className={`size-10 rounded-xl grid place-items-center shrink-0 ${spotColor(s.iconKey)}`}>
                {spotIcon(s.iconKey)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-sm font-semibold">{s.name}</div>
                  {s.potable === true && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600 font-semibold">Potable</span>
                  )}
                  {s.potable === false && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-semibold">Non-potable</span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{s.type}</div>
                {s.lore && (
                  <div className="mt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground leading-relaxed">
                    <BookOpen className="size-3 mt-0.5 text-accent shrink-0" />
                    <span>{s.lore}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function spotIcon(k: Spot["iconKey"]) {
  if (k === "monument") return <Landmark className="size-4" />;
  if (k === "view") return <Eye className="size-4" />;
  if (k === "water") return <Droplet className="size-4" />;
  return <DoorOpen className="size-4" />;
}
function spotColor(k: Spot["iconKey"]) {
  if (k === "monument") return "bg-primary/15 text-primary";
  if (k === "view") return "bg-accent/15 text-accent";
  if (k === "water") return "bg-blue-500/15 text-blue-600";
  return "bg-secondary text-foreground";
}

function PathRow({ from, to, via, desc }: { from: string; to: string; via?: string; desc: string }) {
  return (
    <div className="p-3.5">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <span>{from}</span>
        <ArrowRight className="size-3.5 text-muted-foreground" />
        {via && (
          <>
            <span className="text-muted-foreground font-normal">{via}</span>
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </>
        )}
        <span>{to}</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}

function GateRow({ color, name, tag, desc }: { color: string; name: string; tag: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`size-8 rounded-lg ${color} text-white grid place-items-center shrink-0`}>
        <DoorOpen className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">{name}</div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{tag}</span>
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, v }: { icon: React.ReactNode; label: string; v: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-7 rounded-lg bg-secondary grid place-items-center text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-xs font-semibold truncate">{v}</div>
      </div>
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

type TrekRoute = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  distanceKm: number;
  hours: number;
  startVillage: string;
  exitGate: string;
  elevationGainM: number;
  tag: "primary" | "alt";
  waypoints: { title: string; detail: string }[];
};

const TREK_ROUTES: TrekRoute[] = [
  {
    id: "route_sinhagad_01",
    name: "Donje (Paytha) Trek",
    type: "Primary Trek",
    difficulty: "Easy to Moderate",
    distanceKm: 2.6,
    hours: 2.0,
    startVillage: "Donje Village",
    exitGate: "Pune Darwaza",
    elevationGainM: 720,
    tag: "primary",
    waypoints: [
      { title: "Paytha parking", detail: "Start at Sinhagad Paytha parking near Donje village. Fill water — last reliable source." },
      { title: "Forest checkpost", detail: "Pass the Forest Department checkpost. Trail begins as a wide dirt path through scrub." },
      { title: "Steep rock section", detail: "Continuous steep rocky climb — the hardest 25 minutes. Use trekking poles in monsoon." },
      { title: "Midway plateau", detail: "Catch your breath. Local vendors sell lime water, kokum and cucumbers." },
      { title: "Rock-cut steps", detail: "Final ascent over hand-cut stone steps along the cliff edge." },
      { title: "Pune Darwaza", detail: "Arrive at the massive northeast gate. You're on the fort." },
    ],
  },
  {
    id: "route_sinhagad_02",
    name: "Kalyan Village Trek",
    type: "Alternative Trek",
    difficulty: "Moderate",
    distanceKm: 3.2,
    hours: 2.5,
    startVillage: "Kalyan Village",
    exitGate: "Kalyan Darwaza",
    elevationGainM: 760,
    tag: "alt",
    waypoints: [
      { title: "Kalyan parking", detail: "Park at Kalyan village. Look for the unmarked trail up the southeastern ridge." },
      { title: "Narrow ridge path", detail: "Quiet, uneven rocky path — much less crowded than Donje route." },
      { title: "Dense forest cover", detail: "Pass through thick tree cover before the path opens to the bare hill face." },
      { title: "Open hill face", detail: "Steep exposed climb. Watch footing — loose scree in dry season." },
      { title: "Kalyan Darwaza", detail: "Arrive at the historic southeast gateway, used to signal Raigad." },
    ],
  },
];

function RoutesTab() {
  const [activeId, setActiveId] = useState(TREK_ROUTES[0].id);
  const route = TREK_ROUTES.find((r) => r.id === activeId)!;

  return (
    <div className="space-y-4">
      {/* Route selector chips */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {TREK_ROUTES.map((r) => {
          const active = r.id === activeId;
          return (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className={`shrink-0 rounded-2xl border p-3 text-left min-w-[180px] transition ${
                active ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <RouteIcon className={`size-3.5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.type}</span>
              </div>
              <div className="font-display text-sm font-semibold mt-1">{r.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {r.distanceKm} km · {r.hours}h · {r.difficulty}
              </div>
            </button>
          );
        })}
      </div>

      {/* Route summary */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-accent">Start → Exit</div>
            <div className="font-display text-base font-semibold mt-1 flex items-center gap-1.5">
              {route.startVillage}
              <ChevronRight className="size-4 text-muted-foreground" />
              {route.exitGate}
            </div>
          </div>
          <button className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1">
            <Navigation className="size-3.5" /> Start
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-secondary/60 p-2">
            <Footprints className="size-4 mx-auto text-primary" />
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Distance</div>
            <div className="text-sm font-semibold">{route.distanceKm} km</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-2">
            <Clock className="size-4 mx-auto text-primary" />
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Time</div>
            <div className="text-sm font-semibold">{route.hours}h</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-2">
            <Mountain className="size-4 mx-auto text-primary" />
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Gain</div>
            <div className="text-sm font-semibold">{route.elevationGainM} m</div>
          </div>
        </div>
      </div>

      {/* Step-by-step waypoints */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-base font-semibold">Step-by-step</h3>
          <span className="text-[11px] text-muted-foreground">{route.waypoints.length} waypoints</span>
        </div>

        <ol className="relative">
          {route.waypoints.map((w, i) => {
            const isStart = i === 0;
            const isEnd = i === route.waypoints.length - 1;
            return (
              <li key={i} className="relative pl-10 pb-5 last:pb-0">
                {/* connector line */}
                {!isEnd && (
                  <span className="absolute left-[14px] top-7 bottom-0 w-px bg-border" />
                )}
                {/* node */}
                <span
                  className={`absolute left-0 top-0.5 size-7 rounded-full grid place-items-center text-[11px] font-semibold ${
                    isStart
                      ? "bg-primary text-primary-foreground"
                      : isEnd
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-foreground border border-border"
                  }`}
                >
                  {isStart ? <Footprints className="size-3.5" /> : isEnd ? <Flag className="size-3.5" /> : i + 1}
                </span>
                <div className="text-sm font-semibold leading-snug">{w.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{w.detail}</div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-2xl border border-border bg-secondary/40 p-4 flex items-center gap-3">
        <Download className="size-4 text-primary shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-semibold">Offline GPX track</div>
          <div className="text-[11px] text-muted-foreground">Cached on device · works in airplane mode</div>
        </div>
        <button className="text-xs font-semibold text-primary">Export</button>
      </div>
    </div>
  );
}
