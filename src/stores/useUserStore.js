import { create } from 'zustand';

const useUserStore = create((set) => ({
  studentmajor: null,
  studentId: null,
  studentName: null,
  studentTrack: null,
  studentCompleted: null,

  setStudentId: (id) => set({ studentId: id }),
  setStudentName: (name) => set({ studentName: name }),
  setMajor: (major) => set({ studentmajor: major }),
  setTrack: (track) => set({ studentTrack: track }),
  setCompleted: (completed) => set({ studentCompleted: completed }),
  reset: () =>
    set({
      studentId: null,
      studentName: null,
      studentmajor: null,
      studentTrack: null,
      studentCompleted: null,
    }),
}));

export default useUserStore;
