import { createContext, useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getAllUsersExceptLogged, getUserById } from "@/api/UsersApi";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUserLoading, setSelectedUserLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedToken = sessionStorage.getItem("token");
      const parsedToken = storedToken ? JSON.parse(storedToken) : null;

      if (!parsedToken) {
        setUsersLoading(false);
        return;
      }

      try {
        setUsersLoading(true);
        const filteredUsers = await getAllUsersExceptLogged(
          parsedToken.user.id
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error.message);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const fetchUserById = useCallback(async userId => {
    try {
      setSelectedUserLoading(true);
      const user = await getUserById(userId);
      setSelectedUser(user);
    } catch (error) {
      console.error(error.message);
      setSelectedUser({});
    } finally {
      setSelectedUserLoading(false);
    }
  }, []);

  const resetSelectedUser = useCallback(() => {
    setSelectedUser({});
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        usersLoading,
        selectedUser,
        selectedUserLoading,
        fetchUserById,
        resetSelectedUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
