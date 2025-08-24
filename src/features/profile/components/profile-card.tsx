import { useNavigate } from "react-router-dom";
import { useSelectProfile } from "@/entities/profile/api/mutations";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";

interface ProfileCardProps {
  id: number;
  name: string;
  image?: string | null;
}

export function ProfileCard({ id, name, image }: ProfileCardProps) {
  const { mutate: selectProfile } = useSelectProfile();
  const navigate = useNavigate();

  const handleClick = () => {
    selectProfile(id, {
      onSuccess: () => navigate("/"),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex flex-col items-center group">
      <div className="relative mb-3">
        <Avatar
          role="button"
          tabIndex={0}
          aria-label={`${name} 프로필 선택`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className="w-32 h-32 md:w-40 md:h-40 shadow-2xl 
                     group-hover:shadow-3xl transition-all duration-300 
                     ring-2 ring-transparent group-hover:ring-primary/50 
                     cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <AvatarImage
            src={image || "/default.webp"}
            alt={`${name} 프로필 이미지`}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <AvatarFallback aria-hidden>{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div
          className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     pointer-events-none"
        />
      </div>

      <p
        className="text-base md:text-lg font-medium text-muted-foreground 
                   group-hover:text-foreground transition-colors duration-200 tracking-wide"
      >
        {name}
      </p>
    </div>
  );
}
