import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";
import Tag from "./tag";

export default function FairyTaleDetailMobile({ fairyTale }: { fairyTale: FairyTale }) {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="relative w-full aspect-[5/4]">
        <img
          src={fairyTale.thumbnail_image}
          alt={fairyTale.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10" />

      <div className="absolute top-2 left-2 z-20">
        <Button variant="link" size="icon" onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="!w-5 !h-5 text-white" />
        </Button>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{fairyTale.title}</h1>

        <div className="mt-2 flex items-center gap-2">
          <Tag variant="subtle">카테고리 2</Tag>
          <Tag variant="subtle">{fairyTale.author}</Tag>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Button className="w-full h-10 rounded-md bg-primary text-foreground text-base font-semibold gap-2 cursor-pointer">
            <Play className="!w-5 !h-5" />
            보기
          </Button>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-md bg-secondary text-foreground text-sm font-medium cursor-pointer"
            >
              다시 해보기
            </Button>
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-md bg-secondary text-foreground text-sm font-medium cursor-pointer"
            >
              내 책장 보기
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-base font-bold mb-3">비슷한 콘텐츠</h2>
      </div>
    </div>
  );
}
