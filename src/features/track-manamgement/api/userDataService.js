// src/services/userDataService.js
import { BASE_URL } from '../../../constants/api';
import useUserStore from '../../../stores/useUserStore';

export const uploadStudentExcel = async (file) => {
  const studentId = useUserStore.getState().studentId;
  if (!studentId) throw new Error('studentId가 존재하지 않습니다');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/student-data/upload/${studentId}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '엑셀 업로드 실패');
  }

  return await response.json();
};
