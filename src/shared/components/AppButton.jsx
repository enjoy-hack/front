import React from 'react';

/*
 * AppButton: 공통 버튼 컴포넌트
 * variant/disabled/isSelected 프롭으로 상태·스타일을 제어하고, 공통 Tailwind 유틸을 기반으로 일관된 UI를 제공
 * 기본 클릭 동작(onClick)과 네이티브 disabled 속성을 그대로 전달
 */

function AppButton({
  label, // 버튼에 표시할 텍스트
  onClick, // 클릭 핸들러
  disabled, // 비활성화 여부 HTML disalabled와 클래스 선택에 사용
  variant = 'default', // 버튼 스타일 종류: 'default', 'file', 'track'
  isSelected = false, // 'track' variant에서 토글/선택 상태 표현용. 기본값 false
}) {
  const baseClasses = 'w-full rounded-lg py-3 font-bold transition';
  // 공통 tailwind 유틸리티(풀 너비, 둥근 모서리, 패딩, 폰트 굵기, 트랜지션) 이후 각 variant별 클래스 추가

  const variantClasses = {
    // 객체 선언 시작: variant 값에 따른 클래스 문자열 매핑
    default: disabled ? 'bg-blue-light-3 text-white' : 'bg-blue-600 text-white', // 기본 버튼: 비활성화 시 회색, 활성화 시 파란색/흰색
    file: 'border border-blue-400 text-blue-400 bg-white', // 파일 업로드 버튼: 파란색 테두리/텍스트, 흰색 배경
    track: isSelected // 트랙 토글 버튼: 선택 상태에 따라 스타일 변경
      ? 'bg-blue-600 text-white border border-blue-600 rounded-full px-3 py-2' // 선택됨: 파란색 배경/테두리, 흰색 텍스트, 둥근 모서리, 패딩
      : 'bg-white text-blue-500 border border-blue-300 rounded-full px-3 py-2', // 선택 안됨: 흰색 배경, 파란색 텍스트/테두리, 둥근 모서리, 패딩
  };

  return (
    // JSX 반환 시작
    <button // 루트: 네이티브 버튼 요소 사용
      onClick={onClick} // 클릭 핸들러 연결
      disabled={disabled} // 비활성화 속성 설정: 포커스 불가, 클릭 이벤트 무시
      className={`${baseClasses} ${variantClasses[variant]}`} // 클래스 문자열 결합: 공통 + variant별 (뒤에 오는 variantClasses가 우선 적용)
    >
      {label} {/* 버튼 텍스트 표시 */}
    </button>
  );
}

export default AppButton; // 컴포넌트 내보내기
