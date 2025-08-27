import { Suspense } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BackHeaderLayout } from "@/shared/layouts";
import { ProfileGridSkeleton, ProfileManageDialog, ProfilePage } from "@/features/profile/components";
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

        <ProfileManageDialog>
          <ProfileManageDialog.Trigger>
            <Button className="text-secondary font-semibold max-w-sm cursor-pointer">
              <Settings className="!w-5 !h-5" />
              프로필 관리
            </Button>
          </ProfileManageDialog.Trigger>
          <ProfileManageDialog.Content />
        </ProfileManageDialog>
      </ProfilePage>
    </BackHeaderLayout>
  );
}
