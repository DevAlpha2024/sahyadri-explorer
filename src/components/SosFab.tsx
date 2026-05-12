import { Link } from "@tanstack/react-router";
import { Siren } from "lucide-react";

export function SosFab() {
  return (
    <Link
      to="/sos"
      className="fixed right-4 bottom-24 z-40 size-14 rounded-full bg-destructive text-destructive-foreground grid place-items-center shadow-fort active:scale-95 transition"
      aria-label="Emergency SOS"
    >
      <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />
      <Siren className="relative size-6" />
    </Link>
  );
}
