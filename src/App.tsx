import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { ScrollToTop } from "./widgets";
import { lazy } from "react";
import { Page, PageTransition } from "./shared/transitions";

const HomePage = lazy(() => import("@/pages/home"));
const LibraryPage = lazy(() => import("@/pages/library"));
const DrawPage = lazy(() => import("@/pages/draw"));
const VoicePage = lazy(() => import("@/pages/voice"));
const VoiceAddPage = lazy(() => import("@/pages/voice/add"));
const VoiceEditPage = lazy(() => import("@/pages/voice/edit"));
const MyPage = lazy(() => import("@/pages/my"));
const FairyTaleDetailPage = lazy(() => import("@/pages/fairy-tale/detail"));
const FairyTaleReaderPage = lazy(() => import("@/pages/fairy-tale/detail/read"));
const FairyTaleByCategoryPage = lazy(() => import("@/pages/fairy-tale/category/name"));
const SubscribeManagePage = lazy(() => import("@/pages/my/subscribe-manage"));
const PaymentSuccessPage = lazy(() => import("@/pages/payment/success"));
const PaymentFailPage = lazy(() => import("@/pages/payment/fail"));
const LoginPage = lazy(() => import("@/pages/auth/login"));
const SignupPage = lazy(() => import("@/pages/auth/signup"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const CustomFairyTaleDetailPage = lazy(() => import("@/pages/fairy-tale/custom"));
const CustomFairyTaleReaderPage = lazy(() => import("@/pages/fairy-tale/custom/read"));
const NotificationSettingsPage = lazy(() => import("@/pages/settings/notification"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTransition>
        <Route
          path="/"
          element={
            <Page type="basic">
              <HomePage />
            </Page>
          }
        />
        <Route
          path="/lib"
          element={
            <Page type="basic">
              <LibraryPage />
            </Page>
          }
        />
        <Route
          path="/voice"
          element={
            <Page type="basic">
              <VoicePage />
            </Page>
          }
        />
        <Route
          path="/draw"
          element={
            <Page type="basic">
              <DrawPage />
            </Page>
          }
        />
        <Route
          path="/my"
          element={
            <Page type="basic">
              <MyPage />
            </Page>
          }
        />

        <Route
          path="/voice/add"
          element={
            <Page type="slide">
              <VoiceAddPage />
            </Page>
          }
        />
        <Route
          path="/voice/:id/edit"
          element={
            <Page type="slide">
              <VoiceEditPage />
            </Page>
          }
        />

        <Route
          path="/fairy-tale/:id"
          element={
            <Page type="slide">
              <FairyTaleDetailPage />
            </Page>
          }
        />
        <Route
          path="/fairy-tale/:id/read/:voiceUuid"
          element={
            <Page key={location.pathname} type="slide">
              <FairyTaleReaderPage />
            </Page>
          }
        />

        <Route
          path="/fairy-tale/category/:id"
          element={
            <Page type="slide">
              <FairyTaleByCategoryPage />
            </Page>
          }
        />
        <Route
          path="/fairy-tale/custom/:id"
          element={
            <Page type="slide">
              <CustomFairyTaleDetailPage />
            </Page>
          }
        />
        <Route
          path="/fairy-tale/custom/:id/read"
          element={
            <Page type="slide">
              <CustomFairyTaleReaderPage />
            </Page>
          }
        />

        <Route
          path="/subscription/manage"
          element={
            <Page type="slide">
              <SubscribeManagePage />
            </Page>
          }
        />
        <Route
          path="/payment/success"
          element={
            <Page type="slide">
              <PaymentSuccessPage />
            </Page>
          }
        />
        <Route
          path="/payment/fail"
          element={
            <Page type="slide">
              <PaymentFailPage />
            </Page>
          }
        />
        <Route
          path="/auth/login"
          element={
            <Page type="slide">
              <LoginPage />
            </Page>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <Page type="slide">
              <SignupPage />
            </Page>
          }
        />
        <Route
          path="/profile"
          element={
            <Page type="slide">
              <ProfilePage />
            </Page>
          }
        />
        <Route
          path="/settings/notification"
          element={
            <Page type="slide">
              <NotificationSettingsPage />
            </Page>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </PageTransition>
    </BrowserRouter>
  );
}
