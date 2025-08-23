import { cn } from "@/shared/lib/utils";

function Spinner() {
  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-6 h-6 animate-spin border-2 border-primary rounded-full border-t-transparent" />
    </div>
  );
}
function SpinnerIcon({ className }: { className?: string }) {
  return (
    <div className={cn("w-4 h-4 animate-spin border-1 border-primary rounded-full border-t-transparent", className)} />
  );
}

export { Spinner, SpinnerIcon };
