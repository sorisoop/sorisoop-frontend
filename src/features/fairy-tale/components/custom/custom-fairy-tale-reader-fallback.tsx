import { Spinner } from "@/shared/components/ui/spinner";

export default function CustomFairyTaleReaderFallback() {
  return (
    <div className="flex items-center justify-center w-full h-dvh bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
}
