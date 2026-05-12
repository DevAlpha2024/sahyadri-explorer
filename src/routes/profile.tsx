import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Mountain, Footprints, Trophy, BatteryCharging, Languages, Bell, Download, Siren, ChevronRight, Map } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfileScreen,
});

function ProfileScreen() {
  return (
    <div className="flex-1 bg-background">
      <AppHeader title="My profile" />

      <div className="px-4 pb-8">
        {/* Profile card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-forest text-primary-foreground p-5 shadow-fort">
          <div className="absolute -bottom-16 -right-10 size-48 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/15 grid place-items-center font-display text-2xl font-semibold">
              अ
            </div>
            <div>
              <div className="font-display text-xl font-semibold">Aditya Kulkarni</div>
              <div className="text-xs opacity-80">Member since June 2024 · Pune</div>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-3 gap-3 text-center">
            <Stat v="14" label="Forts" icon={<Mountain className="size-3.5" />} />
            <Stat v="187 km" label="Trekked" icon={<Footprints className="size-3.5" />} />
            <Stat v="6,420 m" label="Elev. gain" icon={<Trophy className="size-3.5" />} />
          </div>
        </div>

        {/* Pace */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-accent">Your pace</div>
              <div className="font-display text-2xl font-semibold mt-0.5">4.1 km/h</div>
              <div className="text-[11px] text-muted-foreground">avg over last 4 treks · -8% slower in monsoon</div>
            </div>
            <div className="size-14 rounded-full bg-accent/15 text-accent grid place-items-center font-bold">
              ↑
            </div>
          </div>
        </div>

        {/* Settings */}
        <h3 className="mt-7 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Settings</h3>
        <div className="mt-2 rounded-2xl border border-border bg-card overflow-hidden">
          <Toggle icon={<BatteryCharging className="size-4" />} label="Battery-saver mode" sub="Drops GPS to 5s when idle" on />
          <Toggle icon={<Bell className="size-4" />} label="Geofenced narration" sub="Auto-play stories at landmarks" on />
          <Row icon={<Languages className="size-4" />} label="Language" v="English / मराठी" />
          <Row icon={<Siren className="size-4" />} label="Emergency contacts" v="3 saved" link="/sos" />
          <Row icon={<Download className="size-4" />} label="Offline maps" v="3 forts · 64 MB" last />
        </div>

        {/* Saved tracks */}
        <h3 className="mt-7 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Saved GPX tracks</h3>
        <div className="mt-2 space-y-2">
          {[
            { name: "Sinhagad · Donje", date: "12 May", v: "5.4 km · 2h 18m" },
            { name: "Rajgad · Gunjavane", date: "27 Apr", v: "8.1 km · 4h 02m" },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
              <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <Map className="size-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.v}</div>
              </div>
              <div className="text-[11px] text-muted-foreground">{t.date}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[10px] text-muted-foreground">
          Sahyadri v0.1 · Sinhagad alpha · made in Pune
        </div>
      </div>
    </div>
  );
}

function Stat({ v, label, icon }: { v: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur py-3">
      <div className="font-display text-xl font-semibold">{v}</div>
      <div className="text-[10px] mt-0.5 opacity-75 inline-flex items-center gap-1 justify-center">{icon}{label}</div>
    </div>
  );
}

function Row({ icon, label, v, link, last }: { icon: React.ReactNode; label: string; v: string; link?: string; last?: boolean }) {
  const content = (
    <div className={`flex items-center gap-3 p-4 ${!last ? "border-b border-border" : ""}`}>
      <div className="size-9 rounded-lg bg-secondary text-foreground grid place-items-center">{icon}</div>
      <div className="flex-1 text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{v}</div>
      <ChevronRight className="size-4 text-muted-foreground" />
    </div>
  );
  return link ? <Link to={link}>{content}</Link> : <div>{content}</div>;
}

function Toggle({ icon, label, sub, on }: { icon: React.ReactNode; label: string; sub: string; on?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border">
      <div className="size-9 rounded-lg bg-secondary grid place-items-center">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
      <div className={`w-10 h-6 rounded-full p-0.5 flex ${on ? "bg-primary justify-end" : "bg-secondary justify-start"}`}>
        <div className="size-5 rounded-full bg-white shadow" />
      </div>
    </div>
  );
}
