import { BASE_URL } from '../../../shared/api/api';

export const postUserTrack = async (studentId, trackName) => {
  const response = await fetch(
    `${BASE_URL}/api/user-track?studentId=${encodeURIComponent(studentId)}&trackName=${encodeURIComponent(trackName)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '트랙 등록 실패');
  }

  return await response.json();
};
