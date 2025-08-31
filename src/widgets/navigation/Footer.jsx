import React from 'react';
import SejongIcon from '../assets/logo-sejong.svg?react';
import SwIcon from '../assets/logo-sw.svg?react';
import IitpIcon from '../assets/logo-iitp.svg?react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white text-sm mt-16">
      <div className="w-full px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        {/* 왼쪽: 연락처 및 안내 */}
        <div className="text-xs">
          <div className="space-y-0.5">
            <p className="font-semibold">세종대학교</p>
            <p>TEL: 02-3408-3114</p>
            <p>E-Mail:</p>
          </div>
          <p className="mt-6 opacity-50">
            트랙을 신청한 후 해당 트랙 이수를 완료하지 않더라도 졸업에 대한
            불이익이나 문제가 발생하지 않습니다.
          </p>
        </div>

        {/* 오른쪽: 로고 + 텍스트 */}
        <div className="flex flex-wrap gap-6 items-center">
          <Institution icon={<SejongIcon />} name="세종대학교" />
          <Institution icon={<SwIcon />} name="SW중심대학사업단" />
          <Institution icon={<IitpIcon />} name="정보통신기획평가원" />
        </div>
      </div>
    </footer>
  );
}

function Institution({ icon, name }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="w-5 h-5">{icon}</span>
      <span className="text-white text-sm">{name}</span>
    </div>
  );
}

export default Footer;
