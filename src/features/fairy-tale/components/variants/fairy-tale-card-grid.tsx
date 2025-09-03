import { useState } from "react";
import { Link } from "react-router-dom";
import type { FairyTaleResponse } from "@/entities/fairy-tale/model";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Heart, MoreVertical, Trash } from "lucide-react";
import { useAddFavorite, useDeleteCustomFairyTale, useDeleteFavorite } from "@/entities/fairy-tale/api/mutations";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { toast } from "sonner";

type FairyTaleCardGridProps = {
  tales: FairyTaleResponse[];
  className?: string;
  ariaLabel?: string;
  custom?: boolean;
};

export default function FairyTaleCardGrid({
  tales,
  className,
  ariaLabel = "오늘의 픽",
  custom = false,
}: FairyTaleCardGridProps) {
  const [deleteTarget, setDeleteTarget] = useState<FairyTaleResponse | null>(null);

  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();
  const deleteCustomFairyTaleMutation = useDeleteCustomFairyTale();

  const handleToggle = (tale: FairyTaleResponse) => {
    if (tale.isFavorite) deleteFavorite.mutate({ fairyTaleId: tale.id });
    else addFavorite.mutate({ fairyTaleId: tale.id });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteCustomFairyTaleMutation.mutate(deleteTarget.id, {
      onSuccess: () => {
        setDeleteTarget(null);
        toast.success("동화책이 삭제되었습니다.");
      },
      onError: () => {
        toast.error("삭제에 실패했습니다. 다시 시도해 주세요.");
      },
    });
  };
  return (
    <div
      className={cn("mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5", className)}
      aria-label={ariaLabel}
      role="list"
    >
      {tales.map((tale) => (
        <div
          key={tale.id}
          className="group relative block aspect-[3/4] rounded-md overflow-hidden bg-muted shadow hover:shadow-md transition"
          role="listitem"
        >
          <Link
            to={custom ? `/fairy-tale/custom/${tale.id}` : `/fairy-tale/${tale.id}`}
            aria-label={`동화책 ${tale.title}`}
            className="absolute inset-0"
          >
            <img
              src={tale.thumbnailImage}
              alt={`동화책 ${tale.title} 표지`}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition"
            />

            <div className={cn("absolute top-2", custom ? "left-2" : "right-2")}>
              <Badge className="rounded-full bg-primary text-secondary h-5 px-2 text-xs">{tale.categoryName}</Badge>
            </div>

            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative p-3">
                <h4 className="font-serif italic text-lg md:text-xl font-bold text-background drop-shadow-sm leading-snug line-clamp-2">
                  {tale.title}
                </h4>
                <p className="font-serif italic mt-1 text-background/90 text-xs">
                  {tale.author} · {tale.pageCount}p
                </p>
              </div>
            </div>
          </Link>

          {!custom && (
            <div className="absolute right-2 bottom-2 z-20">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`동화책 ${tale.title} 찜하기`}
                aria-pressed={tale.isFavorite}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggle(tale);
                }}
                className="h-8 w-8 rounded-full bg-background shadow-md transition cursor-pointer"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition",
                    tale.isFavorite ? "fill-destructive text-destructive" : "text-foreground"
                  )}
                />
              </Button>
            </div>
          )}

          {custom && (
            <div className="absolute right-2 top-2 z-10">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-background/80 shadow">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive cursor-pointer hover:text-destructive/80 hover:bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDeleteTarget(tale);
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    삭제하기
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ))}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">동화책을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              선택한 동화책은 삭제 후에는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-secondary cursor-pointer"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
