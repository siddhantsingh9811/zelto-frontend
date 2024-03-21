import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Vendor from "./pages/VendorDetails";
import { Route, Routes, useNavigate } from "react-router-dom";

const Main = () => {
    return ( 
        <div className="main">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/history" element={<History/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/vendor/:id" element={<Vendor/>} />
            </Routes>
        </div>
     );
}
 
export default Main;