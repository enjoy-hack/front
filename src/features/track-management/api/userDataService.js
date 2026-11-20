// 기이수 성적 엑셀을 브라우저 안에서 읽고 트랙별 이수 현황을 계산한다.
// 예전에는 파일을 서버(POST /student-data/upload/{studentId})로 보냈지만,
// 지금은 파일이 브라우저 밖으로 나가지 않는다. 반환 모양(TrackProgressDto[])은 서버 응답과 같다.
import {
  tracks,
  calculateTrackProgress,
  getCompletedCourseNames,
  parseTranscriptRows,
} from '../../../entities/track';

export const uploadStudentExcel = async (file) => {
  let rows;
  try {
    // 엑셀 라이브러리는 업로드할 때만 불러온다 (첫 화면 번들에서 제외)
    const { readSheet } = await import('read-excel-file/browser');
    rows = await readSheet(file);
  } catch {
    throw new Error(
      '엑셀 파일을 읽을 수 없습니다. 학사정보시스템에서 내려받은 .xlsx 파일인지 확인해 주세요.'
    );
  }

  const { courses, warnings } = parseTranscriptRows(rows);
  if (warnings.length > 0) {
    console.warn('[성적 파일] 건너뛴 행', warnings);
  }
  if (courses.length === 0) {
    throw new Error('성적 파일에서 과목을 찾지 못했습니다.');
  }

  return calculateTrackProgress(tracks, getCompletedCourseNames(courses));
};
