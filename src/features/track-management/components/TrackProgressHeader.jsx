/**
 * TrackProgressHeader: 트랙 이수 현황을 요약하는 헤더 블록
 * 업로드가 없으면 안내 문구를, 있으면 완료/전체와 진행률 바를 표시
 * 진행률은 최대 100%로 캡핑되며, completedCount/total 형식으로 함께 보여줌
 */

const TrackProgressHeader = ({
  completedCount = 0,
  total = 6,
  hasData = true,
}) => {
  // 기본값 설정: 이수 과목 수, 전체 과목 수, 업로드 여부
  // 진행률 계산 후 100% 초과 방지 (total이 0일 경우 NaN 가능 -> 가드 권장)
  const percent = Math.min((completedCount / total) * 100, 100);
  // 우측에 표시될 완료/전체 형식 문자열
  const displayProgress = `${completedCount}/${total}`;

  // 업로드 데이터가 없을 경우 안내 메시지 표시
  if (!hasData) {
    return (
      <div className="w-full mb-4">
        <p className="text-white text-sm">
          수강이력을 업로드하여 달성률을 확인해보세요
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      {' '}
      {/* 정상 상태 UI 컨테이너: 상단 라인은 좌우 분할*/}
      <div className="flex justify-between items-center mb-2">
        <p className="text-white text-sm">총 {completedCount}과목 이수 완료!</p>
        <span className="text-white text-sm">{displayProgress}</span>
      </div>
      {/* 진행률 바 컨테이너: 흰색 배경에 노란색 진행률 표시 */}
      <div className="relative w-full h-2 bg-white rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#FDB913] rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default TrackProgressHeader;
