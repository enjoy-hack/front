/**
 * TrackCourseList Storybook
 * - 전역 store(useTrackStore)에 가짜 trackData를 주입하고 다양한 상태를 시연
 * - 'NoData'는 활성 트랙과 일치하는 데이터가 없을 때의 빈 상태를 보여줌
 * - 'WithData'는 활성 트랙에 대한 데이터가 있을 때의 정상 상태를 보여줌
 */

import React from 'react';
import CourseList from '../features/track-management/components/TrackCourseList';
import useTrackStore from '../entities/course/model/useTrackStore';

const seed = () => {
  useTrackStore.setState({
    trackData: [
      {
        trackName: '인공지능시스템',
        completedCourses: [
          {
            courseName: '인공지능개론',
            academicYear: 2024,
            academicSemester: '1',
            courseCode: 'AI101',
          },
          {
            courseName: '머신러닝',
            academicYear: 2024,
            academicSemester: '2',
            courseCode: 'AI201',
          },
          {
            courseName: '딥러닝',
            academicYear: 2025,
            academicSemester: '1',
            courseCode: 'AI301',
          },
        ],
        remainingCourses: [
          {
            courseName: '강화학습',
            academicYear: 2025,
            academicSemester: '2',
            courseCode: 'AI401',
          },
          {
            courseName: '컴퓨터비전',
            academicYear: 2025,
            academicSemester: '2',
            courseCode: 'AI402',
          },
          {
            courseName: '자연어처리',
            academicYear: 2025,
            academicSemester: '2',
            courseCode: 'AI403',
          },
        ],
      },
    ],
  });
};

export default {
  title: 'Sections/TrackCourseList',
  component: CourseList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'plain',
      values: [{ name: 'plain', value: '#fff' }],
    },
  },
  argTypes: {
    activeTrack: { control: 'text', description: '현재 활성 트랙명' },
  },
};

// 데이터가 있을 때(헤더 + 과목리스트가 렌더링됨)
export const WithData = {
  args: { activeTrack: '인공지능시스템' },
  render: (args) => {
    seed();
    return (
      <div style={{ width: 720 }}>
        <CourseList {...args} />
      </div>
    );
  },
};

// 일치하는 트랙 데이터가 없을 때의 빈 상태
export const NoData = {
  args: { activeTrack: '클라우드 컴퓨팅' },
  render: (args) => {
    seed();
    return (
      <div style={{ width: 720 }}>
        <CourseList {...args} />
      </div>
    );
  },
};
