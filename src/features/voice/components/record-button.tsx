import { Button } from "@/shared/components/ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type RecordButtonProps = {
  onClick: () => void;
};

export default function RecordButton({ onClick }: RecordButtonProps) {
  return (
    <div className="mt-6">
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        className={cn(
          "w-full rounded-xl border-2 border-dashed",
          "border-border cursor-pointer",
          "h-20 sm:h-24 md:h-28 grid place-items-center",
          "transition-colors duration-200"
        )}
        aria-label="녹음하기"
      >
        <div className="flex items-center gap-1">
          <PlusIcon className="w-6 h-6" />
          <span className="text-base font-semibold">녹음하기</span>
        </div>
      </Button>
    </div>
  );
}
