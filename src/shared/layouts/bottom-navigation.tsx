// src/shared/layout/BottomNavigation.tsx
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Home, BookOpen, Mic, UserRound } from "lucide-react";

type NavKey = "home" | "library" | "voice" | "my";

const NAV_ITEMS: Array<{
  key: NavKey;
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { key: "home", path: "/", label: "홈", icon: Home },
  { key: "library", path: "/lib", label: "내 책장", icon: BookOpen },
  { key: "voice", path: "/voice", label: "목소리 추가", icon: Mic },
  { key: "my", path: "/my", label: "MY", icon: UserRound },
];

export default function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 z-30 flex w-full justify-center h-[64px]">
      <nav className="fixed bottom-0 w-full border-t border-border bg-background pb-safe-bottom z-30">
        <div className="mx-auto max-w-lg">
          <div className="relative flex items-center justify-around w-full h-[64px]">
            {NAV_ITEMS.map(({ key, path, label, icon: Icon }) => {
              const isActive = key === "home" ? pathname === "/" : pathname.startsWith(path);
              return (
                <div key={key} className="relative flex-1">
                  <div
                    className={[
                      "absolute left-1/2 -translate-x-1/2 -top-px h-[3px] w-8 rounded-b-full transition-all",
                      isActive ? "bg-primary opacity-100" : "opacity-0",
                    ].join(" ")}
                    aria-hidden
                  />
                  <Button
                    asChild
                    variant="ghost"
                    className={[
                      "mx-auto flex flex-col items-center justify-center gap-0.5",
                      "h-[64px] w-full rounded-none text-xs",
                      isActive ? "text-primary" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    <Link to={path} aria-current={isActive ? "page" : undefined}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-0.5">{label}</span>
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
