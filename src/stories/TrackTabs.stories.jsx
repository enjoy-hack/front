/**
 * TrackTabs Storybook
 * - 스토리 내부에서 activeTab 상태를 관리하여 실제 전환을 확인
 * - 탭이 많을 때의 줄바꿈(flex-wrap) 대응도 예시로 제공
 */

import React, { useState } from 'react';
import TrackTabs from '../features/track-management/components/TrackTabs';

const TABS = [
  '인공지능시스템',
  '메타버스 플랫폼',
  '클라우드 컴퓨팅',
  '공간비주얼 SW',
  '인터렉티브 플랫폼',
  '지능형에이전트',
  'AI 콘텐츠',
  '데이터인텔리전스',
];

export default {
  title: 'Navigation/TrackTabs',
  component: TrackTabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tabs: { control: 'object', description: '탭 라벨 배열' },
    activeTab: { control: false },
    onChange: { action: 'change', description: '탭 변경 콜백' },
  },
};

// 기본 탭 전환 데모
export const Basic = {
  args: { tabs: TABS },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    return (
      <div style={{ width: 720 }}>
        <TrackTabs {...args} activeTab={activeTab} onChange={setActiveTab} />
        <div style={{ marginTop: 12, color: '#4B5563' }}>
          현재 선택된 탭: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
};

// 탭이 많은 경우: 줄바꿈/간격 확인
export const ManyTabsWrapped = {
  args: {
    tabs: [...TABS, '로보틱스', '엣지AI', '시뮬레이션', '그래프러닝'],
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.tabs[0]);
    return (
      <div style={{ width: 720 }}>
        <TrackTabs {...args} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    );
  },
};
