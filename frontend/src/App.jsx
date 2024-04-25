import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AssetRegistration from "./features/assetRegistration/Pages/AssetRegistration";
import UserRegistration from "./features/authentication/Pages/userRegistration";
import Login from "./features/authentication/Pages/Login";
import AssetMarketPlace from "./features/marketPlace/Pages/AssetMarketPlace";
import AssetVerification from "./features/assetVerification/pages/AssetVerification";
import AssetDetail from "./features/assetVerification/pages/assetDetail";
// import Footer from "./components/layout/Footer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ConnectWallet from "./features/authentication/Pages/ConnectWalet";
import ProfilePage from "./features/profile/pages";
import AssetDetailPage from "./features/marketPlace/Pages/AssetDetailPage";

function App() {
  let auth = useSelector((state) => state.auth);

  // get user from local storage
  let authData = JSON.parse(localStorage.getItem("authData"));

  return (
    <div className="bg-[#2B2B2B]">
      <Navbar />
      <Routes>
        <Route>
          <Route index element={<LandingPage />} />
          <Route
            path="/asset-registration"
            element={
              auth.isAuthenticated && !authData.roles.includes("ADMIN") ? (
                <AssetRegistration />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/asset-verification"
            element={
              auth.isAuthenticated && authData.roles.includes("ADMIN") ? (
                <AssetVerification />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/asset-verification-detail"
            element={
              auth.isAuthenticated ? <AssetDetail /> : <Navigate to="/signin" />
            }
          />

          <Route path="/signup" element={<UserRegistration />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/asset-marketplace" element={<AssetMarketPlace />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/asset/:id" element={<AssetDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
