import React, { useEffect, useState } from 'react';
import TrackStatusCard from '../../components/TrackStatusCard';
import TrackStatusLarge from '../../components/TrackStatusLarge';
import TrackIntroTop from '../../components/TrackIntroTop';
import UploadSection from '../../components/UploadSection';
import DeleteIcon from '../../assets/delete.svg';
import InfoList from '../../components/InfoList';
import TrackTabs from '../../components/TrackTabs';

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

const Splash = () => {
  const [step, setStep] = useState(1);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const handleCloseUpload = () => setShowUpload(false);

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

      {/* ✅ 업로드 팝업 */}
      {showUpload && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={handleCloseUpload}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <UploadSection onClose={handleCloseUpload} />
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-36">
        {' '}
        {/* 양옆 패딩 조절 필요 */}
        {step === 1 && (
          <TrackStatusLarge
            title={`환영합니다!<br>마이트랙에서는 인공지능융합대학의 트랙제를 관리할 수 있습니다`}
          />
        )}
        {step === 2 && (
          <TrackStatusLarge title="먼저 ‘트랙제’에 대해서 알아볼까요?" />
        )}
        {step === 3 && (
          <>
            <div className="mt-25 mb-10 w-full">
              <TrackIntroTop />
            </div>

            <div className="w-full max-w-[1200px] text-center mt-10">
              <TrackTabs
                tabs={TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              <InfoList />
            </div>

            {/* 하단 안내 문구 */}
            <div className="mt-20 mb-16">
              <TrackStatusCard
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
