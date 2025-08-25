import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { BackHeaderLayout } from "@/shared/layouts";
import { Button } from "@/shared/components/ui/button";
import { useDrawFlow } from "../hooks";

export default function DrawResult() {
  const { result } = useDrawFlow();
  const [selected, setSelected] = useState<string | null>(null);

  if (!result) {
    return (
      <BackHeaderLayout title="분석 실패">
        <div className="flex flex-col items-center justify-center gap-6 h-[calc(100vh-104px)] px-6 text-center">
          <div className="bg-destructive/10 rounded-full p-6">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-2">결과 데이터를 불러올 수 없습니다</h2>
            <p className="text-muted-foreground text-sm">
              분석 과정에서 오류가 발생했어요. <br />
              잠시 후 다시 시도해주세요.
            </p>
          </div>

          <Button
            onClick={() => window.location.reload()}
            variant="default"
            size="lg"
            className="cursor-pointer w-full max-w-xs"
          >
            다시 시도하기
          </Button>
        </div>
      </BackHeaderLayout>
    );
  }

  const { conceptResponse, imageUrl } = result;

  const handleProceed = () => {
    if (!selected) return;
  };

  return (
    <BackHeaderLayout title="그림 분석 결과">
      <div className="flex flex-col md:flex-row gap-8 p-6 max-w-screen-lg mx-auto w-full">
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
                const isSelected = selected === concept.concept_kr;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setSelected(concept.concept_kr)}
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
                disabled={!selected}
                className="w-full h-12 text-base font-medium text-secondary cursor-pointer"
              >
                {selected ? `"${selected}" 스토리로 진행하기` : "테마를 선택해주세요"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BackHeaderLayout>
  );
}
