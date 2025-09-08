/**
 * AppPrimarySection 스토리
 * - Blue-Primary 배경과 하단 라운드 처리된 섹션 래퍼
 * - children을 중앙 정렬된 세로 스택으로 감싸 강조 섹션/카드 하단 띠 등에 사용
 */

import AppPrimarySection from '../shared/components/AppPrimarySection';

export default {
  title: 'Layout/AppPrimarySection',
  component: AppPrimarySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    /**
     * 배경 프리셋은 .storybook/preview.js에도 지정 가능
     * 여기서는 대비 확인을 위해 밝은 배경을 기본 사용
     */
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'app-gray', value: '#f5f5f5' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },
};

// 기본 사용: 임의의 children을 감싸 강조 섹션처럼 보여줌
export const Default = {
  args: {}, // AppPrimarySection는 일반적으로 props가 없음
  render: (args) => (
    <div className="w-[360px]">
      <AppPrimarySection {...args}>
        {/* children 예시: 타이틀/설명/버튼 등 자유 배치 */}
        <div className="text-white text-center space-y-2">
          <h3 className="text-xl font-bold">강조 섹션 제목</h3>
          <p className="opacity-90">
            브랜드 블루 배경 위에 컨텐츠를 배치합니다. 하단 모서리는 둥글게
            처리됩니다.
          </p>
        </div>
      </AppPrimarySection>
    </div>
  ),
};
