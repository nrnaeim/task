import { create } from "zustand";

const employeeStore = (set) => ({
  employees: [],
  addEmployee: (employee) => {
    set((store) => ({ employees: [employee, ...store.employees] }));
  },
  deleteEmployee: (employeeId) => {
    set((store) => ({
      employees: store.employees.filter((item) => item._id !== employeeId),
    }));
  },
  updateEmployee: (employee) => {
    set((store) => ({
      employees: store.employees.map((item) =>
        item._id === employee._id ? employee : item
      ),
    }));
  },
});

const useEmployeeStore = create(employeeStore);
export default useEmployeeStore;
