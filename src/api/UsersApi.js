import axiosClient from "@/config/axiosClient";

export const getAllUsersExceptLogged = async loggedUserId => {
  try {
    const { data: users } = await axiosClient.get("/users");

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
