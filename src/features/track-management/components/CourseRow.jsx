import React from 'react';

/**
 * CourseRow: 과목 정보를 한 줄(행)로 보여주는 요약 컴포넌트
 * 좌측에 과목명, 우측 그리드에 연도/학기/코드/이수 상태를 배치
 * status가 '이수'일 때만 파란색 뱃지, 그 외엔 회색 뱃지로 표시
 */

const CourseRow = ({ name, year, semester, code, status }) => {
  // 과목명, 연도, 학기, 코드, 이수상태를 프롭으로 받음
  return (
    // 루트 컨테이너: 흰색 배경, 둥근 모서리, 패딩, 플렉스 박스
    // 좌측/우측을 justify-between으로 양끝 정렬해 좌: 과목명 / 우: 메타 정보 구조를 만듦
    <div className="bg-white rounded-lg p-4 flex items-center justify-between">
      <p className="font-bold text-base">{name}</p>{' '}
      {/* 과목명: 굵은 글씨, 기본 크기 */}
      {/* 우측 메타 정보 컨테이너: 4열 그리드, 열 간격, 최소 너비, 작은 글씨, 파란색 텍스트, 중앙 정렬 */}
      <div className="grid grid-cols-4 gap-2 min-w-[240px] text-sm text-[#0259DD] place-items-center text-center">
        {/* 연도, 학기, 코드, 이수상태를 각각 스팬으로 표시 */}
        <span>{year}</span>
        <span>{semester}</span>
        <span>{code}</span>
        {/* 상태 뱃지: 공통 스타일에 배경색은 이수 상태에 따라 다르게 적용 */}
        <span
          className={`w-16 px-2 py-1 rounded-lg text-xs font-semibold text-white ${
            status === '이수' ? 'bg-[#84AFFB]' : 'bg-[#D9D9D9]'
          }`}
        >
          {status} {/* 텍스트는 status 그대로 표기 */}
        </span>
      </div>
    </div>
  );
};

export default CourseRow;
