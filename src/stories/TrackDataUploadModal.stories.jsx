/**
 * TrackDataUploadModal Storybook
 * - 목적: UI 미리보기 및 닫기 버튼(onClose) 동작 확인
 * - 주의: 내부에서 실제 uploadStudentExcel()을 호출하므로 기본 스토리에서는 클릭을 막아둠
 *   (실제 호출을 테스트하려면 MSW/모듈 모킹 또는 DI 리팩터링 참고)
 */

import TrackDataUploadModal from '../features/track-management/components/TrackDataUploadModal';
import React from 'react';

export default {
  title: 'Modals/TrackDataUploadModal',
  component: TrackDataUploadModal,
  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
    // 배경 프리셋(대비 확인용)
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'app-gray', value: '#f5f5f5' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },

  // 닫기 버튼 동작은 Actions로 관찰
  args: {
    onClose: () => console.log('[storybook] onClose called'),
  },

  argTypes: {
    onClose: { action: 'closed', description: '모달 닫기 콜백' },
  },
};

/**
 * StaticPreview: 클릭 차단(미리보기 전용)
 * - pointer-events를 끄는 데코레이터로 내부 버튼 클릭을 억제 → 실수로 업로드 API 호출을 방지
 * - UI/레이아웃만 확인하고 싶을 때 사용
 */
export const StaticPreview = {
  render: (args) => (
    <div style={{ width: 480, pointerEvents: 'none' }}>
      <TrackDataUploadModal {...args} />
    </div>
  ),
};

/**
 * CloseButtonOnly: 닫기 버튼만 테스트(부분 허용)
 * - 닫기 버튼은 동작하도록 하고, 업로드/파일선택은 차단하고 싶다면
 *   간단한 오버레이로 클릭을 가로채는 방식도 가능(아래 예시).
 * - 실제 클릭 좌표/레이아웃에 따라 보정이 필요할 수 있으니 프로젝트 스타일에 맞춰 조정.
 */
export const CloseButtonOnly = {
  render: (args) => (
    <div style={{ position: 'relative', width: 480 }}>
      {/* 업로드 영역을 덮는 투명 오버레이(닫기 버튼 영역은 피함) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'auto',
        }}
        onClick={(e) => {
          // 닫기 버튼 주변(우상단 48x48)은 통과시키고 나머지는 막음(대략값, 필요시 CSS로 정확화)
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const allowXStart = rect.width - 56;
          const allowYEnd = 56;
          if (x >= allowXStart && y <= allowYEnd) {
            // 닫기 버튼 클릭은 통과
            e.stopPropagation();
            return;
          }
          // 기타 클릭 차단
          e.preventDefault();
          e.stopPropagation();
        }}
      />
      <TrackDataUploadModal {...args} />
    </div>
  ),
};

/**
 * (참고) 상호작용을 안전하게 테스트하려면 두 가지 중 하나를 권장:
 * 1) DI(의존성 주입)로 리팩터링
 *    - props로 uploadFn/setTrackData를 받게 하고 기본값은 실제 함수로 지정:
 *      function TrackDataUploadModal({ onClose, uploadFn = uploadStudentExcel, setTrackData = useTrackStore.getState().setTrackData }) { ... }
 *    - 스토리에서는 uploadFn/setTrackData에 목 함수를 넣어 클릭해도 네트워크/스토어를 건드리지 않음.
 *
 * 2) MSW(Mock Service Worker)로 네트워크 레이어 모킹
 *    - uploadStudentExcel 내부가 fetch/axios를 호출한다면 해당 HTTP 엔드포인트를 MSW 핸들러로 가로채기.
 *    - 스토리 파일 상단/preview.ts에서 msw-storybook-addon 설정 후, 각 스토리에 handlers를 지정.
 */
