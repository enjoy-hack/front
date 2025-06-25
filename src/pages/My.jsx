import { useState } from 'react';
import CommonSquare from '../components/CommonSquare';
import MyTabs from '../components/MyTabs';
import MyInfo from '../components/MyInfo';
import MySetTrack from '../components/MySetTrack';
import TrackStatusLarge from '../components/TrackStatusLarge';
import useUserStore from '../stores/useUserStore';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('내 정보');
  const [recommendTab, setRecommendTab] = useState('이수율 기반 추천');
  const [interestTab, setInterestTab] = useState('관심 과목');
  const studentName = useUserStore((state) => state.studentName);

  return (
    <div className="w-full mx-auto my-8 px-4">
      {/* 1. 상단 섹션 (트랙 설정 관련) */}
      <div className="flex flex-col items-center mb-20">
        <TrackStatusLarge
          title={`${studentName}님<br />오늘도 힘차게 달려볼까요?`}
        />
        <div className="mt-6 w-full max-w-[700px]">
          <MyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <CommonSquare>
            {activeTab === '내 정보' ? <MyInfo /> : <MySetTrack />}
          </CommonSquare>
        </div>
      </div>

      {/* 2. 하단 좌우 두 박스 (추천 트랙 / 관심 과목) */}
      <div className="flex flex-row justify-center gap-10">
        {/* 왼쪽: 추천 트랙 */}
        <div className="w-[600px]">
          <MyTabs activeTab={recommendTab} setActiveTab={setRecommendTab} />
          <CommonSquare>
            {recommendTab === '이수율 기반 추천' ? <MyInfo /> : <MySetTrack />}
          </CommonSquare>
        </div>

        {/* 오른쪽: 관심 과목 */}
        <div className="w-[600px]">
          <MyTabs activeTab={interestTab} setActiveTab={setInterestTab} />
          <CommonSquare>
            {interestTab === '관심 과목' ? <MyInfo /> : <MySetTrack />}
          </CommonSquare>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
