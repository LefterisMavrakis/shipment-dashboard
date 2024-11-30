import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./context/auth/provider/AuthContextProvider";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./pages/login/PrivateRoute";
import Home from "./pages/home/Home";
import ShipmentDetails from "./pages/shipmentDetails/ShipmentDetails";
import "./App.css";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/shipments/:companyId"
              element={<div>Shipments</div>}
            />
            <Route path="/details/:shipmentId" element={<ShipmentDetails />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
