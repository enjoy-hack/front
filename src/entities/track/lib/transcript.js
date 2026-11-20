// 기이수 성적 엑셀 행(2차원 배열)을 과목 목록으로 바꾼다.
// 백엔드 StudentDataService.parseAndSaveCourses 를 그대로 옮긴 버전.

export const COURSE_STATUS = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

const COURSE_COL = 4; // 교과목명
const GRADE_COL = 10; // 등급

export function mapGradeToStatus(grade) {
  switch (grade.toUpperCase()) {
    case 'A+':
    case 'A0':
    case 'B+':
    case 'B0':
    case 'C+':
    case 'C0':
    case 'P':
      return COURSE_STATUS.COMPLETED;
    case 'F':
    case 'NP':
      return COURSE_STATUS.FAILED;
    default:
      throw new Error(`잘못된 등급값: ${grade}`);
  }
}

/**
 * @param {Array<Array<unknown>>} rows 첫 번째 시트의 행 배열
 * @returns {{ courses: Array<{ courseName: string, status: string }>, warnings: Array<{ row: number, message: string }> }}
 */
export function parseTranscriptRows(rows) {
  const courses = [];

  rows.forEach((row, index) => {
    if (index <= 1) return;

    const courseCell = row[COURSE_COL];
    const gradeCell = row[GRADE_COL];

    // 헤더 행 무시
    if (courseCell != null && courseCell.trim() === '교과목명') return;

    // 완전 빈 행 무시
    if (
      (courseCell == null || courseCell.trim() === '') &&
      (gradeCell == null || gradeCell.trim() === '')
    ) {
      return;
    }

    const courseName = courseCell.trim();
    const grade = gradeCell.trim();
    if (grade === '') {
      throw new Error('엑셀 파일 파싱 실패: 등급이 비어있습니다.');
    }

    courses.push({ courseName, status: mapGradeToStatus(grade) });
  });

  return { courses, warnings: [] };
}
