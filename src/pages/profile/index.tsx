import { Button } from "@/shared/components/ui/button";
import { Settings } from "lucide-react";
import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import { useProfiles } from "@/entities/profile/api/hooks";
import { ProfilePage } from "@/features/profile/components";
import { ProfileAddProvider } from "@/features/profile/providers/profile-add-provider";
import { FloatingShapesBackground } from "@/widgets";

export default function ProfilePageScreen() {
  const { data: profiles } = useProfiles();

  return (
    <BackHeaderLayout title="">
      <FloatingShapesBackground />

      <ProfilePage>
        <ProfilePage.Header />
        <ProfilePage.Grid>
          {profiles?.map((p) => (
            <ProfilePage.Card key={p.id} name={p.nickname} image={p.profileImage} />
          ))}

          <ProfileAddProvider>
            <ProfilePage.AddCard>
              <ProfilePage.AddDialog />
            </ProfilePage.AddCard>
          </ProfileAddProvider>
        </ProfilePage.Grid>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-sm font-medium border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 backdrop-blur-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            프로필 관리
          </Button>
        </div>
      </ProfilePage>
    </BackHeaderLayout>
  );
}
