import React from 'react';
import LogoCharacter from '../../../assets/logo-character.svg?react';

/**
 * TrackStatus: 캐릭터 + 제목(+선택적 소제목) 헤더 블록
 * variant='card'|'large'로 크기/간격을 전환하고, 필요 시 onClickCharacter로 캐릭터 클릭을 허용
 * title에 HTML을 써야 하면 allowHtmlTitle=true로 설정
 */

function TrackStatus({
  variant = 'card',
  title,
  subtitle,
  onClickCharacter,
  allowHtmlTitle = false,
}) {
  // 프롭 정의: 두 컴포넌트의 차이(크기/HTML지원/소제목)를 속성으로 통합
  const isLarge = variant === 'large'; // 크기 분기
  const characterClasses = isLarge ? 'w-40 h-auto' : 'w-28 h-auto'; // 캐릭터 크기 매핑(large: w-40, card: w-28)
  const titleClasses = isLarge // 제목 타이포, 마진 매핑
    ? 'text-2xl font-semibold text-blue-600 mb-2 leading-relaxed'
    : 'text-xl font-semibold text-blue-600 mt-16 mb-8';

  return (
    // 공통 레이아웃
    <div className="text-center">
      {/* 캐릭터 */}
      <div className={`flex justify-center ${isLarge ? 'mb-4' : 'mb-8'}`}>
        {onClickCharacter ? ( // 클릭 가능 여부에 따라 button으로 감싸기
          <button
            type="button"
            onClick={onClickCharacter}
            aria-label="캐릭터 클릭"
          >
            <LogoCharacter className={characterClasses} />{' '}
            {/* 크기 클래스 적용 */}
          </button>
        ) : (
          <LogoCharacter className={characterClasses} /> // 단순 표시(비인터랙션)
        )}
      </div>

      {/* 제목 */}
      {title && // 제목이 있을 때만 렌더
        (allowHtmlTitle ? ( // HTML 허용 시 dangerouslySetInnerHTML 사용 (원래 Large가 HTML 허용하던 동작 이식)
          <h2
            className={titleClasses}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : (
          <h2 className={titleClasses}>{title}</h2> // 일반 텍스트 제목
        ))}

      {/* 소제목(옵션) */}
      {/* subtitle이 있을 때만 렌더, large일 땐 색상과 마진 다르게 */}
      {subtitle && (
        <p
          className={`text-sm ${isLarge ? 'text-blue-500 mt-2' : 'text-blue-400'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default TrackStatus;
