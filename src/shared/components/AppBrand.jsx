import Logo from '../../assets/logo-character.svg?react'; // 마스코트 로고
import MyTrack from '../../assets/mytrack.svg?react'; // 워드마크 "마이트랙"

/*
 * AppBrand: 앱의 브랜드 락업(마스코트 + 워드마크)을 세로 스택으로 보여주는 컴포넌트
 * 고정 크기의 마스코트와 로고를 중앙 정렬해 온보딩/로그인 등에서 브랜드 아이덴티티를 강조
 * 외부 프롭 없이 정적 브랜딩 표시 목적에 특화
 */

function AppBrand() {
  // 컴포넌트 선언 시작. 외부 프롭 없이 고정된 UI 반환
  return (
    <div className="flex flex-col items-center gap-2">
      {/* 세로 스택 레이아웃(flex 컨테이너, 중앙 정렬, 아이템 간격)으로 상단에 마스코트, 하단에 마이트랙 로고 배치*/}
      {/*브랜드 락업(마스코트+로고) 형태*/}
      <Logo className="w-20 h-20 block" />
      <MyTrack />
    </div>
  );
}

export default AppBrand;
