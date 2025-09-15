/** @type { import('@storybook/react-vite').Preview } */

// 전역 스타일: Tailwind나 앱 공통 CSS를 스토리북에도 적용
import '../src/index.css';

const preview = {
  parameters: {
    layout: 'centered', // 스토리북 미리보기 영역 중앙 정렬 (컴포넌트 확인 편함)
    // Controls 패널에서 color/date 인풋을 자동 매핑
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // 접근성 테스트 설정 (현재: UI에서만 표시)
    a11y: {
      // 'todo' - 테스트 UI에만 표시
      // 'error' - CI에서 에러로 처리
      // 'warn' - CI에서 경고로 처리
      // 'off' - 테스트 비활성화
      test: 'todo',
    },

    // 배경 프리셋(선택): 컴포넌트 대비 확인용
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: '#ffffff' },
        { name: 'app-gray', value: '#f5f5f5' },
        { name: 'dark', value: '#1f2937' },
      ],
    },
  },

  // 전역 데코레이터가 필요하면 여기에 추가 (예: 테마 Provider, Router 등)
  // decorators: [
  //   (Story) => (<ThemeProvider><Story /></ThemeProvider>)
  // ],
};

export default preview;
