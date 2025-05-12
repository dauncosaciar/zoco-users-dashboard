import { createContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getAllUsersExceptLogged } from "@/api/UsersApi";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedToken = sessionStorage.getItem("token");

      if (!storedToken) {
        setUsersLoading(false);
        return;
      }

      try {
        setUsersLoading(true);
        const filteredUsers = await getAllUsersExceptLogged(token.user.id);
        setUsers(filteredUsers);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <UsersContext.Provider
      value={{
        users,
        usersLoading
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
