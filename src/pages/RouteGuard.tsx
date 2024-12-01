import React from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/hooks/useAuth/useAuth";
import Header from "../components/header/Header";
import { Constraint } from "../components/shared/styledCommon";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth() || {};
  const location = useLocation();

  const localStorageAuth = localStorage.getItem("isAuthenticated") === "true";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="layout-wrapper">
      {!isLoginPage && <Header />}
      {!!isAuthenticated || localStorageAuth ? (
        <main>
          <Constraint>
            <Outlet />
          </Constraint>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
