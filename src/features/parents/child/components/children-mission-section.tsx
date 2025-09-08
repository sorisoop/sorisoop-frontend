import { ChevronRight } from "lucide-react";
import { ChildMissionAccordion } from "@/features/parents/child/components";
import { useProfiles } from "@/entities/profile/api/hooks";
import { Button } from "@/shared/components/ui/button";

export default function ChildrenMissionSection() {
  const { data: profiles } = useProfiles();
  const children = profiles?.filter((profile) => profile.role === "CHILD") ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">아이들</h3>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          전체보기 <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <ChildMissionAccordion key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
}
