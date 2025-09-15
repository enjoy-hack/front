import { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Character from '../../components/Character';
import { loginWithSejongPortal } from '../../features/auth/api/userService'; // 포털 API 호출 함수
import { useNavigate } from 'react-router-dom'; // 리다이렉션을 위한 훅
import useUserStore from '../../entities/user/model/useUserStore';

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const userData = await loginWithSejongPortal(id, pw);
      useUserStore.getState().setStudentId(userData.studentIdString);
      useUserStore.getState().setStudentName(userData.studentName);
      useUserStore.getState().setMajor(userData.major);
      console.log('로그인 성공:', userData);
      alert(`${userData.studentName}님 환영합니다!`);
      if (userData.hasLoginHistory) {
        useUserStore.getState().setHasLoginHistory(true);
        navigate('/home'); // 필요시 리다이렉션
      } else {
        navigate('/splash'); // 처음 로그인 시 스플래시 페이지로 이동
      }
      // localStorage.setItem('studentInfo', JSON.stringify(userData));
    } catch (err) {
      console.error(err);
      setError('포털 아이디 혹은 비밀번호가 잘못되었습니다.');
    } finally {
      setLoading(false);
    }
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
        <Character />
        <Input
          type="text"
          placeholder="학번"
          value={id}
          onChange={(val) => {
            setId(val);
            setError('');
          }}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(val) => {
            setPw(val);
            setError('');
          }}
          error={error}
        />
        <Button
          label={loading ? '로그인 중...' : '로그인'}
          onClick={handleLogin}
          disabled={!id || !pw || loading}
        />
      </div>
    </div>
  );
}

export default Login;
