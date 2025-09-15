import { useState } from 'react'; // 함수형 컴포넌트에서 로컬 상태를 쓰기 위해 useState 훅을 임포트
import { Eye, EyeOff, Search } from 'lucide-react'; // lucide-react에서 아이콘을 임포트

/**
 * AppTextField: 프로젝트 공용 스타일의 컨트롤드 입력 필드
 * type='text' | 'password' | 'search'를 지원하며, 비밀번호 보기 토글과 에러 메시지 표시를 제공
 * value/onChange로 외부 상태를 제어하고, 접근성 강화를 위해 aria-* 속성 추가를 권장
 */

// 프롭으로 타입, 플레이스홀더, 값, 변경 핸들러, 에러 메시지를 받음
// 기본 타입은 'text'로 설정
function AppTextField({ type = 'text', placeholder, value, onChange, error }) {
  // 비밀번호 표시 토글 상태 (초기값 false 숨김)
  const [showPassword, setShowPassword] = useState(false);
  // 입력 타입이 'password'인지 'search'인지 확인
  const isPassword = type === 'password';
  const isSearch = type === 'search';

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          // 비밀번호+숨김일 때만 'password' 타입, 아니면 'text' 타입
          // (⇒ type='search'나 email도 text로 강제되는 점은 개선 여지)
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)} // 상위에서 관리하는 값만 바구는 컨트롤드 패턴
          // 클래스: 전체 너비, 패딩, 테두리, 둥근 모서리, 포커스 시 테두리/링 효과
          className={`
            w-full px-4 py-3 border rounded-md outline-none transition
            border-[#DFDFDF] focus:outline-none focus:ring-0 focus:border-blue-light-1
          `}
        />
        {/* 비밀번호 토글 아이콘 */}
        {isPassword && (
          <div
            className="absolute right-3 top-3 cursor-pointer" // 우측 상단에 위치, 클릭 가능
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* showPassword 상태에 따라 Eye/EyeOff 토글 */}
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        )}
        {/* 검색 아이콘 (비활성화된 상태로 표시) */}
        {isSearch && (
          <div className="absolute right-3 top-3 pointer-events-none">
            {' '}
            {/* 우측 상단에 위치, 클릭 불가 */}
            <Search size={20} />
          </div>
        )}
      </div>
      {/* 에러 메시지 (error 프롭이 존재할 때만 표시) */}
      {/* 입력 하단에 빨간색 라벨로 에러 메시지 표시 */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default AppTextField;
