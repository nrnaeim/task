import axios from "axios";
const employeeApis = axios.create({
  baseURL: "https://taskserver-cpst.onrender.com/api/v1/employees",
  headers: {
    Accept: "application/json",
  },
});

export default employeeApis;
