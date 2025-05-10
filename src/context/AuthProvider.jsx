import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/AuthApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }

    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      const user = await loginUser(email, password);

      if (!user) {
        return { success: false, error: "Credenciales incorrectas" };
      }

      const token = {
        tokenId: "token__" + Date.now(),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      };

      setToken(token);
      setUser(user);
      setRole(user.role);

      sessionStorage.setItem("token", JSON.stringify(token));

      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const isAuthenticated = !!token;

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isAuthenticated,
        authLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
