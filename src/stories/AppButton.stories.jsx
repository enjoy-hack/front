/**
 * AppButton 스토리
 * - CSF3 포맷 사용 (default export + named stories)
 * - Args/Controls/Actions를 설정하여 변형과 상호작용을 쉽게 테스트
 * - 'autodocs' 태그: 컴포넌트의 JSDoc이 있으면 Docs 탭에 자동 반영
 */

import AppButton from '../shared/components/AppButton';

export default {
  title: 'Inputs/AppButton', // 스토리북 사이드바에서의 위치 (그룹/이름)
  component: AppButton,
  tags: ['autodocs'],
  /*
   * args: 모든 스토리에 공통으로 주입되는 기본 프롭 값
   * Controls 패널에서 실시간으로 수정 가능
   */
  args: {
    label: '확인',
    variant: 'default', // 'default' | 'file' | 'track'
    disabled: false,
    isSelected: false, // 'track' variant에서만 사용
  },
  /*
   * argTypes: Controls/Actions 동작 정의
   * - variant는 select 컨트롤로 제한
   * - onClick은 Actions 패널에 로깅
   */
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'file', 'track'],
      description: "버튼 스타일 변형 ('default' | 'file' | 'track')",
    },
    isSelected: {
      control: 'boolean',
      description: 'track 변형에서 선택 토글 상태',
    },
    disabled: {
      control: 'boolean',
      description: '네이티브 비활성화',
    },
    onClick: { action: 'clicked' },
  },
  /*
   * parameters: 스토리 단위 구성(전역은 .storybook/preview.js)
   * - layout: centered → 캔버스 중앙 배치
   */
  parameters: {
    layout: 'centered',
  },
};

export const Default = {}; // 기본 버튼: 파란 배경, 흰 텍스트 (비활성화 아님)
export const File = { args: { label: '파일 선택', variant: 'file' } }; // 파일 업로드 버튼: 흰 배경, 파란 테두리/텍스트
export const Track_Unselected = {
  args: { label: '트랙', variant: 'track', isSelected: false },
}; // 트랙 토글 버튼: 흰 배경, 파란 테두리/텍스트 (선택 안됨)
export const Track_Selected = {
  args: { label: '트랙(선택)', variant: 'track', isSelected: true },
}; // 트랙 토글 버튼: 파란 배경, 흰 텍스트 (선택됨)
export const Disabled = { args: { label: '비활성', disabled: true } }; // 비활성화 버튼: 회색 배경, 흰 텍스트 (클릭 불가)
