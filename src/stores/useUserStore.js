import { create } from 'zustand';

const useUserStore = create((set) => ({
  studentmajor: null,
  studentId: null,
  studentName: null,
  studentTrack: null,
  studentCompleted: null,
  hasLoginHistory: false,
  hasUploadedHistory: false,
  setMajor: (major) => set({ studentmajor: major }),
  setStudentId: (id) => set({ studentId: id }),
  setStudentName: (name) => set({ studentName: name }),
  setTrack: (track) => set({ studentTrack: track }),
  setCompleted: (completed) => set({ studentCompleted: completed }),
  setHasLoginHistory: (hasLoginHistory) => set({ hasLoginHistory }),
  setHasUploadedHistory: (hasUploadedHistory) => set({ hasUploadedHistory }),
  
}));

export default useUserStore;
