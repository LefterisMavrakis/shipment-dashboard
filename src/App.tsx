import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AuthContextProvider from "./context/auth/provider/AuthContextProvider";
import LoginPage from "./pages/login/LoginPage";
import RouteGuard from "./pages/RouteGuard";
import Home from "./pages/home/Home";
import ShipmentDetails from "./pages/shipmentDetails/ShipmentDetails";
import ShipmentsModal from "./components/shipmentsModal/ShipmentsModal";
import "./App.scss";

const App = () => {
  return (
    <div className="app-wrapper">
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<RouteGuard />}>
              <Route path="/" element={<Home />}>
                <Route
                  path="/shipments/:companyId"
                  element={<ShipmentsModal />}
                />
              </Route>

              <Route
                path="/details/:shipmentId"
                element={<ShipmentDetails />}
              />
            </Route>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
};

export default App;
