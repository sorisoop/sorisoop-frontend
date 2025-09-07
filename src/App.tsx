import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./widgets";
import { NotificataionSseEListener } from "@/features/notification";

const HomePage = lazy(() => import("@/pages/home"));
const LibraryPage = lazy(() => import("@/pages/library"));
const DrawPage = lazy(() => import("@/pages/draw"));
const VoicePage = lazy(() => import("@/pages/voice"));
const VoiceAddPage = lazy(() => import("@/pages/voice/add"));
const VoiceEditPage = lazy(() => import("@/pages/voice/edit"));
const MyPage = lazy(() => import("@/pages/my"));
const FairyTaleDetailPage = lazy(() => import("@/pages/fairy-tale/detail"));
const FairyTaleReaderPage = lazy(() => import("@/pages/fairy-tale/detail/read/with-tts"));
const FairyTaleReaderStandalonePage = lazy(() => import("@/pages/fairy-tale/detail/read/no-tts"));
const FairyTaleByCategoryPage = lazy(() => import("@/pages/fairy-tale/category/name"));
const SubscribeManagePage = lazy(() => import("@/pages/my/subscribe-manage"));
const PaymentSuccessPage = lazy(() => import("@/pages/payment/success"));
const PaymentFailPage = lazy(() => import("@/pages/payment/fail"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const SignupPage = lazy(() => import("@/pages/auth/signup"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const CustomFairyTaleDetailPage = lazy(() => import("@/pages/fairy-tale/custom"));
const CustomFairyTaleReaderPage = lazy(() => import("@/pages/fairy-tale/custom/read/with-tts"));
const CustomFairyTaleReaderStandalonePage = lazy(() => import("@/pages/fairy-tale/custom/read/no-tts"));
const NotificationsPage = lazy(() => import("@/pages/notifications"));
const NotificationSettingsPage = lazy(() => import("@/pages/settings/notification"));
const ExhibitionPage = lazy(() => import("@/pages/exhibition"));

const ParentsPage = lazy(() => import("@/pages/parents"));
const ParentsMyPage = lazy(() => import("@/pages/parents/my"));
const MissionPage = lazy(() => import("@/pages/parents/mission"));
const ChildrenPage = lazy(() => import("@/pages/parents/children"));
const ChildrenMissionPage = lazy(() => import("@/pages/parents/children/mission"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NotificataionSseEListener />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lib" element={<LibraryPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/draw" element={<DrawPage />} />
        <Route path="/voice/add" element={<VoiceAddPage />} />
        <Route path="/voice/:id/edit" element={<VoiceEditPage />} />

        <Route path="/my" element={<MyPage />} />
        <Route path="/fairy-tale/:id" element={<FairyTaleDetailPage />} />
        <Route path="/fairy-tale/:id/read/:voiceUuid" element={<FairyTaleReaderPage />} />
        <Route path="/fairy-tale/:id/read" element={<FairyTaleReaderStandalonePage />} />

        <Route path="/fairy-tale/category/:id" element={<FairyTaleByCategoryPage />} />
        <Route path="/fairy-tale/custom/:id" element={<CustomFairyTaleDetailPage />} />
        <Route path="/fairy-tale/custom/:id/read" element={<CustomFairyTaleReaderStandalonePage />} />
        <Route path="/fairy-tale/custom/:id/read/:voiceUuid" element={<CustomFairyTaleReaderPage />} />

        <Route path="/subscription/manage" element={<SubscribeManagePage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<PaymentFailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/settings/notification" element={<NotificationSettingsPage />} />

        <Route path="/exhibition" element={<ExhibitionPage />} />

        <Route path="/parents" element={<ParentsPage />} />
        <Route path="/parents/my" element={<ParentsMyPage />} />

        <Route path="/parents/children" element={<ChildrenPage />} />
        <Route path="/parents/children/:childId" element={<ChildrenMissionPage />} />

        <Route path="/parents/mission/create" element={<MissionPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
