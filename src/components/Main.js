import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Vendor from "./pages/VendorDetails";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes from './common/PrivateRoutes';

const Main = () => {
    return ( 
        <div className="main">
            <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home/>} />
                <Route path="/history" element={<History/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/vendor/:id" element={<Vendor/>} />
               
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
            </Routes>
        </div>
     );
}
 
export default Main;