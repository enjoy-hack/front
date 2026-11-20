// 트랙별 이수 현황 계산과 진척률 기반 추천.
// 백엔드 TrackService 를 그대로 옮긴 버전. 반환 모양은 TrackProgressDto 와 같다.

/**
 * 파싱된 과목 목록에서 이수 과목명 Set 을 만든다.
 * @param {Array<{ courseName: string, status: string }>} courses
 */
export function getCompletedCourseNames(courses) {
  return new Set(courses.map((c) => c.courseName));
}

function isCourseCompleted(course, completedNames) {
  return (
    completedNames.has(course.courseName) ||
    (course.courseAlias != null && completedNames.has(course.courseAlias))
  );
}

/**
 * @param {Array<{ name: string, department: string, courses: Array<object> }>} tracks
 * @param {Set<string>} completedNames
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
      requiredCount: track.courses.length,
      isCompleted: completedCourses.length === track.courses.length,
      completedCourses,
      remainingCourses,
      hasUploadedHistory: true,
    };
  });
}

/**
 * 진척률(completedCount / requiredCount)이 가장 큰 트랙. 동률이면 앞쪽 트랙.
 * @param {ReturnType<typeof calculateTrackProgress>} progress
 */
export function recommendByProgress(progress) {
  if (progress.length === 0) return null;
  return progress.reduce((best, cur) =>
    cur.completedCount / cur.requiredCount >
    best.completedCount / best.requiredCount
      ? cur
      : best
  );
}
