// 백엔드 시드 데이터(data.sql)를 프론트에서 쓰는 트랙 JSON으로 변환한다.
//
// 사용법 (front 폴더에서):
//   node scripts/convert-tracks.mjs [data.sql 경로]
// 기본 경로는 형제 저장소 ../back/src/main/resources/data.sql 이다.
//
// 결과: src/entities/track/data/tracks.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const sqlPath = resolve(
  process.argv[2] ?? resolve(here, '../../back/src/main/resources/data.sql')
);
const outPath = resolve(here, '../src/entities/track/data/tracks.json');

// data.sql 의 과목명 오타. 대문자 I 자리에 소문자 l 이 들어가 실제 과목명과 매칭되지 않았다
const COURSE_NAME_FIXES = {
  'Human-Al Interaction': 'Human-AI Interaction',
  'Al 네트워킹': 'AI 네트워킹',
};
const fixName = (name) => COURSE_NAME_FIXES[name] ?? name;

// SQL 값 목록 "(1, 'a', NULL, 'b')" 에서 값을 꺼낸다. '' 는 작은따옴표 이스케이프
function parseValues(tuple) {
  const values = [];
  const re = /'((?:[^']|'')*)'|(NULL)|(-?\d+)/g;
  let m;
  while ((m = re.exec(tuple))) {
    if (m[1] !== undefined) values.push(m[1].replace(/''/g, "'"));
    else if (m[2]) values.push(null);
    else values.push(Number(m[3]));
  }
  return values;
}

export function convertTracksSql(sql) {
  const tracks = new Map();

  const trackRe =
    /INSERT INTO track \(id, department, name\) VALUES\s*(\([^)]*\));/g;
  for (const [, tuple] of sql.matchAll(trackRe)) {
    const [id, department, name] = parseValues(tuple);
    tracks.set(id, { id, name, department, courses: [] });
  }

  const courseBlockRe =
    /INSERT INTO track_course \(track_id, course_name, course_alias, course_code, academic_year, academic_semester\) VALUES([\s\S]*?);/g;
  for (const [, block] of sql.matchAll(courseBlockRe)) {
    for (const [tuple] of block.matchAll(/\((?:[^()']|'(?:[^']|'')*')*\)/g)) {
      const [
        trackId,
        courseName,
        courseAlias,
        courseCode,
        academicYear,
        academicSemester,
      ] = parseValues(tuple);
      const track = tracks.get(trackId);
      if (!track)
        throw new Error(`track_id ${trackId}에 해당하는 트랙이 없습니다`);
      track.courses.push({
        courseName: fixName(courseName),
        courseAlias: courseAlias && fixName(courseAlias),
        courseCode,
        academicYear,
        academicSemester,
      });
    }
  }

  return [...tracks.values()].sort((a, b) => a.id - b.id);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const tracks = convertTracksSql(readFileSync(sqlPath, 'utf8'));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(tracks, null, 2) + '\n');
  for (const t of tracks) {
    console.log(
      `${t.id}. ${t.department} / ${t.name}: ${t.courses.length}과목`
    );
  }
  console.log(`→ ${outPath}`);
}
