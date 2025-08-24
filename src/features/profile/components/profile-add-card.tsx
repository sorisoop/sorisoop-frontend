import { Plus } from "lucide-react";
import { useProfileAddContext } from "../hooks";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

interface ProfileAddCardProps {
  children?: React.ReactNode;
}

export function ProfileAddCard({ children }: ProfileAddCardProps) {
  const { setOpen } = useProfileAddContext();

  return (
    <div className="flex flex-col items-center">
      <div
        className="group cursor-pointer transform transition-all duration-300 hover:scale-110"
        onClick={() => setOpen(true)}
      >
        <div className="relative mb-3">
          <Avatar
            className="w-32 h-32 md:w-40 md:h-40 shadow-2xl group-hover:shadow-3xl transition-all duration-300 
                       ring-2 ring-transparent group-hover:ring-primary/50 border border-border/50"
          >
            <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <div className="p-4 rounded-full bg-background/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Plus className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
              </div>
            </AvatarFallback>
          </Avatar>

          <div
            className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/10 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        <p
          className="text-base md:text-lg font-medium text-muted-foreground 
                     group-hover:text-primary transition-colors duration-200 tracking-wide text-center"
        >
          새 프로필
        </p>
      </div>

      {children}
    </div>
  );
}
