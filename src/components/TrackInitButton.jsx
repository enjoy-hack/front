const TrackInit = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#0259DD] text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      사용자님께 알맞는 트랙을 알아볼까요?
    </button>
  );
};

export default TrackInit;
