import InfoList from "../components/InfoList";
import TrackTabs from "../components/TrackTabs";
import { useState } from "react";

const TABS = [
  "인공지능시스템", "메타버스 플랫폼", "클라우드 컴퓨팅", "공간비주얼 SW",
  "인터렉티브 플랫폼", "지능형에이전트", "AI 콘텐츠", "데이터인텔리전스"
];

const TrackInfo = () => {

const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="p-8 text-center">
      <div className="w-full mx-auto flex justify-center">
        <div>
        <TrackTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <InfoList />
        </div>
    </div>
        </div>
    
  );
}

export default TrackInfo;