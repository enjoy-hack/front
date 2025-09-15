/**
 * CourseRow 스토리 (CSF3)
 * - 리스트/표 행으로 쓰이는 CourseRow을 다양한 상태로 미리보기
 * - Controls 패널에서 프롭을 즉시 조절하여 UI 변화를 확인
 * - 'status'는 컴포넌트 내부에서 '이수'만 색상 분기(파랑)이고, 나머지는 회색 처리됨
 */

import CourseRow from '../features/track-management/components/CourseRow';

export default {
  title: 'Lists/CourseRow', // 사이드바 그룹/이름
  component: CourseRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 캔버스 중앙 배치
    // 필요 시 배경 프리셋도 추가 가능
    // backgrounds: { default: 'plain', values: [{ name: 'plain', value: '#fff' }] }
  },
  /**
   * 모든 스토리에 공통으로 주입되는 기본 값
   */
  args: {
    name: '자료구조',
    year: 2025,
    semester: '1',
    code: 'CSE123',
    status: '이수',
  },
  /**
   * Controls/Docs용 메타.
   * - status는 선택형으로 노출 (분기 로직은 '이수'만 파란색)
   */
  argTypes: {
    name: { control: 'text', description: '과목명' },
    year: { control: 'number', description: '개설 연도' },
    semester: { control: 'text', description: '학기 (예: 1, 2, 여름)' },
    code: { control: 'text', description: '교과목 코드' },
    status: {
      control: 'select',
      options: ['이수', '수강중', '미이수'],
      description: "이수 상태 (컴포넌트는 '이수'일 때 파란색 배경으로 강조)",
    },
  },
};

export const Completed = {}; // 기본(이수) 상태 - 파란색 상태 뱃지로 강조

// 수강중 — 상태 뱃지가 회색으로 표시됨
export const InProgress = {
  args: { status: '수강중' },
};

// 미이수 — 상태 뱃지가 회색으로 표시됨
export const NotCompleted = {
  args: { status: '미이수' },
};

/**
 * 긴 과목명/코드 등 엣지 케이스 확인
 * - 컨테이너가 줄바꿈 없이 어느 정도까지 버티는지 확인하려면 name/code를 길게 주입
 */
export const LongText = {
  args: {
    name: '컴퓨터공학특강: 대규모소프트웨어설계와아키텍처패턴심화세미나',
    code: 'CSE-2025-ADV-ARCH-LONG-CODE-001',
    status: '이수',
  },
};
// status를 문자열 대신 열거형(예: 'completed' | 'inProgress' | 'failed')으로 받고,
// 화면 표시 텍스트/색상은 내부 매핑으로 관리하면 다국어/디자인 변경에 유연
