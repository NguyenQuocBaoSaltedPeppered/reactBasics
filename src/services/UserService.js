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

export { fetchAllUser, createUser };
