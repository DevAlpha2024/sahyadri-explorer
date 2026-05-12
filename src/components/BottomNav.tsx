import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, Activity, Compass, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Forts", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/track", label: "Track", icon: Activity },
  { to: "/compass", label: "Sight", icon: Compass },
  { to: "/profile", label: "Me", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium tracking-wide"
              >
                <span
                  className={`grid place-items-center size-9 rounded-xl transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="size-[18px]" />
                </span>
                <span className={active ? "text-foreground" : "text-muted-foreground"}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
