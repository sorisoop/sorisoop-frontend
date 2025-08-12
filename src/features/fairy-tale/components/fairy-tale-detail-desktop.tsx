import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";

export default function FairyTaleDetailDesktop({ fairyTale }: { fairyTale: FairyTale }) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={fairyTale.thumbnail_image}
        alt={fairyTale.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10" />

      <div className="absolute top-4 left-4 z-10">
        <Button variant="link" size="icon" onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="!w-6 !h-6 text-secondary" />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-8 py-8 from-black/60 via-black/30 to-transparent text-secondary">
        <h1 className="text-4xl font-extrabold">{fairyTale.title}</h1>

        <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
          <Button className="w-full h-14 rounded-md bg-primary text-primary-foreground text-base font-semibold gap-2 cursor-pointer">
            <Play className="!w-5 !h-5" />
            보기
          </Button>

          <div className="flex flex-row gap-3 w-full">
            <Button
              variant="link"
              className="flex-1 h-12 rounded-mdd bg-muted text-foreground text-sm font-medium cursor-pointer"
            >
              처음부터 보기
            </Button>
            <Button
              variant="link"
              className="flex-1 h-12 rounded-md bg-muted text-foreground text-sm font-medium cursor-pointer"
            >
              내 책장 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
