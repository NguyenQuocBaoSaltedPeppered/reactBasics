import axios from "./customizeAxios";

const fetchAllUser = async (page) => {
  return await axios.get(`/api/users?page=${page}`);
};

export { fetchAllUser };
