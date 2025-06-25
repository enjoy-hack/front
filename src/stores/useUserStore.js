import { create } from 'zustand';

const useUserStore = create((set) => ({
  major: null,
  studentId: null,
  studentName: null,
  setStudentId: (id) => set({ studentId: id }),
  setStudentName: (name) => set({ studentName: name }),
  setMajor: (major) => set({ major }),
  reset: () => set({ studentId: null, studentName: null, major: null }),
}));

export default useUserStore;