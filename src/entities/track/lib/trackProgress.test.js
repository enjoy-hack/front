import { describe, expect, it } from 'vitest';
import {
  calculateTrackProgress,
  getCompletedCourseNames,
  recommendByProgress,
} from './trackProgress';
import tracks from '../data/tracks.json';

function course(courseName, courseAlias = null) {
  return {
    courseName,
    courseAlias,
    courseCode: 'X0000',
    academicYear: '3학년',
    academicSemester: '1학기',
  };
}

const TRACK_A = {
  name: 'A 트랙',
  department: '테스트학과',
  courses: [
    course('자료구조'),
    course('딥러닝개론', '인공지능'),
    course('운영체제'),
  ],
};
const TRACK_B = {
  name: 'B 트랙',
  department: '테스트학과',
  courses: [course('운영체제'), course('컴퓨터네트워크')],
};

describe('calculateTrackProgress', () => {
  it('과목명이 같으면 이수로 판정한다', () => {
    const [a] = calculateTrackProgress([TRACK_A], new Set(['자료구조']));
    expect(a.completedCount).toBe(1);
    expect(a.completedCourses.map((c) => c.courseName)).toEqual(['자료구조']);
    expect(a.remainingCourses.map((c) => c.courseName)).toEqual([
      '딥러닝개론',
      '운영체제',
    ]);
  });

  it('구 과목명(courseAlias)으로 들은 과목도 이수로 판정한다', () => {
    const [a] = calculateTrackProgress([TRACK_A], new Set(['인공지능']));
    expect(a.completedCourses.map((c) => c.courseName)).toEqual(['딥러닝개론']);
  });

  it('프론트가 기대하는 TrackProgressDto 모양을 반환한다', () => {
    const [a] = calculateTrackProgress([TRACK_A], new Set());
    expect(Object.keys(a).sort()).toEqual(
      [
        'trackName',
        'department',
        'completedCount',
        'requiredCount',
        'isCompleted',
        'completedCourses',
        'remainingCourses',
        'hasUploadedHistory',
      ].sort()
    );
    expect(a.trackName).toBe('A 트랙');
    expect(a.department).toBe('테스트학과');
    expect(a.hasUploadedHistory).toBe(true);
  });

  it('실제 트랙 데이터 8개를 순서대로 계산한다', () => {
    const progress = calculateTrackProgress(tracks, new Set());
    expect(progress.map((p) => p.trackName)).toEqual([
      '인공지능시스템',
      '메타버스 플랫폼',
      '클라우드 컴퓨팅',
      '공간비주얼 SW',
      '인터렉티브 플랫폼',
      '지능형에이전트',
      'AI 콘텐츠',
      '데이터인텔리전스',
    ]);
  });
});

describe('getCompletedCourseNames', () => {
  it('이수한 과목명을 Set 으로 만든다', () => {
    const names = getCompletedCourseNames([
      { courseName: '자료구조', status: 'COMPLETED' },
      { courseName: '운영체제', status: 'COMPLETED' },
    ]);
    expect([...names]).toEqual(['자료구조', '운영체제']);
  });
});

describe('recommendByProgress', () => {
  it('진척률이 가장 큰 트랙을 추천한다', () => {
    const progress = calculateTrackProgress(
      [TRACK_A, TRACK_B],
      new Set(['운영체제', '컴퓨터네트워크'])
    );
    // 이수 과목 수 A: 1, B: 2 (필요 과목 수는 둘 다 6)
    expect(recommendByProgress(progress).trackName).toBe('B 트랙');
  });

  it('동률이면 앞쪽 트랙을 추천한다', () => {
    const progress = calculateTrackProgress(
      [TRACK_B, { ...TRACK_B, name: 'C 트랙' }],
      new Set(['운영체제'])
    );
    expect(recommendByProgress(progress).trackName).toBe('B 트랙');
  });
});
