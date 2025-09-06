// import { useState } from 'react';

// const TABS = [
//  '인공지능시스템', '메타버스 플랫폼', '클라우드 컴퓨팅', '공간비주얼 SW', '인터렉티브 플랫폼', '지능형에이전트', 'AI 콘텐츠', '데이터인텔리전스'
// ];

/**
 * TrackTabs: 트랙 후보 배열에서 하나를 선택하는 컨트롤드 탭 컴포넌트
 * activeTab과 onChange를 통해 외부 상태로 제어되며, 활성 탭은 채움/비활성은 아웃라인 스타일로 구분
 * 탭이 많으면 flex-wrap으로 자동 줄바꿈되어 반응형으로 대응
 */

// 탭 목록, 현재 활성 탭, 탭 변경 콜백을 프롭으로 받음
const TrackTabs = ({ tabs, activeTab, onChange }) => {
  // const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    // 루트 컨테이너 (가로 정렬, 줄바꿈 허용, 중앙 정렬, 탭 간격: 탭 많아도 줄바꿈으로 대응)
    <div className="flex flex-wrap justify-center gap-2 relative">
      {/* 각 탭을 버튼으로 렌더링, 활성 탭은 파란 배경/흰 글씨, 비활성 탭은 테두리/파란 글씨 */}
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          // 클릭 시 상위에서 관리하는 활성 탭 상태를 변경하는 콜백 호출: 스타일은 조건부로 적용
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-4 py-2 rounded-tl-xl rounded-tr-xl font-medium transition
          ${
            isActive
              ? 'bg-[#0259DD] text-white'
              : 'text-[#84AFFB] border border-[#84AFFB] hover:bg-blue-100'
          }
        `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default TrackTabs;
