import { Suspense } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BackHeaderLayout } from "@/shared/layouts";
import { ProfileGridSkeleton, ProfilePage } from "@/features/profile/components";
import { ProfileAddProvider } from "@/features/profile/providers/profile-add-provider";
import { FloatingShapesBackground } from "@/widgets";

export default function ProfilePageScreen() {
  return (
    <BackHeaderLayout title="">
      <FloatingShapesBackground />

      <ProfilePage>
        <ProfilePage.Header />
        <Suspense fallback={<ProfileGridSkeleton />}>
          <ProfilePage.Grid>
            <ProfileAddProvider>
              <ProfilePage.AddCard>
                <ProfilePage.AddDialog />
              </ProfilePage.AddCard>
            </ProfileAddProvider>
          </ProfilePage.Grid>
        </Suspense>

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
