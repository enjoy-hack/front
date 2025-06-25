// import { useState } from 'react';

// const TABS = [
//  '인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅', '공간비주얼 SW', '인터렉티브 플랫폼', '지능형에이전트', 'AI 콘텐츠', '데이터인텔리전스'
// ];

const TrackTabs = ({ tabs, activeTab, onChange }) => {
    // const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="flex flex-wrap justify-center gap-2 relative">
            {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-2 rounded-tl-xl rounded-tr-xl font-medium transition
              ${isActive
                ? "bg-[#0259DD] text-white"
                : "text-[#84AFFB] border border-[#84AFFB] hover:bg-blue-100"}
            `}
          >
            {tab}
          </button>
        );
      })}
        </div>
    );
}

export default TrackTabs;
