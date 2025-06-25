import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Avatar from '../components/Avatar';

function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://smartair.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: id,
          password: pw,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const result = await response.json();

      // 로그인 성공 처리
      console.log('로그인 성공:', result);
      alert('로그인 성공');

      // 예: 토큰 저장 후 이동
      // localStorage.setItem("token", result.token);
      // navigate("/dashboard");
    } catch (err) {
      console.error(err); // 콘솔엔 에러 출력
      setError('학번 및 비밀번호가 일치하지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center space-y-10">
        <Avatar />
        <div className="w-full space-y-4">
          <Input
            type="text"
            placeholder="학번을 입력해주세요."
            value={id}
            onChange={(val) => {
              setId(val);
              setError('');
            }}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
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
    </div>
  );
}

export default LoginPage;
