import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Home, PlusCircle, UserRound } from "lucide-react";

type ParentNavKey = "home" | "create" | "my";

const NAV_ITEMS: Array<{
  key: ParentNavKey;
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { key: "home", path: "/parents", label: "메인", icon: Home },
  { key: "create", path: "/parents/mission/create", label: "미션", icon: PlusCircle },
  { key: "my", path: "/parents/my", label: "My", icon: UserRound },
];

export default function ParentsBottomNavigation() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 z-30 flex w-full justify-center h-[64px]">
      <nav className="fixed bottom-0 w-full border-t border-border bg-background pb-safe-bottom z-30">
        <div className="mx-auto max-w-lg">
          <div className="relative flex items-center justify-around w-full h-[64px]">
            {NAV_ITEMS.map(({ key, path, label, icon: Icon }) => {
              const isActive = key === "home" ? pathname === "/parents" : pathname.startsWith(path);

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
