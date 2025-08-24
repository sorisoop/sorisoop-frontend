import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import LibraryPage from "@/pages/library";
import VoicePage from "@/pages/voice";
import VoiceAddPage from "@/pages/voice/add";
import MyPage from "@/pages/my";
import FairyTaleDetailPage from "@/pages/fairy-tale/detail";
import SubscribeManagePage from "@/pages/my/subscribe-manage";
import PaymentSuccessPage from "@/pages/payment/success";
import PaymentFailPage from "@/pages/payment/fail";
import LoginPage from "@/pages/auth/login";
import FairyTaleReaderPage from "@/pages/fairy-tale/detail/read";
import SignupPage from "@/pages/auth/signup";
import FairyTaleByCategoryPage from "@/pages/fairy-tale/category/name";
import { ScrollToTop } from "./widgets";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lib" element={<LibraryPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/voice/add" element={<VoiceAddPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/fairy-tale/:id" element={<FairyTaleDetailPage />} />
        <Route path="/fairy-tale/:id/read" element={<FairyTaleReaderPage />} />
        <Route path="/fairy-tale/category/:id" element={<FairyTaleByCategoryPage />} />

        <Route path="/subscription/manage" element={<SubscribeManagePage />} />

        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<PaymentFailPage />} />

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
