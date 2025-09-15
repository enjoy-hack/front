/**
 * TrackStatus Storybook
 * - card / large 두 변형을 한 컴포넌트에서 미리보기
 * - large 변형은 HTML 제목을 허용(allowHtmlTitle=true)
 * - 캐릭터 클릭 액션(onClickCharacter)은 Actions 패널에서 확인
 */

import React from 'react';
import TrackStatus from '../features/track-management/components/TrackStatus';

export default {
  title: 'Brand/TrackStatus',
  component: TrackStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'app-gray', value: '#f5f5f5' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'large'],
      description: '크기/간격 변형',
    },
    title: {
      control: 'text',
      description: '제목(allowHtmlTitle=true일 때 HTML 허용)',
    },
    allowHtmlTitle: { control: 'boolean', description: '제목에 HTML 허용' },
    subtitle: { control: 'text', description: '선택적 소제목' },
    onClickCharacter: {
      action: 'character:click',
      description: '캐릭터 클릭 콜백',
    },
  },
};

// 카드형 기본: 소제목 없음
export const Card_Default = {
  args: {
    variant: 'card',
    title: '수강이력 업로드',
  },
};

/** 카드형 + 소제목 */
export const Card_WithSubtitle = {
  args: {
    variant: 'card',
    title: '수강이력 업로드',
    subtitle: '학사시스템에서 엑셀을 내려받아 업로드하세요.',
  },
};

//라지형 기본: HTML 미사용
export const Large_Default = {
  args: {
    variant: 'large',
    title: '수강이력 업로드',
    allowHtmlTitle: false,
  },
};

// 라지형 + HTML 제목 허용 (줄바꿈/강조 등)
export const Large_WithHtmlTitle = {
  args: {
    variant: 'large',
    title: '수강이력<br/>업로드',
    allowHtmlTitle: true,
  },
};

// 캐릭터 클릭 인터랙션만 테스트 (Actions에서 로그 확인)
export const ClickableCharacter = {
  args: {
    variant: 'card',
    title: '캐릭터 클릭 샘플',
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <TrackStatus
        {...args}
        onClickCharacter={() => console.log('[storybook] character clicked')}
      />
    </div>
  ),
};
