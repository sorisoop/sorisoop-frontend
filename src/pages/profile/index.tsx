import { Suspense } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { BackHeaderLayout } from "@/shared/layouts";
import { ProfileGridSkeleton, ProfileManageDialog, ProfilePage } from "@/features/profile/components";
import { ProfileAddProvider } from "@/features/profile/providers/profile-add-provider";
import { FloatingShapesBackground } from "@/widgets";
import { ProfileDeleteProvider, ProfileParentPasswordProvider } from "@/features/profile/providers";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/error-boundary";

export default function ProfilePageScreen() {
  return (
    <BackHeaderLayout title="">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <FloatingShapesBackground />
        <ProfilePage>
          <ProfilePage.Header />
          <Suspense fallback={<ProfileGridSkeleton />}>
            <ProfileDeleteProvider>
              <ProfileParentPasswordProvider>
                <ProfilePage.Grid>
                  <ProfilePage.DeleteDialog />
                  <ProfilePage.PasswordDialog />
                  <ProfileAddProvider>
                    <ProfilePage.AddCard>
                      <ProfilePage.AddDialog />
                    </ProfilePage.AddCard>
                  </ProfileAddProvider>
                </ProfilePage.Grid>
              </ProfileParentPasswordProvider>
            </ProfileDeleteProvider>
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
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
