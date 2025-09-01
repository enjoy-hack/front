import InfoLabel from './InfoLabel';
import Chip from './Chip';
import useUserStore from '../entities/user/model/useUserStore';

const MyInfo = () => {
  const studentName = useUserStore((state) => state.studentName);
  const studentId = useUserStore((state) => state.studentId);
  const studentMajor = useUserStore((state) => state.studentMajor);
  // const studentTrack = useUserStore((state) => state.studentTrack);
  // const studentCompleted = useUserStore((state) => state.studentCompleted);

  return (
    <div className="bg-white p-10 rounded-xl max-w-4xl w-full mx-auto">
      <div className="flex gap-8 items-start justify-center">
        {/* 왼쪽: InfoLabel */}
        <div className="flex flex-col gap-4">
          <InfoLabel text="이름" />
          <InfoLabel text="학번" />
          <InfoLabel text="학과" />
          {/* <InfoLabel text="관심 트랙" />
          <InfoLabel text="이수 완료" /> */}
        </div>

        {/* 오른쪽: 텍스트 + Chip */}
        <div className="flex flex-col gap-7 text-base text-left pt-1">
          <div className="pt-1">{studentName}</div>
          <div className="pt-1">{studentId}</div>
          <div className="pt-1">{studentMajor}</div>
          {/* <div className="flex gap-1">
            <Chip label={studentTrack} />
          </div>
          <div className="flex gap-1">
            <Chip label={studentCompleted} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
