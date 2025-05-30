import "./App.css";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/shop/shop";
import Prouduct from "./pages/Product-Display/Prouduct";
import PopUp from "./pages/pop-up/popUp";
import Admin from "./pages/Home/Admin";
import Main from "./pages/Home/components/Admin/Main";
import AdProd from "./pages/Product-Display/Admin/AdProd";
import UpdateProd from "./pages/Update/UpdateProd";
import AddProd from "./pages/AddProduct/AddProd";
import AccessDenied from "./pages/ErrorPages/AccessDenied";
import CheckOut from "./pages/CheckOut/CheckOut";

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

        <Route path="/admin" element={<Main />} />
        <Route path="/admin/product/:id" element={<AdProd />} />
        <Route path="/admin/update/:id" element={<UpdateProd />} />
        <Route path="/admin/addProduct" element={<AddProd />} />
        <Route path="/NotAccessible" element={<AccessDenied />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
