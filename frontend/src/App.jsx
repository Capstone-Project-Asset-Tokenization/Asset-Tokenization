import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
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
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";



function App() {
  let auth = useSelector(state => state.auth)
  // auth.isAuthenticated

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LandingPage />} />
        <Route path="/asset-registration" element={auth.isAuthenticated ? <AssetRegistration /> : <Navigate to="/signin" />} />
        <Route path="/asset-verification" element={auth.isAuthenticated ? <AssetVerification /> : <Navigate to="/signin" />} />
        <Route path="/asset-verification-detail" element={auth.isAuthenticated ? <AssetDetail /> : <Navigate to="/signin" />} />

        <Route path="/signup" element={<UserRegistration />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/asset-marketplace" element={<AssetMarketPlace />} />
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    )
  );
  return (
    <div className="bg-[#2B2B2B]">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
