// 해커톤 백엔드에서 발견한 버그를 재현하는 테스트.
// 백엔드 로직을 그대로 옮긴 버전에서는 실패하고, 수정 후에 통과해야 한다.
import { describe, expect, it } from 'vitest';
import {
  COURSE_STATUS,
  mapGradeToStatus,
  parseTranscriptRows,
} from './transcript';
import {
  calculateTrackProgress,
  getCompletedCourseNames,
  recommendByProgress,
} from './trackProgress';
import tracks from '../data/tracks.json';

const { COMPLETED, FAILED } = COURSE_STATUS;

function row(courseName, grade) {
  const cells = Array(12).fill(null);
  cells[4] = courseName;
  cells[10] = grade;
  return cells;
}
const TITLE = ['기이수 성적 조회', ...Array(11).fill(null)];
const HEADER = row('교과목명', '등급');

function progressOf(transcriptCourses) {
  return calculateTrackProgress(
    tracks,
    getCompletedCourseNames(transcriptCourses)
  );
}
const passed = (courseName) => ({ courseName, status: COMPLETED });
const failed = (courseName) => ({ courseName, status: FAILED });
const byName = (progress, name) => progress.find((p) => p.trackName === name);

describe('등급 처리: 업로드 전체가 실패하던 문제', () => {
  it.each(['D+', 'D0'])('%s 등급은 이수로 본다', (grade) => {
    expect(mapGradeToStatus(grade)).toBe(COMPLETED);
  });

  it('D 등급 과목이 하나 있어도 나머지 과목을 정상으로 읽는다', () => {
    const { courses } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('자료구조', 'A+'),
      row('운영체제', 'D+'),
    ]);
    expect(courses).toHaveLength(2);
  });

  it('모르는 등급은 예외 대신 그 행만 건너뛰고 경고로 남긴다', () => {
    const { courses, warnings } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('자료구조', 'A+'),
      row('운영체제', 'W'),
    ]);
    expect(courses.map((c) => c.courseName)).toEqual(['자료구조']);
    expect(warnings).toEqual([
      { row: 4, message: expect.stringContaining('W') },
    ]);
  });

  it('등급이 빈 칸인 행(수강 중 과목 등)은 건너뛰고 경고로 남긴다', () => {
    const { courses, warnings } = parseTranscriptRows([
      TITLE,
      HEADER,
      row('자료구조', 'A+'),
      row('캡스톤디자인', null),
    ]);
    expect(courses).toHaveLength(1);
    expect(warnings).toHaveLength(1);
  });
});

describe('셀 형식: null, 숫자 셀에서 예외가 나던 문제', () => {
  it('과목명 칸이 비어 있고 등급만 있는 행은 건너뛰고 경고로 남긴다', () => {
    const { courses, warnings } = parseTranscriptRows([
      TITLE,
      HEADER,
      row(null, 'A+'),
      row('자료구조', 'A0'),
    ]);
    expect(courses.map((c) => c.courseName)).toEqual(['자료구조']);
    expect(warnings).toHaveLength(1);
  });

  it('숫자형 셀은 문자열로 바꿔 읽는다', () => {
    const { courses } = parseTranscriptRows([TITLE, HEADER, row(2024, 'P')]);
    expect(courses).toEqual([{ courseName: '2024', status: COMPLETED }]);
  });

  it('헤더 행에서 교과목명, 등급 열 위치를 찾아 쓴다', () => {
    const { courses } = parseTranscriptRows([
      ['년도', '학기', '교과목명', '학점', '등급'],
      ['2024', '1', '자료구조', 3, 'A+'],
    ]);
    expect(courses).toEqual([{ courseName: '자료구조', status: COMPLETED }]);
  });
});

describe('이수 판정: F 과목이 이수로 집계되던 문제', () => {
  it('F, NP 과목은 이수 과목에 넣지 않는다', () => {
    const names = getCompletedCourseNames([
      passed('자료구조'),
      failed('운영체제'),
    ]);
    expect([...names]).toEqual(['자료구조']);
  });

  it('F 후 재수강해서 통과했으면 이수로 본다', () => {
    const names = getCompletedCourseNames([
      failed('운영체제'),
      passed('운영체제'),
    ]);
    expect([...names]).toEqual(['운영체제']);
  });
});

describe('과목명 매칭: 공백, 전각 문자, 데이터 오타로 매칭이 안 되던 문제', () => {
  it('띄어쓰기가 달라도 같은 과목으로 본다', () => {
    // 트랙 데이터: 'K-MOOC: 생성형 인공지능 입문'
    const p = progressOf([passed('K-MOOC:생성형 인공지능 입문')]);
    expect(byName(p, '인공지능시스템').completedCount).toBe(1);
  });

  it('전각 문자(：)가 섞여 있어도 같은 과목으로 본다', () => {
    // 트랙 데이터: 'K-MOOC:모두를 위한 머신러닝'
    const p = progressOf([passed('K-MOOC：모두를 위한 머신러닝')]);
    expect(byName(p, '인공지능시스템').completedCount).toBe(1);
  });

  it('Human-AI Interaction 을 들으면 세 트랙에서 이수로 잡힌다 (데이터의 Human-Al 오타)', () => {
    const p = progressOf([passed('Human-AI Interaction')]);
    expect(byName(p, '인공지능시스템').completedCount).toBe(1);
    expect(byName(p, '메타버스 플랫폼').completedCount).toBe(1);
    expect(byName(p, 'AI 콘텐츠').completedCount).toBe(1);
  });

  it('AI 네트워킹을 들으면 클라우드 컴퓨팅에서 이수로 잡힌다 (데이터의 Al 오타)', () => {
    const p = progressOf([passed('AI 네트워킹')]);
    expect(byName(p, '클라우드 컴퓨팅').completedCount).toBe(1);
  });
});

describe('이수 기준: 트랙 과목 전부를 들어야 이수로 나오던 문제', () => {
  const six = [
    '인공지능',
    '패턴인식',
    '강화학습',
    '자연어처리',
    '딥러닝',
    '인공지능시스템',
  ].map(passed);

  it('필요 과목 수는 6이다', () => {
    const p = progressOf([]);
    expect(p.every((t) => t.requiredCount === 6)).toBe(true);
  });

  it('6과목을 이수하면 트랙 이수 완료다', () => {
    const p = progressOf(six);
    expect(byName(p, '인공지능시스템').completedCount).toBe(6);
    expect(byName(p, '인공지능시스템').isCompleted).toBe(true);
  });

  it('5과목이면 아직 이수 완료가 아니다', () => {
    const p = progressOf(six.slice(0, 5));
    expect(byName(p, '인공지능시스템').isCompleted).toBe(false);
  });
});

describe('추천: 이수 과목이 없어도 첫 번째 트랙을 추천하던 문제', () => {
  it('이수 과목이 하나도 없으면 추천하지 않는다', () => {
    expect(recommendByProgress(progressOf([]))).toBeNull();
  });
});
