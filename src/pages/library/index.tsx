import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { CommonLayout } from "@/shared/layouts";

export default function LibraryPage() {
  const isEmpty = true;

  return (
    <CommonLayout title="내 책장">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-118px)] text-center">
          <Book className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-lg font-bold">동화책을 만들고</h2>
          <p className="text-muted-foreground mt-1">나만의 책장을 만들어보세요!</p>
          <Button asChild size="sm" className="mt-4 text-secondary font-semibold">
            <Link to="/create">동화 만들러 가기</Link>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </CommonLayout>
  );
}
