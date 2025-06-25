import React from 'react';
import LogoCharacter from '../assets/logo-character.svg?react'; // svg를 컴포넌트로 import

const TrackStatusCard = ({ title, subtitle, onClickCharacter }) => {
  return (
    <div className="text-center">
      {/* 제목 */}
      {title && (
        <h2 className="text-xl font-semibold text-blue-600 mt-16 mb-8">{title}</h2>
      )}

      {/* 캐릭터 */}
      <div className="flex justify-center mb-8">
        <button onClick={onClickCharacter}>
          <LogoCharacter className="w-28 h-auto" />
        </button>
      </div>

      {/* 부제목 */}
      {subtitle && <p className="text-sm text-blue-400">{subtitle}</p>}
    </div>
  );
};

export default TrackStatusCard;
