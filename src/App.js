import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/customer/Dashboard";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import { ProductProvider } from "./contexts/product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="*" element={<Dashboard />}></Route>
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
