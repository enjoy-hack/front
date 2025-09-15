import TrackProgressHeader from './TrackProgressHeader'; // 상단 헤더(진행률)
import CourseRow from './CourseRow'; // 개별 과목 행
import useTrackStore from '../../../entities/course/model/useTrackStore'; // 전역 데이터 스토어 훅

/**
 * TrackCourseList: 활성 트랙의 이수/미이수 과목을 합쳐 한 화면에 보여주는 섹션
 * 상단에 트랙 진행률 헤더를, 하단에 과목 행(CourseRow)들을 렌더링
 * 트랙 데이터는 전역 스토어(useTrackStore)의 trackData에서 조회
 */

// import { track1,track2,track3,track4,track5,track6,track7,track8 } from "../constants/mock";

// const trackMap = {
//   "인공지능시스템": track1,
//   "메타버스 플랫폼": track2,
//   "클라우드 컴퓨팅": track3,
//   "공간비주얼 SW": track4,
//   "인터렉티브 플랫폼": track5,
//   "지능형에이전트": track6,
//   "AI 콘텐츠": track7,
//   "데이터인텔리전스": track8
// };

// 현재 활성 탭/트랙 이름을 프롭으로 받아 해당 트랙의 과목 목록을 보여줄 준비
const TrackCourseList = ({ activeTrack }) => {
  // const courses = trackMap[activeTrack] || [];
  // 전역 스토어에서 업로드/계산된 트랙 데이터를 가져옴
  const trackData = useTrackStore((state) => state.trackData);
  // 현재 활성 트랙에 해당하는 데이터 객체를 찾음. 없으면 null 반환
  const current = trackData.find((t) => t.trackName === activeTrack);

  if (!current) {
    // 데이터가 없으면 업로드 안내 메시지 표시
    return (
      <div className="w-full text-black text-center mt-8">
        <p>업로드된 이력이 없습니다.</p>
      </div>
    );
  }

  // 구조분해로 완료/미완료 과목 배열을 추출, 기본값은 빈 배열
  const { completedCourses = [], remainingCourses = [] } = current;

  // 완료/미완료 배열을 합쳐서 상태 필드를 추가한 새 배열 생성
  const allCourses = [
    ...completedCourses.map((c) => ({ ...c, status: '이수' })),
    ...remainingCourses.map((c) => ({ ...c, status: '미이수' })),
  ];

  return (
    // 전체 컨테이너 (파란 배경, 둥근 모서리, 패딩, 플렉스 박스)
    <div className="w-full bg-[#0259DD] rounded-bl-lg rounded-br-lg p-6 flex flex-col items-center -mt-1 z-0 relative">
      <div className="w-full flex justify-between items-center mb-4">
        {/* 트랙 데이터 업로드 모달 컴포넌트 */}
        {/* 이수 개수/총 과목 수(고정: 6)를 헤더에 전달해 진행률과 요약 텍스트 표시 */}
        <TrackProgressHeader
          completedCount={completedCourses.length}
          total={6}
          hasData={true}
        />
      </div>

      {/* <div className="grid grid-cols-6 gap-2 text-sm text-white font-medium px-4 mb-2">
  <span className="col-span-2 text-left">과목 명</span>
  <span className="text-center">해당 학년</span>
  <span className="text-center">해당 학기</span>
  <span className="text-center">학수번호</span>
  <span className="text-center">이수 여부</span>
</div> */}

      {/* 합쳐진 과목 배열을 맵핑해 CourseRow 컴포넌트로 렌더링: 키는 courseCode+인덱스 */}
      <div className="w-full space-y-2">
        {allCourses.map((course, i) => (
          <CourseRow
            key={`${course.courseCode}-${i}`}
            name={course.courseName}
            year={course.academicYear}
            semester={course.academicSemester}
            code={course.courseCode}
            status={course.status}
          />
        ))}
      </div>

      {/* <button className="mt-6 w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#0259DD] text-2xl font-bold">
                +
            </button> */}
    </div>
  );
};

export default TrackCourseList;
