/**
 * AppTextField Storybook
 * - 컨트롤드 입력 필드라 각 스토리별로 useState로 value를 관리해야 타이핑이 반영
 * - type='password'인 경우 우측 아이콘으로 보기/숨기기 토글이 동작
 * - type='search'인 경우 우측에 검색 아이콘이 장식으로 표시
 */

import React, { useState } from 'react';
import Input from '../shared/components/AppTextField';

export default {
  title: 'Inputs/AppTextField',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'select', options: ['text', 'password', 'search'] },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    onChange: { table: { disable: true } }, // render에서 상태로 주입하므로 Controls 비활성화
  },
};

/* 기본 텍스트 입력 */
export const Text = {
  args: { type: 'text', placeholder: '학번을 입력해주세요.' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <Input {...args} value={val} onChange={setVal} />;
  },
};

/* 비밀번호 입력 + 보기/숨기기 토글 */
export const Password = {
  args: { type: 'password', placeholder: '비밀번호를 입력해주세요.' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <Input {...args} value={val} onChange={setVal} />;
  },
};

/* 검색 입력 + 우측 검색 아이콘 */
export const Search = {
  args: { type: 'search', placeholder: '과목명 검색' },
  render: (args) => {
    const [val, setVal] = useState('');
    return <Input {...args} value={val} onChange={setVal} />;
  },
};

/* 에러 메시지 표시 상태 */
export const ErrorState = {
  args: {
    type: 'text',
    placeholder: '이메일',
    error: '형식이 올바르지 않습니다.',
  },
  render: (args) => {
    const [val, setVal] = useState('wrong@format');
    return <Input {...args} value={val} onChange={setVal} />;
  },
};
