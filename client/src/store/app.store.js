import { create } from "zustand";
const appStore = (set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
});

const useAppStore = create(appStore);
export default useAppStore;
