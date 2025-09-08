import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CommonLayout } from "@/shared/layouts";
import { FairyTaleCard } from "@/features/fairy-tale/components/variants";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/components/ui/tabs";
import FavoriteFairyTaleContent from "./favorite-fairy-tale-content";
import CustomFairyTaleContent from "./custom-fairy-tale-content";
import { CategoriesNav, CategoriesNavSkeleton } from "@/widgets";
import { ErrorFallback } from "@/shared/components/error-boundary";

export default function LibraryPage() {
  const [categoryId, setCategoryId] = useState(0);

  return (
    <CommonLayout title="내 책장">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Tabs defaultValue="favorite" className="w-full">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <div className="mx-auto max-w-screen-xl">
              <TabsList className="grid grid-cols-2 w-full p-0 bg-transparent h-auto rounded-none shadow-none !border-0 !border-transparent !divide-x-0">
                <TabsTrigger
                  value="favorite"
                  className="relative w-full flex justify-center py-3 text-base font-semibold
                rounded-none border-0 bg-transparent shadow-none
                hover:text-foreground hover:bg-transparent
                data-[state=active]:text-primary
                before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary
                before:scale-x-0 before:transition-transform before:duration-300
                data-[state=active]:before:scale-x-100
                min-h-[calc(1.5rem+1.5rem+2px)]"
                >
                  찜한 동화
                </TabsTrigger>
                <TabsTrigger
                  value="my"
                  className="relative w-full flex justify-center py-3 text-base font-semibold
                    rounded-none border-0 bg-transparent shadow-none
                    hover:text-foreground hover:bg-transparent
                    data-[state=active]:text-primary
                    before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary
                    before:scale-x-0 before:transition-transform before:duration-300
                    data-[state=active]:before:scale-x-100
                    min-h-[calc(1.5rem+1.5rem+2px)]"
                >
                  내가 만든 동화
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="favorite">
            <Suspense fallback={<FairyTaleCard.GridSkeleton />}>
              <FavoriteFairyTaleContent />
            </Suspense>
          </TabsContent>

          <TabsContent value="my">
            <Suspense fallback={<CategoriesNavSkeleton />}>
              <CategoriesNav categoryId={categoryId} onChange={setCategoryId} />
            </Suspense>

            <Suspense fallback={<FairyTaleCard.GridSkeleton />}>
              <CustomFairyTaleContent categoryId={categoryId} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </ErrorBoundary>
    </CommonLayout>
  );
}
