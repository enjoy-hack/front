import { useRef, useState } from 'react'; // 파일 입력 제어, 상태 관리
import TrackStatus from './TrackStatus'; // 상단 타이틀, 캐릭터
import Chip from '../../../shared/components/ChipButton'; // 안내 텍스트 내 강조용 칩
import Button from '../../../shared/components/AppButton'; // 파일 선택 및 업로드 버튼
import DeleteIcon from '../../../assets/delete.svg'; // 닫기 아이콘
import { uploadStudentExcel } from '../api/userDataService'; // 엑셀 업로드 API
import useTrackStore from '../../../entities/course/model/useTrackStore'; // 전역 상태 관리

/**
 * TrackDataUploadModal: 학사시스템에서 내려받은 수강이력 엑셀(.xlsx)을 업로드하는 모달.
 * 파일 선택 → 업로드 API 호출 → 전역 스토어에 반영 후 모달을 닫는 흐름을 제공한다.
 * onClose 콜백으로 외부에서 모달 닫기 동작을 제어한다.
 */

const TrackDataUploadModal = ({ onClose }) => {
  // onClose: 모달 닫기 함수
  const fileInputRef = useRef(null); // 숨겨진 <input type="file" />를 클릭시키기 위한 ref)
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일 선택 창 열기(파일 선택 버튼)
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 처리(파일 변경): 첫 번째 선택 파일을 selectedFile에 저장(존재 시에만)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // 파일 업로드 처리
  const handleUpload = async () => {
    if (!selectedFile) {
      // 파일이 선택되지 않은 경우
      alert('엑셀 파일을 먼저 선택해주세요.');
      return;
    }

    try {
      const result = await uploadStudentExcel(selectedFile); // 업로드 API 호출(비동기)
      console.log(result);
      useTrackStore.getState().setTrackData(result); // 전역 상태에 업로드 결과 저장
      alert('업로드 성공!');
      onClose(); // 업로드 완료 후 모달 닫기
    } catch (err) {
      alert(`업로드 실패: ${err.message}`); // 업로드 실패 시 에러 메시지 표시
    }
  };

  return (
    // 카드형 모달 컨테이너 (가로 최대 크기 제한, 흰색 배경, 둥근 모서리, 그림자, 패딩, 중앙 정렬)
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 relative text-center">
      {/* X 버튼 */}
      <button
        onClick={onClose} // 클릭 시 모달 닫기
        className="absolute top-4 right-4 z-10" // 절대 위치, 우측 상단 배치
        aria-label="닫기"
      >
        <img src={DeleteIcon} alt="닫기" className="w-6 h-6" />{' '}
        {/* 아이콘 이미지 */}
      </button>

      {/* 상단 캐릭터 + 제목 */}
      <TrackStatus variant="large" title="수강이력 업로드" />

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
        {' '}
        {/* 세로 방향, 중앙 정렬, 요소 간격 */}
        <input // 숨겨진 파일 입력 및 액션
          type="file"
          accept=".xlsx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button label="파일 선택" onClick={handleFileClick} variant="file" />
        <Button label="업로드" onClick={handleUpload} />
        {selectedFile && (
          <p className="text-xs text-gray-500">{selectedFile.name}</p>
        )}
      </div>
    </div>
  );
};

export default TrackDataUploadModal;
