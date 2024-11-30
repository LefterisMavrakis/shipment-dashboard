import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContextProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  console.error("useAuth must be used within an AuthProvider");

  return context;
};
