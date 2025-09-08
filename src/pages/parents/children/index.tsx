import { Suspense } from "react";
import { BackHeaderLayout } from "@/shared/layouts";
import { ChildrenList, ChildrenListSkeleton } from "@/features/parents/components";
import { ErrorBoundary } from "react-error-boundary";
import { ParentsErrorFallback } from "@/shared/components/error-boundary";

export default function ChildrenPage() {
  return (
    <BackHeaderLayout title="아이">
      <ErrorBoundary FallbackComponent={ParentsErrorFallback}>
        <Suspense fallback={<ChildrenListSkeleton />}>
          <ChildrenList />
        </Suspense>
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
