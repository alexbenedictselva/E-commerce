import "./App.css";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/shop/shop";
import Prouduct from "./pages/Product-Display/Prouduct";
import AdProd from "./pages/Product-Display/Admin/AdProd";
import UpdateProd from "./pages/Update/UpdateProd";
import AddProd from "./pages/AddProduct/AddProd";
import AccessDenied from "./pages/ErrorPages/AccessDenied";
import CheckOut from "./pages/CheckOut/CheckOut";
import AdminKPI from "./pages/AdminDashboard/AdminKPI.jsx";
import Payment from "./pages/payments/Payment.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Prouduct />} />
        <Route path="/checkout" element={<CheckOut />} />

        <Route path="/admin" element={<AdminKPI />} />
        <Route path="/admin/product/:id" element={<AdProd />} />
        <Route path="/admin/update/:id" element={<UpdateProd />} />
        <Route path="/admin/addProduct" element={<AddProd />} />
        <Route path="/NotAccessible" element={<AccessDenied />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
