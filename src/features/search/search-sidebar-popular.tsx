import { Button } from "@/shared/components/ui/button";
import { useSearchStore } from "@/store/search";

const popularSearches = [
  "제주도의 세 시조",
  "왕의 생활",
  "신사임당",
  "세종대왕: 임금님이된 책벌레 왕자",
  "백제를 세운 온조",
  "박혁거세와 알영",
  "바보 온달과 평강 공주",
  "단군설화",
  "김유신",
  "김수로와 허황옥",
];
export function SearchSidebarPopular() {
  const { setQuery } = useSearchStore();

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-sm font-medium text-foreground mb-3">사람들이 많이 보는 동화</h3>
      <div className="space-y-1">
        {popularSearches.map((item, i) => (
          <Button
            key={i}
            variant="ghost"
            className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
            onClick={() => setQuery(item)}
          >
            <span className="text-sm font-medium text-primary min-w-[24px]">{i + 1}</span>
            <span className="text-sm text-foreground group-hover:text-primary flex-1 truncate">{item}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
