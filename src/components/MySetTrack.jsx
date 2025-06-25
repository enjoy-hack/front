import { useState } from 'react';
import useUserStore from '../stores/useUserStore';
import Button from './Button';
import { postUserTrack } from '../services/userTrackService';

const allTracks = [
  '인공지능 시스템',
  '인터랙티브 플랫폼',
  '메타버스 플랫폼',
  '클라우드 컴퓨팅',
  '데이터 인텔리전트',
  '지능형에이전트',
  '공간비주얼 SW',
  'AI 콘텐츠',
];

const MySetTrack = () => {
  const studentName = useUserStore((state) => state.studentName);
  const studentId = useUserStore((state) => state.studentId);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleTrack = (track) => {
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track));
    } else if (selectedTracks.length < 4) {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const isSelected = (track) => selectedTracks.includes(track);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      for (const track of selectedTracks) {
        await postUserTrack(studentId, track);
      }
      alert('관심 트랙이 저장되었습니다!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-xl text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {studentName}님의 관심 트랙을 선택해주세요
      </h2>
      <p className="text-base text-gray-500 mb-8">
        최대 4개의 트랙까지 선택 가능합니다.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {allTracks.map((track) => (
          <Button
            key={track}
            label={track}
            onClick={() => toggleTrack(track)}
            variant="track"
            isSelected={isSelected(track)}
          />
        ))}
      </div>
      <Button
        label={loading ? '저장 중...' : '선택 완료'}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default MySetTrack;
