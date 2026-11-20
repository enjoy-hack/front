// 트랙별 이수 현황 계산과 진척률 기반 추천.
// 백엔드 TrackService 를 옮기면서 아래를 고쳤다. 반환 모양은 TrackProgressDto 와 같다.
// - F, NP 과목은 이수로 세지 않는다
// - 과목명은 공백, 전각 문자, 대소문자 차이를 무시하고 비교한다
// - 트랙 이수 기준은 6과목 (REQUIRED_COURSE_COUNT)
// - 이수 과목이 하나도 없으면 추천하지 않는다
import { COURSE_STATUS } from './transcript';

/**
 * 트랙 이수에 필요한 과목 수.
 * 근거: 서비스 소개 문구("트랙에 포함된 과목을 6과목 이상 이수하면 트랙 인증"),
 * 해커톤 프론트의 진행 바 분모(6), 백엔드 TrackProgressDto 주석("예: 6")
 */
export const REQUIRED_COURSE_COUNT = 6;

/** 비교용 과목명: 전각을 반각으로(NFKC), 모든 공백 제거, 소문자 */
export function normalizeCourseName(name) {
  if (name == null) return '';
  return String(name).normalize('NFKC').replace(/\s+/g, '').toLowerCase();
}

/**
 * 파싱된 과목 목록에서 이수 과목명 Set 을 만든다. (정규화된 이름)
 * @param {Array<{ courseName: string, status: string }>} courses
 */
export function getCompletedCourseNames(courses) {
  return new Set(
    courses
      .filter((c) => c.status === COURSE_STATUS.COMPLETED)
      .map((c) => normalizeCourseName(c.courseName))
  );
}

function isCourseCompleted(course, completedNames) {
  return (
    completedNames.has(normalizeCourseName(course.courseName)) ||
    (course.courseAlias != null &&
      completedNames.has(normalizeCourseName(course.courseAlias)))
  );
}

/**
 * @param {Array<{ name: string, department: string, courses: Array<object> }>} tracks
 * @param {Set<string>} completedNames getCompletedCourseNames 의 결과
 * @returns TrackProgressDto[]
 */
export function calculateTrackProgress(tracks, completedNames) {
  return tracks.map((track) => {
    const completedCourses = [];
    const remainingCourses = [];

    for (const course of track.courses) {
      if (isCourseCompleted(course, completedNames)) {
        completedCourses.push(course);
      } else {
        remainingCourses.push(course);
      }
    }

    return {
      trackName: track.name,
      department: track.department,
      completedCount: completedCourses.length,
      requiredCount: REQUIRED_COURSE_COUNT,
      isCompleted: completedCourses.length >= REQUIRED_COURSE_COUNT,
      completedCourses,
      remainingCourses,
      hasUploadedHistory: true,
    };
  });
}

/**
 * 진척률(completedCount / requiredCount)이 가장 큰 트랙. 동률이면 앞쪽 트랙.
 * 이수 과목이 하나도 없으면 null.
 * @param {ReturnType<typeof calculateTrackProgress>} progress
 */
export function recommendByProgress(progress) {
  const best = progress.reduce(
    (acc, cur) =>
      acc == null ||
      cur.completedCount / cur.requiredCount >
        acc.completedCount / acc.requiredCount
        ? cur
        : acc,
    null
  );
  return best && best.completedCount > 0 ? best : null;
}
