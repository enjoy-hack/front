import React from 'react';
import LogoCharacter from '../assets/logo-character.svg?react'; // 캐릭터 SVG

const TrackStatusLarge = ({ title }) => {
  return (
    <div className="text-center">
      {/* 캐릭터 (더 크게) */}
      <div className="flex justify-center mb-4">
        <LogoCharacter className="w-40 h-auto" />
      </div>

      {/* 제목 (아래에 위치) */}
      {title && (
        <h2
          className="text-2xl font-semibold text-blue-600 mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
    </div>
  );
};

export default TrackStatusLarge;
