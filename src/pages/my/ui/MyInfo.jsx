// 2025-09 FSD 리팩터링 때 지워진 src/components/MyInfo.jsx 를 복구했다.
import InfoLabel from '../../../shared/components/InfoLabel';
import useUserStore from '../../../entities/user/model/useUserStore';

const MyInfo = () => {
  const studentName = useUserStore((state) => state.studentName);
  const studentId = useUserStore((state) => state.studentId);
  const studentMajor = useUserStore((state) => state.studentMajor);

  return (
    <div className="bg-white p-10 rounded-xl max-w-4xl w-full mx-auto">
      <div className="flex gap-8 items-start justify-center">
        <div className="flex flex-col gap-4">
          <InfoLabel text="이름" />
          <InfoLabel text="학번" />
          <InfoLabel text="학과" />
        </div>

        <div className="flex flex-col gap-7 text-base text-left pt-1">
          <div className="pt-1">{studentName}</div>
          <div className="pt-1">{studentId}</div>
          <div className="pt-1">{studentMajor}</div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
