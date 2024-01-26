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
import AssetRegistration from "./features/assetRegistration/Pages/AssetRegistration";
import UserRegistration from "./features/authentication/Pages/userRegistration";
import Login from "./features/authentication/Pages/Login";
import AssetMarketPlace from "./features/marketPlace/Pages/AssetMarketPlace";
import AssetVerification from "./features/assetVerification/pages/AssetVerification";
import AssetDetail from "./features/assetVerification/pages/assetDetail";
// import Footer from "./components/layout/Footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LandingPage />} />
      <Route path="/asset-registration" element={<AssetRegistration />} />
      <Route path="/asset-verification" element={<AssetVerification />} />
      <Route path="/asset-verification-detail" element={<AssetDetail />} />

      <Route path="/signup" element={<UserRegistration />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/asset-marketplace" element={<AssetMarketPlace /> } />
    </Route>
  )
);

function App({ routes }) {
  return (
    <div className="bg-[#2B2B2B]">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
