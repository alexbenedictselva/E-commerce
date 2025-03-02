import "./App.css";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Login/Register";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Shop from "./pages/shop/shop";
import Prouduct from "./pages/Product-Display/Prouduct";
import PopUp from "./pages/pop-up/popUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Prouduct />} />
      </Routes>
      {/* <PopUp message='hi'/> */}
    </BrowserRouter>
  );
}

export default App;


