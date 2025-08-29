import { useState } from "react";
import { BackHeaderLayout } from "@/shared/layouts";
import { Button } from "@/shared/components/ui/button";
import { useDrawFlow } from "../hooks";
import { useMakeCustomFairyTale } from "@/entities/fairy-tale/api/mutations";

export default function DrawResult() {
  const { result, setStep } = useDrawFlow();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const makeCustomFairyTaleMutation = useMakeCustomFairyTale();

  if (!result) {
    setStep("error");
    return;
  }

  const { conceptResponse, imageUrl, imageContentType } = result;

  const handleProceed = () => {
    if (selectedIndex === null) return;
    const chosen = conceptResponse[selectedIndex];

    makeCustomFairyTaleMutation.mutate(
      {
        imageUrl,
        imageContentType,
        concept: chosen.concept_en,
      },
      {
        onSuccess: () => {
          setStep("complete");
        },
        onError: () => {
          setStep("error");
        },
      }
    );
  };

  return (
    <BackHeaderLayout title="그림 분석 결과">
      <div className="flex flex-col md:flex-row gap-8 p-6 max-w-screen-xl mx-auto w-full">
        <div className="md:w-1/2 flex flex-col">
          <div className="bg-card rounded-2xl p-4 shadow-sm border">
            <h2 className="text-base font-semibold mb-3 text-center">그림</h2>
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
              <img
                src={imageUrl}
                alt="사용자가 그린 그림"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+";
                }}
              />
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col">
          <div className="flex-1">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-lg font-bold mb-2">스토리 테마 선택</h2>
              <p className="text-sm text-muted-foreground">그림을 바탕으로 생성된 테마 중 하나를 선택해주세요 ✨</p>
            </div>

            <div className="space-y-3 mb-8">
              {conceptResponse.map((concept, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setSelectedIndex(index)}
                    className={`
                      cursor-pointer w-full justify-between rounded-xl px-4 py-6 h-auto
                      ${isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""}
                    `}
                  >
                    <h3 className="font-semibold text-base">{concept.concept_kr}</h3>
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-colors ${
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    />
                  </Button>
                );
              })}
            </div>

            <div className="bg-background/80 backdrop-blur-sm pt-4 border-t">
              <Button
                onClick={handleProceed}
                disabled={selectedIndex === null}
                className="w-full h-12 text-base font-medium text-secondary cursor-pointer"
              >
                {selectedIndex !== null
                  ? `"${conceptResponse[selectedIndex].concept_kr}" 스토리로 진행하기`
                  : "테마를 선택해주세요"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BackHeaderLayout>
  );
}
