import { useNavigate } from "react-router-dom";
import { useProfiles } from "@/entities/profile/api/hooks";
import type { ProfileResponse } from "@/entities/profile/model";

export default function ChildrenList() {
  const navigate = useNavigate();
  const { data: profiles } = useProfiles();
  const children = profiles?.filter((p) => p.role === "CHILD") ?? [];

  if (children.length === 0) {
    return <p className="text-sm text-muted-foreground">등록된 아이 프로필이 없습니다.</p>;
  }

  return (
    <div className="space-y-4 py-4">
      {children.map((child: ProfileResponse) => (
        <div
          key={child.id}
          role="link"
          className="flex items-center gap-4 py-2 bg-background rounded-xl hover:bg-accent/30 transition cursor-pointer"
          onClick={() => navigate(`/parents/children/${child.id}`)}
        >
          <img
            src={child.profileImage || "/default.webp"}
            alt={child.nickname}
            className="w-14 h-14 rounded-full border object-cover"
          />
          <div>
            <p className="font-semibold text-lg">
              {child.nickname} ({child.age}세)
            </p>
            <p className="text-sm text-muted-foreground">{child.gender === "M" ? "남자" : "여자"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
