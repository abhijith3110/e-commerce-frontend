import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/customer/dashboard/Dashboard";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import { ProductProvider } from "./contexts/product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/customer/cart/Cart";
import { CartProvider } from "./contexts/cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./components/common/PaymentSuccess";
import FailModal from "./components/common/FailModal";
import Orders from "./components/customer/orders/Orders";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51OTIAJSIBQHp4SrpnAMD9ufpg5DJiGLdmzMcNOiCo2KByrnqO7jKDvUJ8Ddvihj6s5nace7mYrm1jjNArTy1yViY00LErcEJBa"
  );

  return (
    <div className="App">
      <ToastContainer />
      <ProductProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route
              path="/cart"
              element={
                <Elements stripe={stripePromise}>
                  <Cart />
                </Elements>
              }
            ></Route>
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<FailModal />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Dashboard />}></Route>
          </Routes>
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
