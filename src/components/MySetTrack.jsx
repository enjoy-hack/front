// import { useState } from 'react';
import useUserStore from '../stores/useUserStore';

const allTracks = [
        '인공지능 시스템', '인터랙티브 플랫폼', '메타버스 플랫폼',
        '클라우드 컴퓨팅', '데이터 인텔리전트', '지능형에이전트',
        '공간비주얼 SW', 'AI 콘텐츠'
    ];

const MySetTrack = () => {
      const studentName = useUserStore((state) => state.studentName);

    return (
        <div className="bg-white p-10 rounded-xl text-center">
            
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                {studentName}님의 관심 트랙을 선택해주세요
            </h2>
            
            <p className="text-base text-gray-500 mb-8">
                최대 4개의 트랙까지 선택 가능합니다.
            </p>

            
            <button className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors duration-200">
                선택 완료
            </button>
            
        </div>
    );
};

export default MySetTrack;