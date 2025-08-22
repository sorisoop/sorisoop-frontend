import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";

export function FairyTaleHint() {
  const { data, currentPage } = useFairyTaleReaderContext();

  const page = data?.[currentPage];
  if (!page) return null;

  return (
    <div className="absolute inset-x-4 bottom-24 z-30 text-center pointer-events-none">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm opacity-0 animate-fade-in-out">
        <p className="text-xs opacity-80">스페이스바로 텍스트 숨기기/보이기</p>
      </div>

      <style>{`
    @keyframes fade-in-out {
        0% { opacity: 0; }
        20% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; }
    }
        
    .animate-fade-in-out {
        animation: fade-in-out 3s ease-in-out;
    }
    `}</style>
    </div>
  );
}
