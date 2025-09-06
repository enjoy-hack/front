/**
 * TrackInitButton: 트랙 추천(초기화)을 시작하는 CTA 버튼
 * onClick으로 외부 동작을 실행하고, disabled일 때 시각적으로/기능적으로 비활성화됨
 * 폼 내부에 둘 경우 type="button" 지정이 권장
 */

const TrackInitButton = ({ onClick, disabled }) => {
  // 클릭 핸들러와 비활성화 상태를 props로 받음
  return (
    <button // 버튼 스타일과 상태에 따라 클래스 적용
      onClick={onClick}
      disabled={disabled} // 버튼이 비활성화 상태일 때 클릭 방지
      // 기본 스타일(파란색 배경, 흰색 텍스트, 둥근 모서리 등)에 비활성화 상태일 때 투명도와 커서 스타일 조건부 추가
      className={`bg-[#0259DD] text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      사용자님께 알맞는 트랙을 알아볼까요? {/* 고정 텍스트 */}
    </button>
  );
};

export default TrackInitButton;
