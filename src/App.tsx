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
import { SupplierPage } from "./pages/SupplierPage";
import { CustomerPage } from "./pages/CustomerPage";
import { PurchasePage } from "./pages/PurchasePage";
import { SalePage } from "./pages/SalePage";

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
            <Route path="/products/:id/kardex" element={<KardexPage />} />
            <Route
              path="/products/:pid/movements/new"
              element={<MovementPage />}
            />
            <Route
              path="/products/:pid/movements/:mid"
              element={<MovementPage />}
            />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<CustomerPage />} />
            <Route path="/customers/:id" element={<CustomerPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/sales/new" element={<SalePage />} />
            <Route path="/sales/:id" element={<SalePage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/purchases/new" element={<PurchasePage />} />
            <Route path="/purchases/:id" element={<PurchasePage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/suppliers/new" element={<SupplierPage />} />
            <Route path="/suppliers/:id" element={<SupplierPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
