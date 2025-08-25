import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import type { FairyTaleResponse } from "@/entities/fairy-tale/model";
import { Badge } from "@/shared/components/ui/badge";

export default function FairyTaleDetailDesktop({ fairyTale }: { fairyTale: FairyTaleResponse }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={fairyTale.thumbnailImage}
        alt={fairyTale.title}
        className="absolute inset-0 w-full h-full object-cover bg-foreground"
      />

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      <div className="absolute top-4 left-4 z-20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="cursor-pointer rounded-full">
          <ArrowLeft className="!w-6 !h-6 text-secondary" />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-8 py-10 z-20 text-secondary">
        <div className="relative inline-block mb-2">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">{fairyTale.title}</h1>
          <div className="absolute inset-0 bg-black/30 rounded-lg blur-sm -z-10" />
        </div>

        <div className="mt-2 flex gap-2">
          <Badge variant="secondary">{fairyTale.categoryName}</Badge>
          <Badge variant="secondary">{fairyTale.author}</Badge>
        </div>

        <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
          <Button
            className="w-full h-12 text-secondary text-base font-semibold gap-2 cursor-pointer shadow-lg"
            onClick={() => navigate(`/fairy-tale/${fairyTale.id}/read`)}
          >
            <Play className="w-5 h-5" />
            보기
          </Button>

          <div className="flex gap-3 w-full">
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-md text-sm font-medium cursor-pointer backdrop-blur-sm shadow-md"
            >
              내 책장에 저장
            </Button>
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-md text-sm font-medium cursor-pointer backdrop-blur-sm shadow-md"
            >
              내 책장 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
