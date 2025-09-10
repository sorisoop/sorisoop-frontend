import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CustomFairyTaleDetailContent, CustomFairyTaleDetailSkeleton } from "@/features/fairy-tale/components/custom";
import { ErrorFallback } from "@/shared/components/error-boundary";

export default function CustomFairyTaleDetailPage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<CustomFairyTaleDetailSkeleton />}>
        <CustomFairyTaleDetailContent />
      </Suspense>
    </ErrorBoundary>
  );
}
