import CommonLayout from "@/shared/layouts/common-layout";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useGetVoices } from "@/entities/voice/api/hooks";

export default function VoicePage() {
  const { data: voices } = useGetVoices();

  return (
    <CommonLayout title="목소리 추가">
      <ul role="list" className="divide-y divide-border">
        {voices.map((v) => (
          <li key={v.id}>
            <div className="relative flex items-center gap-4 md:gap-6 rounded-md py-4">
              <span className="relative shrink-0 w-14 h-14">
                <span className="absolute inset-0 rounded-full overflow-hidden bg-muted grid place-items-center">
                  <img
                    src={v.imageUrl}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </span>

              <span className="flex-1 text-left">
                <span className="block text-base md:text-lg font-semibold tracking-tight">{v.title}</span>
              </span>

              <div className="flex items-center gap-2 md:gap-3 pr-1">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label={`${v.title} 편집`}
                  className="rounded-md p-2 cursor-pointer"
                >
                  <Pencil className="w-5 h-5 opacity-90" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  aria-label={`${v.title} 삭제`}
                  className="rounded-md p-2 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5 text-foreground" />
                </Button>
              </div>
            </div>
          </li>
        ))}

        <li className="py-2">
          <Link
            to="/voice/add"
            className={cn(
              "flex items-center gap-4 md:gap-6 rounded-md py-3 md:py-4",
              "text-left text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
          >
            <span className="grid place-items-center rounded-full bg-muted shrink-0 w-14 h-14">
              <Plus className="w-6 h-6" />
            </span>
            <span className="text-base md:text-lg font-semibold">목소리 추가하기</span>
          </Link>
        </li>
      </ul>
    </CommonLayout>
  );
}
