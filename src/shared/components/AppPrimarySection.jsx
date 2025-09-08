/**
 * AppPrimarySection: 브랜드 기본색(#0259DD) 배경의 공용 섹션 컨테이너
 * 하단 모서리를 둥글게 하고 세로 스택·중앙 정렬로 children을 감쌈
 * 카드 하단 영역이나 히어로 하이라이트 배경처럼 강조 섹션에 적합
 */

const AppPrimarySection = ({ children }) => {
  // children 프롭을 받아 내부 콘텐츠로 사용
  return (
    <div className="w-full bg-[#0259DD] rounded-bl-lg rounded-br-lg p-6 flex flex-col items-center -mt-1 z-0 relative">
      {/* 전체 너비, 파란색 배경, 둥근 아래 모서리, 내부 여백, 세로 스택 레이아웃, 중앙 정렬, 약간의 음수 마진과 z-인덱스, 상대 위치 지정 */}
      {children}
      {/* 내부 콘텐츠 렌더링(슬롯 영역, 외부에서 전달한 임의의 콘텐츠를 그대로 감쌈) */}
    </div>
  );
};

export default AppPrimarySection;
