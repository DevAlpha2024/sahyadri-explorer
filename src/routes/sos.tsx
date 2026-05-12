import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Siren, Phone, MessageSquare, MapPin, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/sos")({
  component: SosScreen,
});

function SosScreen() {
  return (
    <div className="flex-1 bg-background">
      <AppHeader back title="Emergency SOS" subtitle="Hold to dispatch" />

      <div className="px-4 pb-8">
        <div className="mt-2 rounded-3xl bg-destructive text-destructive-foreground p-6 relative overflow-hidden shadow-fort">
          <div className="absolute -top-20 -right-20 size-60 rounded-full bg-white/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-90">
              <ShieldCheck className="size-3.5" /> SMS · no signal needed
            </div>
            <h2 className="font-display text-2xl font-semibold mt-2">Send your live location</h2>
            <p className="text-sm opacity-90 mt-1">
              Pre-formatted SMS with your coordinates will be sent to all 3 emergency contacts.
            </p>

            <button className="mt-6 mx-auto block size-44 rounded-full bg-white text-destructive grid place-items-center font-display font-semibold text-xl shadow-fort active:scale-95 transition relative">
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
              <span className="relative flex flex-col items-center gap-1">
                <Siren className="size-8" />
                HOLD
                <span className="text-[10px] font-medium uppercase tracking-widest opacity-70">3s to send</span>
              </span>
            </button>
          </div>
        </div>

        {/* Location preview */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <MapPin className="size-3.5 text-accent" /> Your location
          </div>
          <div className="font-display text-base font-semibold mt-1">Sinhagad Fort · near Pune Darwaza</div>
          <div className="text-xs text-muted-foreground mt-0.5 tabular-nums">18.3656° N · 73.7556° E · ±5m</div>

          <div className="mt-3 rounded-xl bg-secondary p-3 text-xs leading-relaxed">
            <span className="opacity-60">Message preview:</span>
            <br />
            "EMERGENCY: I need help at Sinhagad Fort. Coordinates: 18.3656, 73.7556. Sent via Sahyadri at 14:32."
          </div>
        </div>

        {/* Contacts */}
        <h3 className="mt-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Emergency contacts</h3>
        <div className="mt-2 space-y-2">
          {[
            { name: "Aai", num: "+91 98765 43210" },
            { name: "Rohan (trek partner)", num: "+91 90123 45678" },
            { name: "108 Ambulance", num: "108" },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="size-10 rounded-full bg-secondary grid place-items-center font-semibold text-sm">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.num}</div>
              </div>
              <button className="size-9 rounded-full bg-primary/10 text-primary grid place-items-center">
                <MessageSquare className="size-4" />
              </button>
              <button className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center">
                <Phone className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
