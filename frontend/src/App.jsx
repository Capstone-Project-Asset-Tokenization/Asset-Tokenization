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
import UserRegistration from "./pages/userRegistration";
// import Footer from "./components/layout/Footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LandingPage />} />
      <Route path="/asset-registration" element={<AssetRegistration />} />
      <Route path="/signup" element={<UserRegistration />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <div className="">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
