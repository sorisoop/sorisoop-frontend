import { useGetVoices } from "@/entities/voice/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { useSelectVoice } from "@/entities/voice/api/mutations";
import { SpinnerIcon } from "@/shared/components/ui/spinner";

export default function VoiceSelect() {
  const { data: voices } = useGetVoices();
  const { mutate: selectVoice, isPending } = useSelectVoice();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!voices || voices.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">아직 등록된 목소리가 없습니다.</div>;
  }

  const handleSelect = (voiceId: number) => {
    if (!id || isPending) return;
    selectVoice(voiceId, {
      onSuccess: ({ voiceUuid }) => {
        navigate(`/fairy-tale/${id}/read/${voiceUuid}`);
      },
    });
  };

  return (
    <div className="relative">
      <ul className="divide-y divide-border">
        {voices.map((voice) => (
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
