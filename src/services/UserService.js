import axios from "./customizeAxios";

const fetchAllUser = async () => {
  return await axios.get("/api/users?page=1");
};

export { fetchAllUser };
