import axios from "axios";
const employeeApis = axios.create({
  baseURL: "https://interviewtask-server.onrender.com/api/v1/employees",
  headers: {
    Accept: "application/json",
  },
});

export default employeeApis;
