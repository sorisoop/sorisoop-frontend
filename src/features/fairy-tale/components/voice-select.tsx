import { useGetVoices } from "@/entities/voice/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useCreateCustomTts, useCreateTts } from "@/entities/voice/api/mutations";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { MinusCircle } from "lucide-react";

interface VoiceSelectProps {
  mode?: "default" | "custom";
}

export default function VoiceSelect({ mode = "default" }: VoiceSelectProps) {
  const { data: voices } = useGetVoices();
  const { mutate: createTts, isPending: isPendingDefault } = useCreateTts();
  const { mutate: createCustomTts, isPending: isPendingCustom } = useCreateCustomTts();
  const isPending = isPendingDefault || isPendingCustom;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const basePath = mode === "custom" ? "/fairy-tale/custom" : "/fairy-tale";

  const handleSelect = (speakerId: string | null) => {
    if (!id || isPending) return;

    if (speakerId === null) {
      navigate(`${basePath}/${id}/read`);
      return;
    }

    if (mode === "custom") {
      createCustomTts(
        { speakerId, customFairyTaleId: Number(id) },
        {
          onSuccess: () => {
            navigate(`${basePath}/${id}/read/with-voice`, { state: { speakerId } });
          },
        }
      );
    } else {
      createTts(
        { speakerId, fairyTaleId: Number(id) },
        {
          onSuccess: () => {
            navigate(`${basePath}/${id}/read/with-voice`, { state: { speakerId } });
          },
        }
      );
    }
  };

  return (
    <div className="relative">
      <ul className="max-h-[60vh] overflow-y-auto divide-y divide-border">
        <li
          key="no-voice"
          className={cn(
            "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors",
            isPending && "pointer-events-none opacity-50"
          )}
          onClick={() => handleSelect(null)}
        >
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-muted">
              <AvatarFallback>
                <MinusCircle className="w-6 h-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">선택안함</span>
            </div>
          </div>
        </li>

        {voices?.map((voice) => (
          <li
            key={voice.id}
            className={cn(
              "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors",
              isPending && "pointer-events-none opacity-50"
            )}
            onClick={() => handleSelect(voice.speakerId)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={voice.imageUrl} alt={voice.title} />
                <AvatarFallback>{voice.title[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{voice.title}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isPending && (
        <div
          id="voice-select-overlay-pending"
          className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
        >
          <div className="flex flex-col items-center gap-y-4">
            <SpinnerIcon className="animate-spin w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">목소리를 생성하는 중이에요...</span>
          </div>
        </div>
      )}
    </div>
  );
}
