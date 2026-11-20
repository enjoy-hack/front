// 샘플 엑셀을 실제 라이브러리(read-excel-file)로 읽어 파싱부터 진척률 계산까지 확인한다.
import { describe, expect, it } from 'vitest';
import { readSheet } from 'read-excel-file/node';
import { SAMPLE_PATH } from './make-sample-transcript.mjs';
import {
  tracks,
  calculateTrackProgress,
  getCompletedCourseNames,
  parseTranscriptRows,
  recommendByProgress,
} from '../src/entities/track';

describe('public/sample-transcript.xlsx', async () => {
  const rows = await readSheet(SAMPLE_PATH);
  const { courses, warnings } = parseTranscriptRows(rows);
  const progress = calculateTrackProgress(
    tracks,
    getCompletedCourseNames(courses)
  );
  const byName = (name) => progress.find((p) => p.trackName === name);

  it('등급이 있는 18과목을 읽고, 등급 없는 수강 중 과목 1개를 경고로 남긴다', () => {
    expect(courses).toHaveLength(18);
    expect(warnings).toEqual([
      { row: 21, message: expect.stringContaining('캡스톤디자인') },
    ]);
  });

  it('인공지능시스템 트랙을 6과목으로 이수 완료한다 (띄어쓰기 다른 K-MOOC, Human-AI 포함)', () => {
    const ai = byName('인공지능시스템');
    expect(ai.completedCount).toBe(6);
    expect(ai.isCompleted).toBe(true);
  });

  it('클라우드 컴퓨팅: 재수강한 운영체제와 D+ 과목은 이수, 정보보호개론(F)은 미이수', () => {
    const cloud = byName('클라우드 컴퓨팅');
    const done = cloud.completedCourses.map((c) => c.courseName);
    expect(done).toEqual(
      expect.arrayContaining(['운영체제', '컴퓨터네트워크'])
    );
    expect(done).not.toContain('정보보호개론');
  });

  it('진척률 기반 추천은 인공지능시스템이다', () => {
    expect(recommendByProgress(progress).trackName).toBe('인공지능시스템');
  });
});
