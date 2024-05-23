import React from "react";
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
import { Navigate,Routes,Route } from "react-router-dom";
import ConnectWallet from "./features/authentication/Pages/ConnectWalet";
import UserManagement from "./features/userManagement/pages/userManagement";
import AssetDetailPage from "./features/marketPlace/Pages/AssetDetailPage";
import EditAssetDetails from "./features/editAssetDetails/pages/editAssetDetails";
import ProfilePage from "./features/profile/pages";
import VerifyUserEmail from "./pages/verifyEmail";

function App() {
  let auth = useSelector((state) => state.auth);

  // get user from local storage
  let authData = JSON.parse(localStorage.getItem("authData"));

  return (
    <div className="bg-[#2B2B2B]">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/asset-registration"
          element={
            auth.isAuthenticated ? (
              <AssetRegistration />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/asset-verification"
          element={
            auth.isAuthenticated ? (
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
        <Route
          path="/user-management"
          element={
            auth.isAuthenticated ? (
              <UserManagement />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/edit-asset/:id"
          element={
            auth.isAuthenticated ? (
              <EditAssetDetails />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            auth.isAuthenticated ? <Navigate to="/" /> : <UserRegistration />
          }
        />
        <Route
          path="/signin"
          element={
            auth.isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/profile"
          element={
            auth.isAuthenticated ? <ProfilePage /> : <Navigate to="/signin" />
          }
        />
        <Route path="/asset-marketplace" element={<AssetMarketPlace />} />
        <Route
          path="/connect-wallet"
          element={
            auth.isAuthenticated ? <Navigate to="/" /> : <ConnectWallet />
          }
        />
        <Route path="/asset/:id" element={<AssetDetailPage />} />
        <Route path="/verify-email" element={<VerifyUserEmail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
