import React, { useRef, useState } from 'react';
import TrackStatusLarge from './TrackStatusLarge';
import Chip from './Chip';
import Button from './Button';
import DeleteIcon from '../assets/delete.svg';

const UploadSection = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 relative text-center">
      {/* X 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10"
        aria-label="닫기"
      >
        <img src={DeleteIcon} alt="닫기" className="w-6 h-6" />
      </button>

      {/* 상단 캐릭터 + 제목 */}
      <TrackStatusLarge title="수강이력 업로드" />

      {/* 안내 텍스트 */}
      <div className="mt-4 text-sm text-gray-700 leading-relaxed">
        <p>학사정보시스템 사이트에 로그인합니다.</p>
        <p className="mt-1">
          왼쪽 메뉴 바에서 <Chip label="수업/성적" />{' '}
          <Chip label="성적 및 강의 평가" /> <Chip label="기이수 성적조회" /> 로
          이동합니다.
        </p>
        <p className="mt-1">
          성적 엑셀다운로드 버튼을 클릭해 다운로드한 후, 해당 엑셀 파일을
          업로드합니다.
        </p>
      </div>

      {/* 파일 선택 및 업로드 */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <input
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button label="파일 선택" onClick={handleFileClick} variant="file" />
        <Button label="업로드" onClick={() => alert('업로드 기능 준비 중')} />
        {selectedFile && (
          <p className="text-xs text-gray-500">{selectedFile.name}</p>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
