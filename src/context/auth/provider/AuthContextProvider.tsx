import React, { createContext, useState } from "react";
import { authUsersMock } from "../../../api";

type AuthUser = {
  userId: number;
  username: string;
  fullname: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  authUser: AuthUser | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | undefined>(undefined);

  const login = (username: string, password: string) => {
    const dbUser = authUsersMock.find(
      (user) => user.username === username && user.password === password
    );

    if (!!dbUser) {
      setIsAuthenticated(true);
      setAuthUser({
        userId: dbUser.id,
        username: dbUser.username,
        fullname: dbUser.fullname,
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
