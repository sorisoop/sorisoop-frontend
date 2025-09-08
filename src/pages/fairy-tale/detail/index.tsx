import { FairyTaleDetailContent, FairyTaleDetailSkeleton } from "@/features/fairy-tale/components";
import { ErrorFallback } from "@/shared/components/error-boundary";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function FairyTaleDetailPage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<FairyTaleDetailSkeleton />}>
        <FairyTaleDetailContent />
      </Suspense>
    </ErrorBoundary>
  );
}
