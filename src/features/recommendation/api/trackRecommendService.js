import { BASE_URL } from '../../../shared/api/api';

export const getRecommendTrackByProgress = async (studentId) => {
  const response = await fetch(
    `${BASE_URL}/api/tracks/recommendations/progress?studentId=${encodeURIComponent(studentId)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '진척률 기반 트랙 추천 실패');
  }

  return await response.json();
};

export const getRecommendTrackByInterest = async (studentId) => {
  const response = await fetch(
    `${BASE_URL}/api/tracks/recommendations/preferred-courses?studentId=${encodeURIComponent(studentId)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '관심 과목 기반 트랙 추천 실패');
  }

  return await response.json();
};