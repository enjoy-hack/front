import { useState } from 'react';
import AppPrimarySection from '../../shared/components/AppPrimarySection';
import TrackStatus from '../../features/track-management/components/TrackStatus';
import TrackInitButton from '../../features/track-management/components/TrackInitButton';
import useUserStore from '../../entities/user/model/useUserStore';
import useTrackStore from '../../entities/course/model/useTrackStore';
import { recommendByProgress } from '../../entities/track';
import MyTabs from './ui/MyTabs';
import { MY_TABS } from './model/tabs';
import MyInfo from './ui/MyInfo';
import MySetTrack from './ui/MySetTrack';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(MY_TABS[0]);
  const studentName = useUserStore((state) => state.studentName);
  const trackData = useTrackStore((state) => state.trackData);
  // undefined: 아직 추천 전, null: 추천할 트랙 없음
  const [recommended, setRecommended] = useState(undefined);

  // 예전에는 서버의 진척률 기반, 관심 과목 기반 추천 API 두 개를 불렀다.
  // 관심 과목을 등록하는 화면이 프론트에 없어 관심 과목 기반 추천은 입력이 들어갈 수 없었으므로,
  // 업로드 결과로 계산하는 진척률 기반 추천만 남긴다.
  const handleRecommend = () => {
    setRecommended(recommendByProgress(trackData));
  };

  return (
    <div className="w-full mx-auto my-8 px-4">
      {/* 상단 */}
      <div className="flex flex-col items-center mb-10">
        <TrackStatus
          title={
            <>
              {studentName && (
                <>
                  {studentName}님
                  <br />
                </>
              )}
              오늘도 힘차게 달려볼까요?
            </>
          }
        />
        <div className="mt-6 w-full max-w-[700px]">
          <MyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <AppPrimarySection>
            {activeTab === MY_TABS[0] ? <MyInfo /> : <MySetTrack />}
          </AppPrimarySection>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        {recommended ? (
          <div className="text-center text-[#0259DD] font-semibold text-lg">
            추천 트랙을 확인해보세요!
          </div>
        ) : (
          <TrackInitButton onClick={handleRecommend} />
        )}
      </div>

      <div className="flex flex-col items-center gap-2 text-base font-medium">
        {recommended && (
          <div>
            🧠 이수율 기반 추천:{' '}
            <span className="text-black">{recommended.trackName}</span>
          </div>
        )}
        {recommended === null && (
          <p className="text-sm text-gray-500">
            {trackData.length === 0
              ? '홈에서 수강이력을 먼저 업로드해 주세요.'
              : '아직 이수한 트랙 과목이 없어 추천할 트랙이 없습니다.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
