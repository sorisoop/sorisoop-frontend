import { ProfileAddCard } from "./profile-add-card";
import { ProfileAddDialog } from "./profile-add-dialog";
import { ProfileCard } from "./profile-card";
import { ProfileGrid } from "./profile-grid";
import { ProfileHeader } from "./profile-header";
import { ProfileRoot } from "./profile-root";
export { default as ProfileGridSkeleton } from "./profile-grid-skeleton";

export const ProfilePage = Object.assign(ProfileRoot, {
  Header: ProfileHeader,
  Grid: ProfileGrid,
  Card: ProfileCard,
  AddCard: ProfileAddCard,
  AddDialog: ProfileAddDialog,
});
