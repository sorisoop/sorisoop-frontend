import { useProfiles } from "@/entities/profile/api/hooks";
import { useProfileManageDialogContext } from "../hooks";
import { cn } from "@/shared/lib/utils";

export default function ProfileManageDialogList() {
  const { data: profiles } = useProfiles();
  const { setSelectedProfile } = useProfileManageDialogContext();

  return (
    <>
      <ul className="divide-y divide-border">
        {profiles?.map((p) => (
          <li
            key={p.id}
            className={cn(
              "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors"
            )}
            onClick={() => setSelectedProfile(p)}
          >
            <div className="flex items-center gap-3">
              <img
                src={p.profileImage ?? "/default.webp"}
                alt={p.nickname}
                className="w-12 h-12 rounded-full object-cover bg-muted"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{p.nickname}</span>
                <span className="text-sm text-muted-foreground">
                  {p.role === "CHILD" ? "아이" : "부모"} · {p.gender === "M" ? "남자" : "여자"} · {p.age}세
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
