import React from 'react';

/*
 * ChipButton: 작은 pill 형태의 클릭 가능한 칩 컴포넌트
 * variant 프롭('blue' | 'yellow')으로 색상 테마를 바꾸고, onClick으로 상호작용을 처리
 * 목록 필터/태그 선택 등 보조 액션에 적합
 */

function ChipButton({ label, variant = 'blue', onClick }) {
  // variant: 'blue' | 'yellow', label: 칩에 표시할 텍스트, onClick: 클릭 핸들러
  // 기본 스타일과 variant별 스타일을 조건에 따라 결합
  const baseStyle = 'px-1 py-1 rounded-full text-xs transition'; // 공통 스타일: 패딩, 둥근 모서리, 작은 텍스트, 트랜지션
  const variantStyle = // variant 값에 따른 배경색과 텍스트 색상 결정
    variant === 'yellow'
      ? 'bg-yellow-300 text-blue-800' // 노란색 변형: 노란색 배경, 진한 파란색 텍스트
      : 'bg-blue-600 text-white'; // (기본) 파란색 변형: 파란색 배경, 흰색 텍스트

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {/*버튼 요소로 렌더링, 클릭 핸들러 연결, baseStyle과 variantStyle을 병합해 클래스 결합*/}
      {label} {/*칩에 표시할 텍스트*/}
    </button>
  );
}

export default ChipButton;
