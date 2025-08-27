import { CommonLayout } from "@/shared/layouts";
import MypageProfile from "./mypage-profile";
import MypageSubscribeBanner from "./mypage-subscribe-banner";
import MypageMenuSection from "./mypage-menu-section";
import MypageMenuItem from "./mypage-menu-item";
import MypageProfileEditDialog, { type MypageProfileEditDialogProps } from "./mypage-profile-edit-dialog";

function MypageRoot({ children }: { children: React.ReactNode }) {
  return <CommonLayout title="">{children}</CommonLayout>;
}

export const Mypage = Object.assign(MypageRoot, {
  Profile: MypageProfile,
  SubscribeBanner: MypageSubscribeBanner,
  MenuSection: MypageMenuSection,
  MenuItem: MypageMenuItem,
  EditDialog: ((props: Partial<MypageProfileEditDialogProps>) => (
    <MypageProfileEditDialog {...(props as MypageProfileEditDialogProps)} />
  )) as (props: Partial<MypageProfileEditDialogProps>) => React.ReactElement,
});

export default Mypage;
