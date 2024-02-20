import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import { AppLayout } from "./layouts/app-layout";
import { HomePage } from "./pages/home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
