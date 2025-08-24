import { useProfiles } from "@/entities/profile/api/hooks";
import { ProfileCard } from "./profile-card";

interface ProfileGridProps {
  children?: React.ReactNode;
}

export function ProfileGrid({ children }: ProfileGridProps) {
  const { data: profiles } = useProfiles();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16 place-items-center max-w-4xl mx-auto">
      {profiles?.map((p) => (
        <ProfileCard key={p.id} id={p.id} name={p.nickname} image={p.profileImage} />
      ))}

      {children}
    </div>
  );
}
