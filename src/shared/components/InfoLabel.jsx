import React from 'react';

/**
 * InfoLabel: 정보성 텍스트를 고정 폭(pill 형태)으로 표시하는 배지 컴포넌트.
 * 파란 배경/흰 텍스트의 대비로 짧은 라벨을 강조하며, 리스트 메타/요약 정보에 적합하다.
 * 내용은 text 프롭으로 전달된다.
 */

// text 프롭 하나만 받아 고정 스타일의 라벨/뱃지 블록을 렌더링하는 단순 표시용 컴포넌트
const InfoLabel = ({ text }) => {
  return (
    <div className="bg-blue-400 text-white text-center text-base px-6 py-2 rounded-xl w-28">
      {/* 스타일: 파란 배경, 흰 텍스트, 중앙 정렬, 기본 크기, 패딩, 둥근 모서리, 고정 너비 */}
      {text} {/* 전달된 텍스트를 그대로 표시 */}
    </div>
  );
};

export default InfoLabel;
