import axiosClient from "@/config/axiosClient";

export async function loginUser(email, password) {
  try {
    const url = "/users";
    const { data: users } = await axiosClient.get(url);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Email o Password incorrectos");
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  } catch (error) {
    if (error.response) {
      throw new Error(
        "Error al iniciar sesión. Inténtalo nuevamente más tarde"
      );
    } else {
      throw new Error(error.message);
    }
  }
}
