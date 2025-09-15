/**
 * ChipButton 스토리
 * - 작은 pill 형태의 클릭 칩 UI를 다양한 색상 변형으로 확인
 * - onClick을 Actions 패널로 로깅하여 클릭 상호작용 검증
 */

import ChipButton from '../shared/components/ChipButton';

export default {
  title: 'Inputs/ChipButton', // 사이드바 그룹/이름
  component: ChipButton,
  tags: ['autodocs'],

  args: {
    label: '태그',
    variant: 'blue', // 'blue' | 'yellow'
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'yellow'],
      description: "색상 변형 ('blue' | 'yellow')",
    },
    onClick: { action: 'clicked' },
  },

  parameters: {
    layout: 'centered',
  },
};

export const Blue = {}; // 기본 파란색 칩 버튼
export const Yellow = {
  // 노란색 변형 칩 버튼
  args: {
    label: '주의',
    variant: 'yellow',
  },
};
