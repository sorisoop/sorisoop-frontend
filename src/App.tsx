import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import LibraryPage from "@/pages/library";
import VoicePage from "@/pages/voice";
import VoiceAddPage from "@/pages/voice/add";
import MyPage from "@/pages/my";
import FairyTaleDetailPage from "./pages/fairy-tale/detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lib" element={<LibraryPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/voice/add" element={<VoiceAddPage />} />
        <Route path="/my" element={<MyPage />} />

        <Route path="/fairy-tale/:id" element={<FairyTaleDetailPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
