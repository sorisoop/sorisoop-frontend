import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";

interface ProfileCardProps {
  name: string;
  image?: string | null;
}

export function ProfileCard({ name, image }: ProfileCardProps) {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-110">
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 shadow-2xl group-hover:shadow-3xl transition-all duration-300 ring-2 ring-transparent group-hover:ring-primary/50">
            <AvatarImage
              src={image || "/default.webp"}
              alt={name}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <p className="text-base md:text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 tracking-wide">
          {name}
        </p>
      </div>
    </div>
  );
}
