import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import LibraryPage from "./pages/library";
import VoicePage from "./pages/voice";
import VoiceAddPage from "./pages/voice/add";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lib" element={<LibraryPage />} />
        <Route path="/voice" element={<VoicePage />} />
        <Route path="/voice/add" element={<VoiceAddPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
