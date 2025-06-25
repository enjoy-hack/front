import { create } from 'zustand';

const useTrackStore = create((set) => ({
  trackData: [], // 전체 트랙 리스트
  setTrackData: (data) => set({ trackData: data }),
  reset: () => set({ trackData: [] }),
}));

export default useTrackStore;