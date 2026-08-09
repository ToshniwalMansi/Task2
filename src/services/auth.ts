import api from "./api";

export const registerUser = async (formData: FormData) => {
  return await api.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const loginUser = async (formData: FormData) => {
  return await api.post("/users/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};