'use client';

import React, { useEffect, useState } from 'react';
import TrackStatusCard from '../components/TrackStatusCard';
import TrackStatusLarge from '../components/TrackStatusLarge';
import TrackIntroTop from '../components/TrackIntroTop';
import UploadSection from '../components/UploadSection';
import DeleteIcon from '../assets/delete.svg';

const Splash = () => {
  const [step, setStep] = useState(1);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2000);
    const timer2 = setTimeout(() => setStep(3), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white relative overflow-hidden">
      {/* ✅ 업로드 팝업 */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <UploadSection onClose={() => setShowUpload(false)} />
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
            <div className="mt-30">
              <TrackStatusLarge title="먼저 ‘트랙제’에 대해서 알아볼까요?" />
            </div>

            <div className="mt-35 w-full">
              <TrackIntroTop />
            </div>

            {/* 🔧 나중에 추가할 컴포넌트 위치 */}
            {/* <TrackDetailCard /> */}

            {/* 하단 안내 문구 */}
            <div className="mt-32">
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
