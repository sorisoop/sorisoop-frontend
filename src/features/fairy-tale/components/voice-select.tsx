import { useGetVoices } from "@/entities/voice/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

export default function VoiceSelect() {
  const { data: voices } = useGetVoices();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!voices || voices.length === 0) {
    return <div className="p-6 text-center text-muted-foreground">아직 등록된 목소리가 없습니다.</div>;
  }

  const handleSelect = (voiceId: number) => {
    if (!id) return;
    navigate(`/fairy-tale/${id}/read/${voiceId}`);
  };

  return (
    <ul className="divide-y divide-border">
      {voices.map((voice) => (
        <li
          key={voice.id}
          className={cn(
            "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors"
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
  );
}
