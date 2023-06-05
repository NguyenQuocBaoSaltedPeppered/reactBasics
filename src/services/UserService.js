import axios from "./customizeAxios";

const fetchAllUser = async (page) => {
  return await axios.get(`/api/users?page=${page}`);
};
const createUser = async (name, job) => {
  return await axios.post("/api/user", { name, job });
};
const updateUser = async (name, job, id) => {
  return await axios.put(`/api/user/${id}`, { name, job });
};
const deleteUser = async (id) => {
  return await axios.delete(`/api/user/${id}`);
};

export { fetchAllUser, createUser, updateUser, deleteUser };
