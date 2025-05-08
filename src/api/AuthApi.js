import axiosClient from "@/config/axiosClient";

export async function loginUser(email, password) {
  const url = `/users?email=${email}&password=${password}`;
  const { data } = await axiosClient.get(url);
  const user = data[0];

  return user || null;
}
