import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { AppLayout } from "./layouts/AppLayout";
import { ProductsPage } from "./pages/ProductsPage";
import { Toaster } from "react-hot-toast";
import { CustomersPage } from "./pages/CustomersPage";
import { PurchasesPage } from "./pages/PurchasesPage";
import { SuppliersPage } from "./pages/SuppliersPage";
import { SalesPage } from "./pages/SalesPage";
import { ProductPage } from "./pages/ProductPage";
import { KardexPage } from "./pages/KardexPage";
import { MovementPage } from "./pages/MovementPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/products/kardex/:id" element={<KardexPage />} />
            <Route path="/products/movements/new" element={<MovementPage />} />
            <Route path="/products/movements/:id" element={<MovementPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<></>} />
            <Route path="/customers/:id" element={<></>} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/sales/new" element={<></>} />
            <Route path="/sales/:id" element={<></>} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/purchases/new" element={<></>} />
            <Route path="/purchases/:id" element={<></>} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/suppliers/new" element={<></>} />
            <Route path="/suppliers/:id" element={<></>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
