/**
 * TrackInitButton Storybook
 * - 클릭 액션과 비활성화 상태를 빠르게 검증하기 위한 스토리
 * - 컴포넌트 라벨이 하드코딩되어 있으므로 Controls에는 disabled만 노출
 */

import React from 'react';
import TrackInit from '../features/track-management/components/TrackInitButton';

export default {
  title: 'Buttons/TrackInitButton',
  component: TrackInit,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean', description: '비활성화 여부' },
    onClick: { action: 'clicked', description: '클릭 핸들러' },
  },
};

// 기본 상태: 클릭 시 Actions 패널에 로그가 남음
export const Default = {};

// 비활성화 상태: 시각적/기능적으로 클릭 불가
export const Disabled = {
  args: { disabled: true },
};
