/**
 * TrackIntroHeader Storybook
 * - Zustand store에 studentName을 주입한 뒤 렌더링
 * - 컨텐츠가 좌측 정렬 + 여백(px-4) 기준이라, 폭을 제한해 실제 페이지와 유사하게 보여줌
 */

import React from 'react';
import TrackIntroHeader from '../features/track-management/components/TrackIntroHeader';
import useUserStore from '../entities/user/model/useUserStore'; // store 접근(주입용)

// 공통 래퍼: 실제 페이지 폭을 시뮬레이션
const Wrapper = ({ children, width = 420 }) => (
  <div style={{ width, padding: 16, background: '#ffffff' }}>{children}</div>
);

export default {
  title: 'Sections/TrackIntroHero',
  component: TrackIntroHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'app-gray', value: '#f5f5f5' },
      ],
    },
  },
  // 이 컴포넌트는 프롭이 없으므로 Controls는 생략
};

/**
 * 기본 스토리: 일반 길이의 이름
 * - 스토리 렌더링 직전에 Zustand store에 studentName을 주입
 */
export const Default = {
  render: () => {
    useUserStore.setState({ studentName: '예령' }); // 개인화 이름 주입
    return (
      <Wrapper>
        <TrackIntroHeader />
      </Wrapper>
    );
  },
};

// 긴 이름 케이스: 줄바꿈/폭 대응 확인
export const LongName = {
  render: () => {
    useUserStore.setState({
      studentName: '세종대학교-인공지능융합대학-매우긴이름학생',
    });
    return (
      <Wrapper width={520}>
        <TrackIntroHeader />
      </Wrapper>
    );
  },
};

/**
 * 다크 주변 배경 대비 확인
 * - 컴포넌트 자체 배경은 없으므로, 주변 배경이 어두울 때 타이포 대비를 확인
 */
export const OnDarkBackground = {
  parameters: { backgrounds: { default: 'app-gray' } },
  render: () => {
    useUserStore.setState({ studentName: '예령' });
    return (
      <div style={{ padding: 24, background: '#111827' }}>
        <div style={{ background: '#fff', borderRadius: 12 }}>
          <Wrapper width={440}>
            <TrackIntroHeader />
          </Wrapper>
        </div>
      </div>
    );
  },
};
