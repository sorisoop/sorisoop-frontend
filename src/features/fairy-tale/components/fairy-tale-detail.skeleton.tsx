import { ArrowLeft, Home } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { useIsDeskTop } from "@/shared/hooks";

export default function FairyTaleDetailSkeleton() {
  const isDesktop = useIsDeskTop();

  if (isDesktop) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute top-4 left-4 z-20">
          <Button variant="ghost" size="icon" className="cursor-pointer rounded-full" disabled>
            <ArrowLeft className="!w-6 !h-6 text-secondary" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-8 py-10 z-20">
          <div className="relative inline-block mb-2">
            <Skeleton className="h-10 w-80 rounded-md" />
          </div>
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="mt-6 flex flex-col gap-4 w-full max-w-md">
            <Skeleton className="w-full h-12 rounded-md" />
            <div className="flex gap-3 w-full">
              <Skeleton className="flex-1 h-12 rounded-md" />
              <Skeleton className="flex-1 h-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background text-foreground">
      <div className="relative w-full aspect-[5/4]">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent h-16" />
        <div className="absolute top-2 left-2 z-20">
          <Button variant="link" size="icon" className="cursor-pointer" disabled>
            <ArrowLeft className="!w-5 !h-5 text-secondary" />
          </Button>
        </div>
        <div className="absolute top-2 right-2 z-20">
          <Button variant="link" size="icon" className="cursor-pointer" disabled>
            <Home className="!w-5 !h-5 text-secondary" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-7 w-3/4 rounded-md" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <Skeleton className="w-full h-12 rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="flex-1 h-10 rounded-md" />
            <Skeleton className="flex-1 h-10 rounded-md" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <Skeleton className="h-5 w-32 mb-3 rounded-md" />
        <div className="grid grid-cols-2 gap-3 mt-2">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
