// 기이수 성적 엑셀 행(2차원 배열)을 과목 목록으로 바꾼다.
// 백엔드 StudentDataService.parseAndSaveCourses 를 옮기면서 아래를 고쳤다.
// - D+, D0 등급 처리. 모르는 등급이나 빈 등급은 업로드 전체를 실패시키지 않고 그 행만 경고로 남긴다
// - null, 숫자형 셀을 안전하게 문자열로 바꾼다
// - 헤더 행에서 교과목명, 등급 열 위치를 찾고, 못 찾으면 백엔드 기준 위치(4번, 10번 열)를 쓴다

export const COURSE_STATUS = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

const COURSE_HEADER = '교과목명';
const GRADE_HEADER = '등급';
// 헤더를 못 찾았을 때 쓰는 백엔드 기준: 0, 1행은 제목과 헤더, 4번 열 교과목명, 10번 열 등급
const DEFAULT_LAYOUT = { headerRow: 1, courseCol: 4, gradeCol: 10 };
const HEADER_SEARCH_ROWS = 10;

const GRADE_STATUS = {
  'A+': COURSE_STATUS.COMPLETED,
  A0: COURSE_STATUS.COMPLETED,
  'B+': COURSE_STATUS.COMPLETED,
  B0: COURSE_STATUS.COMPLETED,
  'C+': COURSE_STATUS.COMPLETED,
  C0: COURSE_STATUS.COMPLETED,
  'D+': COURSE_STATUS.COMPLETED,
  D0: COURSE_STATUS.COMPLETED,
  P: COURSE_STATUS.COMPLETED,
  F: COURSE_STATUS.FAILED,
  NP: COURSE_STATUS.FAILED,
};

/** 등급 문자열을 이수 상태로 바꾼다. 모르는 등급이면 null */
export function mapGradeToStatus(grade) {
  return GRADE_STATUS[toText(grade).toUpperCase()] ?? null;
}

/** 셀 값을 앞뒤 공백 없는 문자열로 바꾼다 (null, 숫자, 날짜 모두 안전) */
function toText(cell) {
  if (cell == null) return '';
  return String(cell).trim();
}

function findLayout(rows) {
  const limit = Math.min(rows.length, HEADER_SEARCH_ROWS);
  for (let i = 0; i < limit; i += 1) {
    const cells = (rows[i] ?? []).map(toText);
    const courseCol = cells.indexOf(COURSE_HEADER);
    const gradeCol = cells.indexOf(GRADE_HEADER);
    if (courseCol !== -1 && gradeCol !== -1) {
      return { headerRow: i, courseCol, gradeCol };
    }
  }
  return DEFAULT_LAYOUT;
}

/**
 * @param {Array<Array<unknown>>} rows 첫 번째 시트의 행 배열
 * @returns {{ courses: Array<{ courseName: string, status: string }>, warnings: Array<{ row: number, message: string }> }}
 *   warnings 의 row 는 엑셀에서 보이는 행 번호(1부터)
 */
export function parseTranscriptRows(rows) {
  const { headerRow, courseCol, gradeCol } = findLayout(rows);
  const courses = [];
  const warnings = [];

  for (let i = headerRow + 1; i < rows.length; i += 1) {
    const row = rows[i] ?? [];
    const courseName = toText(row[courseCol]);
    const grade = toText(row[gradeCol]);
    const excelRow = i + 1;

    if (courseName === COURSE_HEADER) continue; // 중간에 다시 나오는 헤더
    if (courseName === '' && grade === '') continue; // 빈 행

    if (courseName === '') {
      warnings.push({ row: excelRow, message: '교과목명이 비어 있어 건너뜀' });
      continue;
    }
    if (grade === '') {
      warnings.push({
        row: excelRow,
        message: `${courseName}: 등급이 비어 있어 건너뜀`,
      });
      continue;
    }

    const status = mapGradeToStatus(grade);
    if (status == null) {
      warnings.push({
        row: excelRow,
        message: `${courseName}: 알 수 없는 등급(${grade})이라 건너뜀`,
      });
      continue;
    }

    courses.push({ courseName, status });
  }

  return { courses, warnings };
}
