import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ConnectWallet from "./features/authentication/Pages/ConnectWalet";
import UserManagement from "./features/userManagement/pages/userManagement";
import AssetDetailPage from "./features/marketPlace/Pages/AssetDetailPage";
import EditAssetDetails from "./features/editAssetDetails/pages/editAssetDetails";
import ProfilePage from "./features/profile/pages";
import VerifyUserEmail from "./pages/verifyEmail";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="bg-[#2B2B2B]">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-email" element={<VerifyUserEmail />} />
        <Route
          path="/asset-registration"
          element={<PrivateRoute element={<AssetRegistration />} />}
        />
        <Route
          path="/asset-verification"
          element={<PrivateRoute element={<AssetVerification />} />}
        />
        <Route
          path="/asset-verification-detail"
          element={<PrivateRoute element={<AssetDetail />} />}
        />
        <Route
          path="/user-management"
          element={<PrivateRoute element={<UserManagement />} />}
        />
        <Route
          path="/edit-asset/:id"
          element={<PrivateRoute element={<EditAssetDetails />} />}
        />
        <Route
          path="/signup"
          element={
            auth.isAuthenticated ? <Navigate to="/" /> : <UserRegistration />
          }
        />
        <Route
          path="/signin"
          element={auth.isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />
        <Route
          path="/asset-marketplace"
          element={<PrivateRoute element={<AssetMarketPlace />} />}
        />
        <Route
          path="/connect-wallet"
          element={
            auth.isAuthenticated ? <Navigate to="/" /> : <ConnectWallet />
          }
        />
        <Route path="/asset/:id" element={<AssetDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

const PrivateRoute = ({ element: Element, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const isVerified = auth.user?.isVerified;

  if (!auth.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (!isVerified) {
    return <Navigate to="/verify-email" />;
  }

  return <Route {...rest} element={Element} />;
};

export default App;
