/**
 * TrackProgressHeader Storybook
 * - 업로드 없음/기본/0%/초과 100% 케이스를 시나리오별로 확인
 * - 텍스트가 흰색이므로, 가시성을 위해 배경을 브랜드 블루 계열로 감싸서 예시를 제공
 */

import React from 'react';
import TrackProgressHeader from '../features/track-management/components/TrackProgressHeader';

// 공통 래퍼: 배경(예:#0259DD) 위에서 보이도록 감싸기
const Wrapper = ({ children }) => (
  <div style={{ background: '#0259DD', padding: 16, width: 360 }}>
    {children}
  </div>
);

export default {
  title: 'Progress/TrackProgressHeader',
  component: TrackProgressHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
  argTypes: {
    completedCount: { control: 'number', description: '이수 과목 수' },
    total: { control: 'number', description: '전체 과목 수' },
    hasData: {
      control: 'boolean',
      description: '데이터 존재 여부(업로드 완료?',
    },
  },
};

// 업로드 데이터가 없을 때의 빈 상태
export const NoData = {
  args: { hasData: false },
  render: (args) => (
    <Wrapper>
      <TrackProgressHeader {...args} />
    </Wrapper>
  ),
};

// 기본 예시: 3/6 (50%)
export const Half = {
  args: { hasData: true, completedCount: 3, total: 6 },
  render: (args) => (
    <Wrapper>
      <TrackProgressHeader {...args} />
    </Wrapper>
  ),
};

// 0% 진행
export const Zero = {
  args: { hasData: true, completedCount: 0, total: 6 },
  render: (args) => (
    <Wrapper>
      <TrackProgressHeader {...args} />
    </Wrapper>
  ),
};

// 100%를 초과하는 입력(예: 8/6)도 시각적으로는 100%로 캡핑됨
export const OverComplete = {
  args: { hasData: true, completedCount: 8, total: 6 },
  render: (args) => (
    <Wrapper>
      <TrackProgressHeader {...args} />
    </Wrapper>
  ),
};

/* 개선하면 좋은점
- 0 분모 가드: const safePercent = total > 0 ? Math.min((completedCount / total) * 100, 100) : 0;처럼 방어 코드 추가
- 접근성(role): 진행 바에 role="progressbar" 및 aria-valuemin={0} aria-valuemax={total} aria-valuenow={completedCount}를 부여하면 스크린리더 접근성이 좋아짐
- 테마 토큰화: #FDB913 같은 하드코딩 색상은 디자인 토큰(예: Tailwind theme 확장)으로 관리하면 유지보수에 용이
*/
