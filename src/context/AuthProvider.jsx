import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/AuthApi";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    const storedRole = sessionStorage.getItem("role");

    if (storedToken && storedUser) {
      setToken(JSON.parse(storedToken));
      setUser(JSON.parse(storedUser));
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);

      if (!user) return false;

      const { password: pwd, ...userWithoutPassword } = user;
      const token = "token__" + Date.now();

      setToken(token);
      setUser(userWithoutPassword);
      setRole(userWithoutPassword.role);

      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("user", JSON.stringify(userWithoutPassword));
      sessionStorage.setItem("role", JSON.stringify(userWithoutPassword.role));

      navigate("/dashboard");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const isAuthenticated = !!token;

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isAuthenticated,
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
