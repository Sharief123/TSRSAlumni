import { useContext } from "react";
import AuthContext from "./context";
import AuthStorage from "./storage";
const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const logOut = () => {
    setUser(undefined);
    AuthStorage._removeData('authUser');
  };
  const login = (result) => {
    setUser(result.user);
    AuthStorage._storeData('authUser', result.user);
  };

  const register = (result) => {
    setUser(result.user);
    AuthStorage._storeData('authUser', result.user);
  };

  return { user, setUser, logOut, register, login };
};

export default useAuth;
