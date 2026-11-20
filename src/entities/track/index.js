import tracks from './data/tracks.json';

export { tracks };

/** 탭 순서로 쓰는 트랙 이름 목록 (트랙 데이터에서 파생) */
export const TRACK_NAMES = tracks.map((track) => track.name);

export {
  REQUIRED_COURSE_COUNT,
  calculateTrackProgress,
  getCompletedCourseNames,
  normalizeCourseName,
  recommendByProgress,
} from './lib/trackProgress';
export { COURSE_STATUS, parseTranscriptRows } from './lib/transcript';
