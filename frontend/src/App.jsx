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
import AssetRegistration from "./pages/AssetRegistration";
import AssetMarketPlace from "./features/marketPlace/AssetMarketPlace";
// import Footer from "./components/layout/Footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LandingPage />} />
      <Route path="/asset-registration" element={<AssetRegistration />} />
      <Route path="/asset-marketplace" element={<AssetMarketPlace /> } />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
