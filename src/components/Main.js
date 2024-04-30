import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Vendor from "./pages/VendorDetails";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoutes from "./common/PrivateRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./common/Checkout";
import SplashScreen from "./common/SplashScreen";

import { AnimatePresence } from "framer-motion";

const Main = () => {
  const location = useLocation();
  return (
    <div className="main">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
          }
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/vendor/:id" element={<Vendor />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/splash" element={<SplashScreen />} />

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Main;
