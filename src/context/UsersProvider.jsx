import { createContext, useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  createAddressForUser,
  createStudyForUser,
  createUser,
  getAddressById,
  getAddressesByUserId,
  getAllUsersExceptLogged,
  getStudiesByUserId,
  getUserById,
  updateAddress,
  updateUser
} from "@/api/UsersApi";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [studies, setStudies] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedStudy, setSelectedStudy] = useState({});
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

      const [user, userAddresses, userStudies] = await Promise.all([
        getUserById(userId),
        getAddressesByUserId(userId),
        getStudiesByUserId(userId)
      ]);

      setSelectedUser(user);
      setAddresses(userAddresses);
      setStudies(userStudies);
    } catch (error) {
      console.error(error.message);
      setSelectedUser({});
      setAddresses([]);
      setStudies([]);
    } finally {
      setSelectedUserLoading(false);
    }
  }, []);

  const addUser = async formData => {
    try {
      const createdUser = await createUser(formData);
      setUsers(previousState => [...previousState, createdUser]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const editUser = async (formData, userId) => {
    try {
      const updatedUser = await updateUser(formData, userId);
      setSelectedUser(updatedUser);
      setUsers(previousState =>
        previousState.map(user => (user.id === userId ? updatedUser : user))
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const addAddressForUser = async (formData, userId) => {
    try {
      const createdAddress = await createAddressForUser(formData, userId);
      setAddresses(previousState => [...previousState, createdAddress]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchAddressById = async addressId => {
    try {
      const address = await getAddressById(addressId);
      return address;
    } catch (error) {
      console.log(error);
    }
  };

  const editAddress = async (formData, addressId) => {
    try {
      const updatedAddress = await updateAddress(formData, addressId);

      setSelectedAddress(updatedAddress);

      setAddresses(previousState =>
        previousState.map(addr =>
          addr.id === addressId ? updatedAddress : addr
        )
      );

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const addStudyForUser = async (formData, userId) => {
    try {
      const createdStudy = await createStudyForUser(formData, userId);
      setStudies(previousState => [...previousState, createdStudy]);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetSelectedUser = useCallback(() => {
    setSelectedUser({});
    setAddresses([]);
    setStudies([]);
  }, []);

  const clearUsersData = () => {
    setUsers([]);
    setSelectedUser({});
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        usersLoading,
        selectedUser,
        selectedAddress,
        selectedStudy,
        selectedUserLoading,
        addresses,
        studies,
        fetchUserById,
        addUser,
        editUser,
        resetSelectedUser,
        clearUsersData,
        setSelectedAddress,
        addAddressForUser,
        editAddress,
        fetchAddressById,
        addStudyForUser,
        setSelectedStudy
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };

export default UsersContext;
