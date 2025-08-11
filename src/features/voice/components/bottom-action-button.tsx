import { Button } from "@/shared/components/ui/button";

export default function BottomActionButton() {
  return (
    <div className="fixed left-0 right-0 bottom-8 sm:bottom-12 mx-auto w-full max-w-screen-lg px-4 md:px-8">
      <Button
        size="sm"
        className="block w-full md:w-24 mx-auto h-12 rounded-full text-foreground font-bold cursor-pointer"
      >
        확인
      </Button>
    </div>
  );
}
