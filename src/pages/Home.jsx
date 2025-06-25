import TrackTabs from "../components/TrackTabs";
import CourseList from "../components/CourseList";
import { useState } from "react";

const TABS = [
  "인공지능시스템", "메타버스 플랫폼", "클라우드 컴퓨팅", "공간비주얼 SW",
  "인터렉티브 플랫폼", "지능형에이전트", "AI 콘텐츠", "데이터인텔리전스"
];

const Home = () => {
  
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
      <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-[#0259DD] mb-6">오늘도 트랙을 달려볼까요?</h2>

      {/* <div className="flex flex-col items-center mb-8">
        <img
          src="/default-profile.png"
          alt="프로필"
          className="w-24 h-24 rounded-full mb-2"
        />
        <p className="text-sm text-gray-500">저를 눌러 수강이력을 업로드하세요!</p>
      </div> */}
      {/* <div className="max-w-screen-lg mx-auto"> */}
<div className="w-full mx-auto flex justify-center">
                {/* 이 div가 탭과 리스트를 감싸며, 너비는 내용물에 따라 자동 조절됩니다. */}
                <div>
                   <TrackTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <CourseList activeTrack={activeTab} />
                </div>
            </div>

        </div>
    );
};

export default Home;