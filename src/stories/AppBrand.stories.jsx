/**
 * AppBrand 스토리
 * - 브랜드 락업(마스코트 + 워드마크)을 정적으로 렌더링
 * - props 없이 고정된 브랜딩 묶음을 보여주는 컴포넌트
 * - 온보딩/로그인 등 브랜드 아이덴티티 강조 화면에서 사용
 */

import AppBrand from '../shared/components/AppBrand';

export default {
  title: 'Brand/AppBrand',
  component: AppBrand,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const Default = {}; // 기본 렌더링 (프롭 없음)
