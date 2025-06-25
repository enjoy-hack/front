import AiEngineer from '../assets/ai_engineer.svg?react';
import MlDlModel from '../assets/ml_dl_model.svg?react';
import NlpResearcher from '../assets/nlp_researcher.svg?react';
import SmartSystem from '../assets/smart_system.svg?react';

const InfoList = () => {
  return (
    <div className="bg-blue-600 rounded-bl-lg rounded-br-lg p-10 flex flex-col gap-8 items-start text-left text-white -mt-1 z-0 relative">
      {/* 트랙 설명 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-yellow-400 text-lg font-semibold">
          인공지능 시스템 트랙이란?
        </h3>
        <p className="leading-relaxed">
          인공지능 시스템 트랙은 컴퓨터공학과의 트랙으로 인공지능의 핵심 기술과
          이를 실제 시스템에 적용하는 방법을 배우는 트랙입니다. 이 트랙은 지능형
          소프트웨어와 시스템을 설계하고 구현할 수 있는 역량을 갖춘 인재 양성을
          목표로 하며, AI 기술을 기반으로 한 문제 해결력과 응용력 함양에 중점을
          둡니다. 학습 내용은 머신러닝, 딥러닝, 자연어처리, 강화학습, 인공지능
          시스템 설계, 지능형 앱 개발 등입니다. 통합적 사고와 개발 능력을 키울
          수 있는 트랙입니다.
        </p>
      </div>

      {/* 진로 설명 */}
      <div className="flex flex-col gap-2">
        <h3 className="text-orange-300 text-lg font-semibold">
          해당 트랙과 관련된 진로
        </h3>
        <p className="leading-relaxed">
          해당 트랙을 이수하면 AI 기반 서비스 기획, 지능형 시스템 개발, AI
          플랫폼 구축 등 산업 전반의 다양한 분야에서의 진출 가능성을 높일 수
          있으며, 대학원에서의 연구 역량 향상에도 도움이 됩니다.
        </p>
      </div>

      {/* SVG 그룹 */}
      <div className="w-full flex flex-row justify-between mt-6 px-10">
        <div className="flex flex-col items-center gap-2">
          <AiEngineer className="w-28 h-28" />
          <p className="text-white text-sm"></p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MlDlModel className="w-28 h-28" />
          <p className="text-white text-sm text-center leading-tight"></p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NlpResearcher className="w-28 h-28" />
          <p className="text-white text-sm"></p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SmartSystem className="w-28 h-28" />
          <p className="text-white text-sm"></p>
        </div>
      </div>
    </div>
  );
};

export default InfoList;
