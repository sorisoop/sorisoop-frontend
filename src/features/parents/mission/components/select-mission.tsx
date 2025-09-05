import { BackHeaderLayout } from "@/shared/layouts";
import { useState } from "react";

type Props = {
  profileId: number;
  onSelectType: () => void; // ✅ selectedType 인자 제거
};

const MISSION_TYPES = [
  {
    id: "READ_CATEGORY",
    imageUrl: "/assets/mission/read-category.png",
    title: "주제별 읽기 미션",
    description: "동화의 주제를 골라 흥미를 더해보세요.",
  },
  {
    id: "READ_BOOK",
    imageUrl: "/assets/mission/read-book.png",
    title: "특정 동화 읽기",
    description: "지정된 동화를 꼭 읽도록 도와주세요.",
  },
  {
    id: "CREATE_FAIRY_TALE",
    imageUrl: "/assets/mission/make-book.png",
    title: "직접 동화 만들기",
    description: "그림을 그려 나만의 동화를 완성해요!",
  },
];

export default function SelectType({ profileId, onSelectType }: Props) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedType) {
      onSelectType(); // ✅ 선택한 타입 전달 없이 호출만
    }
  };

  return (
    <BackHeaderLayout title="미션 만들기">
      <div className="flex flex-col min-h-[calc(100vh-52px)]">
        <div className="flex-1 px-4 pt-6 pb-24">
          <h2 className="text-base font-bold mb-6 text-center">
            미션 유형을 선택해주세요.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {MISSION_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`
                    flex items-center gap-4 p-4 sm:p-5 rounded-xl border transition
                    ${isSelected ? "border-yellow-400 bg-yellow-100 shadow-md" : "border-gray-300 bg-white"}
                  `}
                >
                  <img
                    src={type.imageUrl}
                    alt={type.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />

                  <div className="text-left">
                    <div className="text-sm sm:text-base font-bold mb-1">{type.title}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{type.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl bg-white border-t py-4">
          <div className="px-4">
            <button
              onClick={handleNext}
              disabled={!selectedType}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${selectedType ? "bg-yellow-400" : "bg-gray-300"}`}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </BackHeaderLayout>
  );
}