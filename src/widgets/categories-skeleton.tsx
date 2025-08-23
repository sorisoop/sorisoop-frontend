import TitleBar from "@/widgets/title-bar";

export default function CategoriesSkeleton() {
  const placeholders = Array.from({ length: 7 });

  return (
    <section className="pt-8">
      <TitleBar title="이야기 종류" subtitle="관심 주제를 골라서 둘러보세요" />

      <div className="mt-3 -mx-4 px-4">
        <div
          className="flex gap-6 pb-2 py-1 overflow-x-auto overflow-y-visible [scrollbar-width:none] [scrollbar-color:transparent_transparent]"
          aria-label="카테고리 스켈레톤"
        >
          {placeholders.map((_, idx) => (
            <div key={idx} className="shrink-0 text-center animate-pulse">
              <div className={["mx-auto h-20 w-20 rounded-full", "bg-muted-foreground/20"].join(" ")} />
              <div className="mt-2 h-4 w-16 mx-auto rounded bg-muted-foreground/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
