export const pickEmoji = (name: string): string => {
  const map: Record<string, string> = {
    전체: "🧺",
    과학: "🔬",
    동물: "🐻",
    모험: "🏔️",
    생활: "🏠",
    역사: "🏛️",
    자연: "🌳",
    바다: "🌊",
    음식: "🍎",
    우주: "🚀",
    마법: "🪄",
    스포츠: "⚽",
    음악: "🎵",
    우정: "🤝",
    가족: "👨‍👩‍👧‍👦",
    여행: "✈️",
    학교: "🏫",
    계절: "🍂",
  };

  return map[name] ?? "📚";
};
