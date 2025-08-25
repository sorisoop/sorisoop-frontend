import { useInfiniteScroll } from "@/shared/hooks";
import { useFavoriteFairyTalesInfinite } from "@/entities/fairy-tale/api/hooks";
import { Spinner } from "@/shared/components/ui/spinner";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";

export default function FavoriteFairyTaleContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavoriteFairyTalesInfinite();

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const tales = data?.pages.flat() ?? [];

  if (tales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-118px)] text-center">
        <Book className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-lg font-bold">아직 찜한 동화책이 없어요</h2>
        <p className="text-muted-foreground mt-1">마음에 드는 동화책을 찜해 보세요!</p>
        <Button asChild size="sm" className="mt-4 text-secondary font-semibold">
          <Link to="/">동화 보러 가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <FairyTaleCard.Grid tales={tales} />
      <div ref={ref} className="h-12" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
