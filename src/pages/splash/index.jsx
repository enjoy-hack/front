import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackStatus from '../../features/track-management/components/TrackStatus';
import TrackIntroHeader from '../../features/track-management/components/TrackIntroHeader';
import TrackDataUploadModal from '../../features/track-management/components/TrackDataUploadModal';
import TrackTabs from '../../features/track-management/components/TrackTabs';
import { TRACK_NAMES } from '../../entities/track';
import useTrackStore from '../../entities/course/model/useTrackStore';

const Splash = () => {
  const [step, setStep] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState(TRACK_NAMES[0]);
  const navigate = useNavigate();
  // 업로드에 성공해서 모달이 닫히면 결과를 볼 수 있는 홈으로 이동한다
  const handleCloseUpload = () => {
    setShowUpload(false);
    if (useTrackStore.getState().trackData.length > 0) navigate('/home');
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2000);
    const timer2 = setTimeout(() => setStep(3), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-full rounded-tr-[140px] bg-blue-primary ring-2 ring-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-5 top-5 h-full w-full rounded-tr-[140px] bg-blue-primary ring-2 ring-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-10 h-full w-full rounded-tr-[140px] bg-blue-primary ring-2 ring-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-15 top-15 h-full w-full rounded-tr-[140px] bg-white"
      />
      {/* 업로드 팝업 */}
      {showUpload && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={handleCloseUpload}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <TrackDataUploadModal onClose={handleCloseUpload} />
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-36">
        {/* 양옆 패딩 조절 필요 */}
        {step === 1 && (
          <TrackStatus
            variant="large"
            allowHtmlTitle={true} // HTML 허용
            title={`환영합니다!<br>마이트랙에서는 인공지능융합대학의 트랙제를 관리할 수 있습니다`}
          />
        )}
        {step === 2 && (
          <TrackStatus
            variant="large"
            title="먼저 ‘트랙제’에 대해서 알아볼까요?"
          />
        )}
        {step === 3 && (
          <>
            {/* <div className="mt-30">
              <TrackStatus
                variant="large"
                title="먼저 ‘트랙제’에 대해서 알아볼까요?"
              />
            </div> */}

            <div className="mt-25 mb-10 w-full">
              <TrackIntroHeader />
            </div>

            <div className="w-full max-w-[1200px] text-center mt-10">
              <TrackTabs
                tabs={TRACK_NAMES}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>

            {/* 하단 안내 문구 */}
            <div className="mt-20 mb-16">
              <TrackStatus
                variant="card"
                title="사용자님께 가장 적합한 트랙을 알아볼까요?"
                subtitle="저를 눌러 수강이력을 업로드 해주세요."
                onClickCharacter={() => setShowUpload(true)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Splash;
