// 2025-09 FSD 리팩터링 때 지워진 src/components/MySetTrack.jsx 를 복구했다.
// 바뀐 점: 서버(POST /api/user-track) 대신 사용자 스토어(studentTrack)에 저장하고,
// 트랙 이름은 하드코딩 목록('인공지능 시스템', '데이터 인텔리전트' 등 실제 이름과 달랐음) 대신 트랙 데이터에서 가져온다.
import { useState } from 'react';
import useUserStore from '../../../entities/user/model/useUserStore';
import AppButton from '../../../shared/components/AppButton';
import { TRACK_NAMES } from '../../../entities/track';

const MAX_TRACKS = 4;

const MySetTrack = () => {
  const studentName = useUserStore((state) => state.studentName);
  const savedTracks = useUserStore((state) => state.studentTrack);
  const [selectedTracks, setSelectedTracks] = useState(savedTracks ?? []);

  const toggleTrack = (track) => {
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track));
    } else if (selectedTracks.length < MAX_TRACKS) {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleSubmit = () => {
    useUserStore.getState().setTrack(selectedTracks);
    alert('관심 트랙이 저장되었습니다!');
  };

  return (
    <div className="bg-white p-10 rounded-xl text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {studentName}님의 관심 트랙을 선택해주세요
      </h2>
      <p className="text-base text-gray-500 mb-8">
        최대 {MAX_TRACKS}개의 트랙까지 선택 가능합니다.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {TRACK_NAMES.map((track) => (
          <AppButton
            key={track}
            label={track}
            onClick={() => toggleTrack(track)}
            variant="track"
            isSelected={selectedTracks.includes(track)}
          />
        ))}
      </div>
      <AppButton label="선택 완료" onClick={handleSubmit} />
    </div>
  );
};

export default MySetTrack;
