// 데모용 가짜 기이수 성적 엑셀(public/sample-transcript.xlsx)을 만든다.
// 실제 학생 정보는 들어 있지 않다. 학수번호도 임의 값이다.
//
// 사용법 (front 폴더에서): node scripts/make-sample-transcript.mjs
//
// 학사시스템 엑셀과 같은 위치에 맞춘다: 0행 제목, 1행 헤더, 4번 열 교과목명, 10번 열 등급.
// 파서가 처리해야 하는 경우를 일부러 섞어 두었다.
// - 띄어쓰기가 트랙 데이터와 다른 과목명 (K-MOOC:생성형 인공지능 입문)
// - D+ 등급, F 후 재수강, 재수강하지 않은 F
// - 등급이 아직 없는 수강 중 과목 (경고로 건너뜀)
import writeExcelFile from 'write-excel-file/node';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const SAMPLE_PATH = resolve(here, '../public/sample-transcript.xlsx');

const HEADER = [
  '년도',
  '학기',
  '이수구분',
  '학수번호',
  '교과목명',
  '분반',
  '학점',
  '평가방식',
  '공학인증',
  '재수강',
  '등급',
  '평점',
];

const POINT = {
  'A+': 4.5,
  A0: 4.0,
  'B+': 3.5,
  B0: 3.0,
  'C+': 2.5,
  C0: 2.0,
  'D+': 1.5,
  D0: 1.0,
  F: 0,
};

// [년도, 학기, 이수구분, 교과목명, 등급]
const COURSES = [
  [2022, '1학기', '교양필수', '대학영어', 'A+'],
  [2022, '1학기', '기초교양', '미적분학1', 'B+'],
  [2022, '2학기', '전공필수', '자료구조', 'A0'],
  [2023, '1학기', '전공필수', '알고리즘', 'B+'],
  [2023, '1학기', '전공선택', '웹프로그래밍', 'A+'],
  [2023, '2학기', '전공필수', '운영체제', 'F'],
  [2023, '2학기', '전공선택', '데이터베이스', 'A0'],
  [2023, '2학기', '교양선택', 'K-MOOC:생성형 인공지능 입문', 'P'],
  [2024, '1학기', '전공필수', '운영체제', 'B+'],
  [2024, '1학기', '전공선택', '인공지능', 'A+'],
  [2024, '1학기', '전공선택', '컴퓨터그래픽스', 'B0'],
  [2024, '1학기', '전공선택', '기계학습개론', 'A0'],
  [2024, '2학기', '전공선택', '컴퓨터네트워크', 'D+'],
  [2024, '2학기', '전공선택', '패턴인식', 'B+'],
  [2024, '2학기', '전공선택', '정보보호개론', 'F'],
  [2025, '1학기', '전공선택', '딥러닝', 'A0'],
  [2025, '1학기', '전공선택', 'Human-AI Interaction', 'A+'],
  [2025, '2학기', '전공선택', '자연어처리', 'B+'],
  [2025, '2학기', '전공필수', '캡스톤디자인', null],
];

const cell = (value) => (value == null ? null : { value });

function buildSheetData() {
  const title = [cell('기이수 성적 조회 (데모용 가짜 데이터)')];
  while (title.length < HEADER.length) title.push(null);

  const rows = COURSES.map(([year, semester, type, name, grade], i) => {
    const isPassFail = grade === 'P' || grade === 'NP';
    return [
      year,
      semester,
      type,
      String(900001 + i),
      name,
      '001',
      3,
      isPassFail ? 'P/NP' : '상대평가',
      null,
      grade === 'F'
        ? null
        : COURSES.some(([, , , n, g], j) => j < i && n === name && g === 'F')
          ? 'Y'
          : null,
      grade,
      grade && !isPassFail ? POINT[grade] : null,
    ].map(cell);
  });

  return [title, HEADER.map(cell), ...rows];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeExcelFile(buildSheetData()).toFile(SAMPLE_PATH);
  console.log(`→ ${SAMPLE_PATH} (${COURSES.length}과목)`);
}
