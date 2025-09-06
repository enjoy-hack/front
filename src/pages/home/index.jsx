import TrackTabs from '../../features/track-management/components/TrackTabs';
import TrackCourseList from '../../features/track-management/components/TrackCourseList';
import TrackStatus from '../../features/track-management/components/TrackStatus';
import TrackDataUploadModal from '../../features/track-management/components/TrackDataUploadModal'; // 이전에 만든 TrackDataUploadModal 컴포넌트
import { useState } from 'react';

const TABS = [
  '인공지능시스템',
  '메타버스 플랫폼',
  '클라우드 컴퓨팅',
  '공간비주얼 SW',
  '인터렉티브 플랫폼',
  '지능형에이전트',
  'AI 콘텐츠',
  '데이터인텔리전스',
];

const Home = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showUpload, setShowUpload] = useState(false);

  // 모달을 닫는 함수
  const handleCloseUpload = () => setShowUpload(false);

  return (
    <div className="p-8 text-center">
      <TrackStatus
        title="오늘도 트랙을 달려볼까요?"
        subtitle="저를 눌러 수강이력을 업로드 해주세요."
        onClickCharacter={() => setShowUpload(true)}
      />

      <div className="w-full mx-auto flex justify-center mt-24">
        <div>
          <TrackTabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          <TrackCourseList activeTrack={activeTab} />
        </div>
      </div>

      {/* --- 모달 섹션 --- */}
      {showUpload && (
        // 1. 모달 배경(Backdrop)
        //    - bg-black/50: 검은색 배경에 50% 불투명도를 적용합니다.
        //    - onClick={handleCloseUpload}: 배경 클릭 시 모달을 닫습니다.
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black/80"
          onClick={handleCloseUpload}
        >
          {/* 2. 모달 컨텐츠
                    - onClick 이벤트가 배경으로 전파(버블링)되는 것을 막아
                      컨텐츠 내부 클릭 시 모달이 닫히지 않게 합니다. */}
          <div onClick={(e) => e.stopPropagation()}>
            <TrackDataUploadModal onClose={handleCloseUpload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
