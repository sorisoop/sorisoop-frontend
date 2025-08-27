import { Button } from "@/shared/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";
import type { VoiceFormValues } from "@/features/voice/types";

export default function BottomActionButton({ isPending }: { isPending: boolean }) {
  const { control } = useFormContext<VoiceFormValues>();
  const title = useWatch({ control, name: "title" });
  const voiceFile = useWatch({ control, name: "voiceFile" });

  const isDisabled = !title || !voiceFile;

  return (
    <div className="fixed left-0 right-0 bottom-8 sm:bottom-12 mx-auto w-full max-w-screen-lg px-4 md:px-8">
      <Button
        type="submit"
        size="sm"
        disabled={isDisabled}
        className="block w-full md:w-24 mx-auto h-12 rounded-full text-secondary font-bold cursor-pointer"
      >
        {isPending ? "등록 중" : "확인"}
      </Button>
    </div>
  );
}
