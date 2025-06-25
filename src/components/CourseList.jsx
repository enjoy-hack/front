import TrackHeader from "./TrackHeader";
import CourseItem from "./CourseItem";
import { track1,track2,track3,track4,track5,track6,track7,track8 } from "../constants/mock";

const trackMap = {
  "인공지능시스템": track1,
  "메타버스 플랫폼": track2,
  "클라우드 컴퓨팅": track3,
  "공간비주얼 SW": track4,
  "인터렉티브 플랫폼": track5,
  "지능형에이전트": track6,
  "AI 콘텐츠": track7,
  "데이터인텔리전스": track8
};

const CourseList = ({ activeTrack }) => {
    const courses = trackMap[activeTrack] || [];
    return (
        <div className="w-full bg-[#0259DD] rounded-bl-lg rounded-br-lg p-6 flex flex-col items-center -mt-1 z-0 relative">
            <div className="w-full flex justify-between items-center mb-4">
               <TrackHeader completedCount={1} total={6} hasData={true} />
            </div>

{/* <div className="grid grid-cols-6 gap-2 text-sm text-white font-medium px-4 mb-2">
  <span className="col-span-2 text-left">과목 명</span>
  <span className="text-center">해당 학년</span>
  <span className="text-center">해당 학기</span>
  <span className="text-center">학수번호</span>
  <span className="text-center">이수 여부</span>
</div> */}


            <div className="w-full space-y-2">
                 {courses.map(course => (
          <CourseItem key={course.id} {...course} />
        ))}
            </div>

            {/* <button className="mt-6 w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#0259DD] text-2xl font-bold">
                +
            </button> */}
        </div>
    );
};

export default CourseList;