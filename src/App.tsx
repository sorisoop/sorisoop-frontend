import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./widgets";
import AppRouter from "./app/app-router";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}
