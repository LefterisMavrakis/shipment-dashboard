import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/auth/hooks/useAuth/useAuth";
import Header from "../components/header/Header";
import { Constraint } from "../components/shared/styledCommon";
import { authUsersMock } from "../api";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth() || {};
  const location = useLocation();

  const localStorageAuth = localStorage.getItem("isAuthenticated") === "true";
  const localStorageAuthUser = localStorage.getItem("authUserName");
  const isLoginPage = location.pathname === "/login";

  const dbUser = authUsersMock.find(
    (user) => user.username === localStorageAuthUser
  );

  useEffect(() => {
    if (localStorageAuth && localStorageAuthUser && !!login && dbUser) {
      login(dbUser.username, dbUser.password);
      return;
    }

    if (!!logout) {
      logout();
    }
  }, [localStorageAuth, localStorageAuthUser, dbUser, login, logout]);

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
