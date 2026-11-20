import { describe, expect, it } from 'vitest';
import {
  COURSE_STATUS,
  mapGradeToStatus,
  parseTranscriptRows,
} from './transcript';

const { COMPLETED, FAILED } = COURSE_STATUS;

// 학사시스템 엑셀과 같은 위치(4번 열 교과목명, 10번 열 등급)에 값을 넣은 행
function row(courseName, grade) {
  const cells = Array(12).fill(null);
  cells[4] = courseName;
  cells[10] = grade;
  return cells;
}

const TITLE = ['기이수 성적 조회', ...Array(11).fill(null)];
const HEADER = row('교과목명', '등급');

describe('parseTranscriptRows', () => {
  it('0, 1행을 건너뛰고 4번 열 교과목명, 10번 열 등급을 읽는다', () => {
    const { courses } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('자료구조', 'A+'),
      row('운영체제', 'B0'),
    ]);
    expect(courses).toEqual([
      { courseName: '자료구조', status: COMPLETED },
      { courseName: '운영체제', status: COMPLETED },
    ]);
  });

  it('중간에 다시 나오는 헤더 행은 건너뛴다', () => {
    const { courses } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('자료구조', 'A+'),
      HEADER,
      row('운영체제', 'F'),
    ]);
    expect(courses.map((c) => c.courseName)).toEqual(['자료구조', '운영체제']);
  });

  it('완전히 빈 행은 건너뛴다', () => {
    const { courses } = parseTranscriptRows([
      TITLE,
      HEADER,
      row(null, null),
      row('', ''),
      row('자료구조', 'A0'),
    ]);
    expect(courses).toHaveLength(1);
  });

  it('과목명과 등급의 앞뒤 공백을 지운다', () => {
    const { courses } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('  자료구조 ', ' A+ '),
    ]);
    expect(courses[0]).toEqual({ courseName: '자료구조', status: COMPLETED });
  });
});

describe('mapGradeToStatus', () => {
  it.each(['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'P', 'a+', 'p'])(
    '%s 는 이수',
    (grade) => {
      expect(mapGradeToStatus(grade)).toBe(COMPLETED);
    }
  );

  it.each(['F', 'NP'])('%s 는 미이수', (grade) => {
    expect(mapGradeToStatus(grade)).toBe(FAILED);
  });
});
