import { useInfiniteScroll } from "@/shared/hooks";
import { useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { Spinner } from "@/shared/components/ui/spinner";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";

interface Props {
  categoryId: number;
}

export default function FairyTaleByCategoryContent({ categoryId }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFairyTalesByCategoryInfinite(categoryId);

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const tales = data?.pages.flat() ?? [];

  if (tales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
        <p className="text-lg font-semibold text-foreground">해당 카테고리에 동화책이 없어요.</p>
        <p className="mt-2 text-sm text-muted-foreground">다른 카테고리를 선택해 보세요.</p>
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
