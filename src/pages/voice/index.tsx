import { useState } from "react";
import CommonLayout from "@/shared/layouts/common-layout";
import { Button } from "@/shared/components/ui/button";
import { Pencil, Trash2, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/input";

type VoiceProfile = {
  id: string;
  name: string;
  avatar: string; // 외부 URL
};

const MOCK_VOICES: VoiceProfile[] = [
  {
    id: "mom",
    name: "엄마",
    avatar:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=200&auto=format&fit=crop&facepad=3&h=200",
  },
  {
    id: "dad",
    name: "아빠",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&auto=format&fit=crop&facepad=3&h=200",
  },
];

export default function VoicePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const voices = MOCK_VOICES;
  const isDisabled = selectedId === null;

  return (
    <CommonLayout title="목소리 추가">
      <section className="pt-4">
        <ul role="list" className="divide-y divide-border">
          {voices.map((v) => {
            const inputId = `voice-${v.id}`;
            const isSelected = selectedId === v.id;
            return (
              <li key={v.id}>
                <div className="relative flex items-center gap-4 md:gap-6 rounded-md px-3 py-4">
                  <Input
                    id={inputId}
                    type="radio"
                    name="voice"
                    value={v.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(v.id)}
                    className="sr-only"
                  />

                  <label
                    htmlFor={inputId}
                    className="flex flex-1 items-center gap-4 md:gap-6 cursor-pointer select-none"
                  >
                    <span className="relative shrink-0 w-14 h-14">
                      <span className="absolute inset-0 rounded-full overflow-hidden bg-muted grid place-items-center">
                        <img
                          src={v.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>

                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border"
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                    </span>

                    <span className="flex-1 text-left">
                      <span className="block text-base md:text-lg font-semibold tracking-tight">{v.name}</span>
                    </span>
                  </label>

                  <div className="flex items-center gap-2 md:gap-3 pr-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label={`${v.name} 편집`}
                      className="rounded-md p-2 cursor-pointer"
                    >
                      <Pencil className="w-5 h-5 opacity-90" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label={`${v.name} 삭제`}
                      className="rounded-md p-2 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-foreground" />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}

          <li className="py-2">
            <Link
              to="/voice/add"
              className={cn(
                "flex items-center gap-4 md:gap-6 rounded-md px-2 md:px-3 py-3 md:py-4",
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
      </section>

      <div
        className="fixed left-0 right-0 bottom-20 md:bottom-24 mx-auto max-w-60"
        role="region"
        aria-label="기본 목소리 설정"
      >
        <Button
          size="lg"
          disabled={isDisabled}
          className="w-full h-12 md:h-14 rounded-full text-foreground font-bold cursor-pointer"
        >
          이 목소리를 기본으로 설정
        </Button>
      </div>
    </CommonLayout>
  );
}
