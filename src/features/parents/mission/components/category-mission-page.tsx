import { BackHeaderLayout } from "@/shared/layouts";
import { useState } from "react";
import { useFairyTaleCategories } from "@/entities/fairy-tale/api/hooks";
import { useDragScroll } from "@/shared/hooks/use-drag-scroll";

// 타입 정의
interface Props {
  profileId: number;
}

interface Category {
  id: number;
  name: string;
}

const CATEGORY_ICON_MAP: Record<number, string> = {
  1: "🧪",
  2: "🐻",
  3: "⛰️",
  4: "🏠",
  5: "🏛️",
  6: "🍎",
  7: "🌳",
};

export default function ReadByCategoryPage({ profileId }: Props) {
  const { data: categories = [] } = useFairyTaleCategories();
  const dragEvents = useDragScroll<HTMLDivElement>();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [bookCountInput, setBookCountInput] = useState<string>("1");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const parsedBookCount = Number(bookCountInput);
  const isBookCountValid = parsedBookCount >= 1 && parsedBookCount <= 100;
  const isFormValid = selectedCategoryId && startDate && endDate && isBookCountValid;

  const handleSubmit = () => {
    if (!isFormValid) return;

    const bookCount = Number(bookCountInput);

    console.log({
      profileId,
      categoryId: selectedCategoryId,
      bookCount,
      startDate,
      endDate,
    });

    // TODO: API 호출 또는 다음 페이지 이동
  };

  return (
    <BackHeaderLayout title="주제별 읽기 미션">
      <div className="px-4 py-6 space-y-8">
        {/* 카테고리 선택 */}
        <div>
          <h3 className="text-sm font-bold mb-3">읽을 동화 주제 선택</h3>
          <div
            className="flex gap-4 overflow-x-auto sm:justify-start sm:flex-wrap sm:overflow-visible no-scrollbar"
            {...dragEvents}
          >
            {categories.map((category: Category) => {
              const isSelected = category.id === selectedCategoryId;
              const icon = CATEGORY_ICON_MAP[category.id] || "📚";
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`
                    flex flex-col items-center justify-center
                    min-w-[96px] min-h-[96px] sm:w-[108px] sm:h-[108px]
                    rounded-full border transition shrink-0
                    ${isSelected ? "border-yellow-400 bg-yellow-100 shadow-sm" : "border-gray-300 bg-white"}
                  `}
                >
                  <span className="text-3xl sm:text-4xl">{icon}</span>
                  <span className="text-xs mt-1 whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 권 수 선택 */}
        <div>
          <h3 className="text-sm font-bold mb-3">읽을 권 수</h3>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={bookCountInput}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,3}$/.test(value)) {
                setBookCountInput(value.replace(/^0+/, "") || "0");
              }
            }}
            className="w-24 px-3 py-2 border rounded-md text-sm bg-white shadow-sm"
            placeholder="1~100"
          />
          {!isBookCountValid && (
            <p className="text-xs text-red-500 mt-1">1~100 사이의 숫자를 입력해주세요</p>
          )}
        </div>

        {/* 기간 설정 - 세로 배치 + 너비 제한 */}
        <div>
          <h3 className="text-sm font-bold mb-3">기간 설정</h3>
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-sm">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">시작일</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-white shadow-sm w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">종료일</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-white shadow-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl bg-white border-t py-4">
        <div className="px-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              isFormValid ? "bg-yellow-400" : "bg-gray-300"
            }`}
          >
            미션 시작하기
          </button>
        </div>
      </div>
    </BackHeaderLayout>
  );
}