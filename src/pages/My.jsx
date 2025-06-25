import { useState } from 'react';
import CommonSquare from '../components/CommonSquare';
import MyTabs from '../components/MyTabs';
import MyInfo from '../components/MyInfo';
import MySetTrack from '../components/MySetTrack';
import TrackStatusLarge from '../components/TrackStatusLarge';
import useUserStore from '../stores/useUserStore';
import TrackInitButton from '../components/TrackInitButton';
import Button from '../components/Button';
import {
  getRecommendTrackByProgress,
  getRecommendTrackByInterest
} from '../services/trackRecommendService';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('내 정보');
  const studentId = useUserStore((state) => state.studentId);
  const studentName = useUserStore((state) => state.studentName);
  const [loading, setLoading] = useState(false);

  const [progressResult, setProgressResult] = useState(null);
  const [interestResult, setInterestResult] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const [progressRes, interestRes] = await Promise.all([
        getRecommendTrackByProgress(studentId),
        getRecommendTrackByInterest(studentId)
      ]);
      console.log('이수율 기반 추천:', progressRes);
      console.log('관심 기반 추천:', interestRes);
      setProgressResult(progressRes);
      setInterestResult(interestRes);
    } catch (error) {
      console.error('추천 트랙 요청 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto my-8 px-4">
      {/* 상단 */}
      <div className="flex flex-col items-center mb-10">
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

      {/* 추천 버튼 */}
      {/* <div className="flex justify-center mb-10">
        <Button
          label={loading ? '추천 중...' : '추천 완료'}
          onClick={handleSubmit}
          disabled={loading}
        />
      </div> */}

      <div className="flex justify-center mb-4">
  {!progressResult && !interestResult ? (
    <TrackInitButton onClick={handleSubmit} disabled={loading} />
  ) : (
    <div className="text-center text-[#0259DD] font-semibold text-lg">
      추천 트랙을 확인해보세요!
    </div>
  )}
</div>

      <div className="flex flex-col items-center gap-2 text-base font-medium">
        {progressResult?.trackName && (
          <div>
            🧠 이수율 기반 추천: <span className="text-black">{progressResult.trackName}</span>
          </div>
        )}
        {interestResult?.trackName && (
          <div>
            🌟 관심 기반 추천: <span className="text-black">{interestResult.trackName}</span>
          </div>
        )}
      </div>

      {/* 추천 결과 출력 */}
      {/* {(progressResult || interestResult) && (
        <div className="flex flex-col items-center gap-6 mb-20 text-lg font-semibold text-[#0259DD]">
          {progressResult?.trackName && (
            <div>🧠 이수율 기반 추천 트랙: <span className="text-black">{progressResult.trackName}</span></div>
          )}
          {interestResult?.trackName && (
            <div>🌟 관심 기반 추천 트랙: <span className="text-black">{interestResult.trackName}</span></div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default MyPage;
