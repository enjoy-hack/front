import { create } from 'zustand';

const useUserStore = create((set) => ({
  major: null,
  studentId: null,
  studentName: null,
  hasLoginHistory: false,
  hasUploadedHistory: false,

  setStudentId: (id) => set({ studentId: id }),
  setStudentName: (name) => set({ studentName: name }),
  setMajor: (major) => set({ major }),
  setHasLoginHistory: (hasLoginHistory) => set({ hasLoginHistory }),
  setHasUploadedHistory: (hasUploadedHistory) => set({ hasUploadedHistory }),
  reset: () => set({ studentId: null, studentName: null, major: null }),
}));

export default useUserStore;