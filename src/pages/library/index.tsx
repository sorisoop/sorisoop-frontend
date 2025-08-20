import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { CommonLayout } from "@/shared/layouts";
import { FairyTaleCardGrid } from "@/features/fairy-tale/components";
import type { FairyTale } from "@/entities/fairy-tale/models/fairy-tale";

const MY_LIBRARY: FairyTale[] = [
  {
    id: 1201,
    category_id: 4,
    title: "바닷마을 우체국",
    author: "한솔",
    thumbnail_image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    page_count: 12,
  },
  {
    id: 1202,
    category_id: 2,
    title: "코끼리와 약속",
    author: "이담",
    thumbnail_image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    page_count: 10,
  },
  {
    id: 1203,
    category_id: 6,
    title: "구름빵 공작소",
    author: "류보리",
    thumbnail_image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1600&auto=format&fit=crop",
    page_count: 15,
  },
  {
    id: 1204,
    category_id: 5,
    title: "달력 속 비밀문",
    author: "윤해",
    thumbnail_image: "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1600&auto=format&fit=crop",
    page_count: 14,
  },
  {
    id: 1205,
    category_id: 3,
    title: "파랑새를 찾아서",
    author: "백로",
    thumbnail_image: "https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1600&auto=format&fit=crop",
    page_count: 13,
  },
  {
    id: 1206,
    category_id: 7,
    title: "숲의 도서관",
    author: "호연",
    thumbnail_image: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?q=80&w=1600&auto=format&fit=crop",
    page_count: 11,
  },
];

export default function LibraryPage() {
  const isEmpty = MY_LIBRARY.length == 0;

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
        <FairyTaleCardGrid tales={MY_LIBRARY} />
      )}
    </CommonLayout>
  );
}
