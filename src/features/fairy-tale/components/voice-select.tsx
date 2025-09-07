import { useGetVoices } from "@/entities/voice/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useSelectVoice } from "@/entities/voice/api/mutations";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { MinusCircle } from "lucide-react";

interface VoiceSelectProps {
  mode?: "default" | "custom";
}

export default function VoiceSelect({ mode = "default" }: VoiceSelectProps) {
  const { data: voices } = useGetVoices();
  const { mutate: selectVoice, isPending } = useSelectVoice();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const basePath = mode === "custom" ? "/fairy-tale/custom" : "/fairy-tale";

  const handleSelect = (voiceId: number | null) => {
    if (!id || isPending) return;

    if (voiceId === null) {
      navigate(`${basePath}/${id}/read`);
      return;
    }

    selectVoice(voiceId, {
      onSuccess: ({ voiceUuid }) => {
        navigate(`${basePath}/${id}/read/${voiceUuid}`);
      },
    });
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
            onClick={() => handleSelect(voice.id)}
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
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <SpinnerIcon className="animate-spin w-6 h-6 text-primary" />
        </div>
      )}
    </div>
  );
}
