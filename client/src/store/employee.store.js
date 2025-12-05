import { create } from "zustand";
import employeeApis from "../apis/employee.api";
import { toast } from "react-toastify";

const employeeStore = (set) => ({
  employees: [],
  fetchError: false,
  setFetchError: (state) => set({ error: state }),
  //Fetch all employee state
  fetchEmployees: async () => {
    try {
      const response = await employeeApis.get("/");
      if (response.data?.success) {
        set({ employees: response.data?.data });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch employees");
    }
  },
  //Add  employee state
  addEmployee: async (employee) => {
    try {
      const response = await employeeApis.post("/add", employee);
      if (response.data?.success) {
        const newEmployee = response.data.data;
        set((store) => ({ employees: [newEmployee, ...store.employees] }));
        toast.success(response.data.message || "Added successfully");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Failed to add employee");
    }
  },
  //Update  employee state
  updateEmployee: async (id, employee) => {
    try {
      const response = await employeeApis.put(`/update/${id}`, employee);
      if (response.data?.success) {
        const updatedEmployee = response.data.data;
        set((store) => ({
          employees: store.employees.map((item) =>
            item._id === id ? updatedEmployee : item
          ),
        }));
        toast.success(response.data?.message || "Updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.data?.message || "Failed to update");
    }
  },
  //Delete  employee state
  deleteEmployee: async ({ _id }) => {
    try {
      const response = await employeeApis.delete(`/delete/${_id}`);
      if (response.data?.success) {
        set((store) => ({
          employees: store.employees.filter((i) => i._id !== _id),
        }));
        toast.success(response.data?.message || "Deleted successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete");
    }
  },
});

const useEmployeeStore = create(employeeStore);
export default useEmployeeStore;
