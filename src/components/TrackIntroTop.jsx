import TrackIcon from '../assets/logo-character.svg?react'; // 일러스트 svg
import useUserStore from '../entities/user/model/useUserStore';

function TrackIntroTop() {
  const studentName = useUserStore((state) => state.studentName);

  return (
    <div className="text-left px-4">
      {/* 일러스트 */}
      <div className="w-24 h-24 mb-6">
        <TrackIcon className="w-full h-full" />
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-semibold text-blue-600 mb-6">
        안녕하세요! {studentName}님
        <br />
        ‘트랙제’에 대해 알아볼까요?
      </h1>

      {/* 설명 */}
      <p className="text-sm text-[#A0A0A0] leading-relaxed">
        전공 트랙 제도는 인공지능융합대학 소속 세 학과(컴퓨터공학과,
        콘텐츠소프트웨어학과, 인공지능데이터사이언스학과)의 학생들이 자신이
        원하는 전문 분야를 중심으로 학업을 설계하고 이수할 수 있도록 돕는{' '}
        <span className="text-blue-600 font-medium">
          맞춤형 진로 설계 시스템
        </span>
        입니다. 학생들은 각자의 관심 분야에 따라 하나 이상의 트랙을 자유롭게
        선택할 수 있으며, 해당 트랙에 포함된 과목을 6과목 이상 이수하면 트랙
        인증을 받을 수 있습니다. 이 인증은 학생의 전문성과 학습 방향성을
        보여주는 지표로, 졸업 후 진로 탐색이나 대학원 진학, 기업 취업 등에
        실질적인 도움이 될 수 있습니다. 트랙을 선택한다고 해서 반드시 해당
        트랙을 이수해야 하는 것은 아니며, 중도 변경이나 이수 포기에도 졸업
        요건에 불이익은 없습니다. 학생의 학습 자율성과 유연성을 보장하는
        방향으로 운영됩니다.
      </p>
    </div>
  );
}

export default TrackIntroTop;
