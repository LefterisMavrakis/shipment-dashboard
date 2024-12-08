import { BrowserRouter as Router, Route, Routes } from "react-router";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AuthContextProvider from "./context/auth/provider/AuthContextProvider";
import LoginPage from "./pages/login/LoginPage";
import RouteGuard from "./pages/RouteGuard";
import Home from "./pages/home/Home";
import ShipmentDetails from "./pages/shipmentDetails/ShipmentDetails";
import ShipmentsModal from "./components/shipmentsModal/ShipmentsModal";

import "@fontsource-variable/montserrat";
import "leaflet/dist/leaflet.css";
import "./App.scss";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat Variable', sans-serif",
    h5: {
      fontWeight: 800,
      color: "#07002E",
    },
    h6: {
      color: "#07002E",
    },
    subtitle1: {
      color: "#66637A",
    },
    body1: {
      color: "#07002E",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
});

const App = () => {
  return (
    <div className="app-wrapper">
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </div>
  );
};

export default App;
