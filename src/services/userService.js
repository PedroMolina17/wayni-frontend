import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUser = async (id) => {
  return await axios.get(`${API_URL}/usuario/${id}`);
};

export const updateUser = async (id, updatedUser) => {
  return await axios.put(`${API_URL}/usuario/${id}`, updatedUser);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/usuario/${id}`);
};
