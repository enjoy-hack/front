// API 요청 관련 함수
// src/services/userService.js
import { BASE_URL } from '../../../constants/api';

export const loginWithSejongPortal = async (
  sejongPortalId,
  sejongPortalPassword
) => {
  const response = await fetch(`${BASE_URL}/api/auth/sejong/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sejongPortalId,
      sejongPortalPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '로그인 실패');
  }

  return await response.json(); // { major, studentIdString, studentName, grade, completedSemester }
};
