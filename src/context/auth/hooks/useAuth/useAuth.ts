import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContextProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
