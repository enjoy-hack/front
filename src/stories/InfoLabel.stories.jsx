/**
 * InfoLabel 스토리
 * - CSF3 포맷 사용: default export + named stories
 * - Controls에서 text를 바꿔가며 폭 고정(w-28) 내에서의 표시를 확인
 * - 레이아웃은 가운데 정렬(layout: 'centered')
 */

import InfoLabel from '../shared/components/InfoLabel';

export default {
  title: 'Display/InfoLabel', // 사이드바 그룹/이름
  component: InfoLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 스토리 캔버스 중앙 배치
    // backgrounds를 쓰면 대비 테스트가 편함(옵션)
    // backgrounds: { default: 'plain', values: [{ name: 'plain', value: '#fff' }] }
  },

  /**
   * 모든 스토리에 기본으로 주입되는 Args.
   * - text: 라벨에 들어갈 문자열
   */
  args: {
    text: '공지',
  },

  /**
   * Controls/Docs용 Arg 타입 정의
   * - text는 text 컨트롤로 노출
   */
  argTypes: {
    text: { control: 'text', description: '표시할 라벨 텍스트' },
  },
};

export const Default = {}; // 기본 사용: 짧은 텍스트를 배지 형태로 표시

/**
 * 긴 텍스트: 고정 폭(w-28) 내에서의 줄바꿈/오버플로우 거동 확인
 * - 현재 컴포넌트는 단순 텍스트 출력만 하므로,
 *   넘칠 경우 Tailwind 유틸(예: truncate, break-words 등)을 InfoLabel에 추가하는 것도 고려 가능
 */
export const LongText = {
  args: {
    text: '예비 수강신청 안내 – 반드시 공지 확인',
  },
};

/**
 * 다양한 라벨 사례 묶음
 * - 스토리 함수형 render를 통해 한 화면에서 여러 변형을 비교
 */
export const Samples = {
  render: (args) => (
    <div className="space-y-3">
      <InfoLabel {...args} text="안내" />
      <InfoLabel {...args} text="정보" />
      <InfoLabel {...args} text="중요" />
      <InfoLabel {...args} text="공지사항" />
    </div>
  ),
};
