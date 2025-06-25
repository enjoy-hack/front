const TrackHeader = ({ completedCount = 0, total = 6, hasData = true }) => {
  const percent = Math.min((completedCount / total) * 100, 100);
  const displayProgress = `${completedCount}/${total}`;

  if (!hasData) {
    return (
      <div className="w-full mb-4">
        <p className="text-white text-sm">수강이력을 업로드하여 달성률을 확인해보세요</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-white text-sm">총 {completedCount}과목 이수 완료!</p>
        <span className="text-white text-sm">{displayProgress}</span>
      </div>
      <div className="relative w-full h-2 bg-white rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#FDB913] rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default TrackHeader;
