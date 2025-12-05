import { create } from "zustand";
const formStore = (set) => ({
  showForm: false,
  setShowForm: (state) => {
    set({ showForm: state });
  },
  personToUpdate: null,
  setPersonToUpdate: (data) => {
    set({ personToUpdate: data });
  },
});

const useFormStore = create(formStore);
export default useFormStore;
