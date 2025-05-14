import axiosClient from "@/config/axiosClient";

// Users
export const createUser = async formData => {
  try {
    const { data: existingUser } = await axiosClient.get(
      `/users?email=${formData.email}`
    );

    if (existingUser.length > 0) {
      throw new Error("Un usuario con ese email ya está registrado");
    }

    const url = "/users";
    const { data } = await axiosClient.post(url, formData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al crear el usuario. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
};

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

export const updateUser = async (formData, userId) => {
  try {
    const { data: existingUser } = await axiosClient.get(
      `/users?email=${formData.email}`
    );

    const emailAlreadyUsed = existingUser.some(user => user.id !== userId);

    if (emailAlreadyUsed) {
      throw new Error("Un usuario con ese email ya está registrado");
    }

    const url = `/users/${userId}`;
    const { data } = await axiosClient.put(url, formData);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al actualizar el usuario. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
};

// Addresses
export const createAddressForUser = async (formData, userId) => {
  try {
    const { data: existingUser } = await axiosClient.get(`/users?id=${userId}`);

    if (existingUser.length < 0) {
      throw new Error("No se encontró el usuario");
    }

    const url = "/addresses";
    const formDataWithUserId = { ...formData, userId: existingUser[0].id };
    const { data } = await axiosClient.post(url, formDataWithUserId);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al crear el usuario. Inténtalo nuevamente más tarde"
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

export const getAddressById = async addressId => {
  try {
    const url = `/addresses/${addressId}`;
    const { data: user } = await axiosClient.get(url);

    return user;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al obtener la dirección del usuario. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
};

// Studies
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
