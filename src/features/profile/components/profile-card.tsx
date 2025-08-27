import { useNavigate } from "react-router-dom";
import { useSelectProfile } from "@/entities/profile/api/mutations";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useProfileDeleteContext } from "../hooks";

interface ProfileCardProps {
  id: number;
  name: string;
  image?: string | null;
}

export function ProfileCard({ id, name, image }: ProfileCardProps) {
  const { mutate: selectProfile } = useSelectProfile();
  const { setOpen, setTargetId } = useProfileDeleteContext();
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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetId(id);
    setOpen(true);
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

        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full shadow-md 
               hover:bg-destructive/90 cursor-pointer"
          onClick={handleDelete}
        >
          <X className="w-4 h-4" />
        </Button>
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
