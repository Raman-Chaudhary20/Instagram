import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login } from "../Services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);

    const res = await login(username, password);
    setUser(res.user);
    setLoading(false);
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);

    const res = await register(username, email, password);
    setUser(res.user);
    setLoading(false);
  };
  return { user, loading, handleLogin, handleRegister };
};
