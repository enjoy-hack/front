import AppButton from '../../shared/components/AppButton';
import AppBrand from '../../shared/components/AppBrand';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../entities/user/model/useUserStore';

// 서버 없이 동작하는 데모라 세종 포털 로그인 대신 예시 사용자로 들어간다.
// 예전에는 포털 학번과 비밀번호를 백엔드로 보냈지만, 지금은 어디에도 보내지 않는다.
const DEMO_USER = {
  studentId: '데모 계정',
  studentName: '방문자',
  major: '체험 모드',
};

function Login() {
  const navigate = useNavigate();

  const handleStart = () => {
    const user = useUserStore.getState();
    user.setStudentId(DEMO_USER.studentId);
    user.setStudentName(DEMO_USER.studentName);
    user.setMajor(DEMO_USER.major);
    navigate('/splash');
  };

  return (
    <div className="flex flex-col items-center relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="
            pointer-events-none absolute left-0 bottom-0
            h-full w-full rounded-bl-[140px]
            bg-blue-primary ring-2 ring-white/20
          "
      />
      <div
        aria-hidden
        className="
            pointer-events-none absolute left-5 bottom-5
            h-full w-full rounded-bl-[140px]
            bg-blue-primary ring-2 ring-white/30
          "
      />
      <div
        aria-hidden
        className="
            pointer-events-none absolute left-10 bottom-10
            h-full w-full rounded-bl-[140px]
            bg-blue-primary ring-2 ring-white/30
          "
      />
      <div
        aria-hidden
        className="
            pointer-events-none absolute left-15 bottom-15
            h-full w-full rounded-bl-[140px]
            bg-white
          "
      />

      <div className="relative z-20 w-full max-w-sm items-center justify-center flex flex-col gap-4 min-h-[600px] my-auto">
        {/* 아이콘 + 마이트랙 로고 */}
        <AppBrand />
        <p className="text-center text-sm text-gray-600 leading-relaxed">
          세종 포털 계정 없이 체험할 수 있는 데모입니다.
          <br />
          성적 파일은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.
        </p>
        <AppButton label="체험하기" onClick={handleStart} />
      </div>
    </div>
  );
}

export default Login;
