import axiosClient from "@/config/axiosClient";

export const getAllUsersExceptLogged = async loggedUserId => {
  try {
    const url = "/users";
    const { data: users } = await axiosClient.get(url);

    const filteredUsers = users
      .filter(user => user.id !== loggedUserId)
      .map(filteredUser => {
        const filteredUserWithoutPassword = { ...filteredUser };
        delete filteredUserWithoutPassword.password;
        return filteredUserWithoutPassword;
      });

    return filteredUsers;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al obtener los usuarios. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
};

export const getUserById = async userId => {
  try {
    const url = `/users/${userId}`;
    const { data: user } = await axiosClient.get(url);

    return user;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al obtener los datos personales del usuario. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
};

export const getAddressesByUserId = async userId => {
  try {
    const url = `/addresses?userId=${userId}`;
    const { data: addresses } = await axiosClient.get(url);
    return addresses;
  } catch (error) {
    if (error.response) {
      throw new Error("Error al obtener las direcciones del usuario.");
    } else {
      throw new Error(error.message);
    }
  }
};

export const getStudiesByUserId = async userId => {
  try {
    const url = `/studies?userId=${userId}`;
    const { data: studies } = await axiosClient.get(url);
    return studies;
  } catch (error) {
    throw new Error(
      error.response
        ? "Error al obtener las direcciones del usuario."
        : error.message
    );
  }
};
