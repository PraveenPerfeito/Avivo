import axios from "axios";

const USER_API_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(USER_API_URL);
    return response?.data?.users ?? [];
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch users";

    throw new Error(message);
  }
};
