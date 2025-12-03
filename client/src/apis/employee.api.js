import axios from "axios";

const employeeApis = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/employees`,
  headers: {
    Accept: "application/json",
  },
});

export default employeeApis;
