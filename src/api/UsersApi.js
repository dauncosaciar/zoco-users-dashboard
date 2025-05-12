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
