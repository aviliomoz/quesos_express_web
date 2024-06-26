import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { AppLayout } from "./layouts/AppLayout";
import { ProductsPage } from "./pages/ProductsPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<></>} />
          <Route path="/customers" element={<></>} />
          <Route path="/sales" element={<></>} />
          <Route path="/purchases" element={<></>} />
          <Route path="/inventory" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
