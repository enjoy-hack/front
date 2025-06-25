import { Link } from 'react-router-dom';
import Logo from '../assets/logo-character2.svg?react';
import TrackIcon from '../assets/track.svg?react';
import SearchIcon from '../assets/search.svg?react';
import MypageIcon from '../assets/mypage.svg?react';

function Header() {
  return (
    <header className="w-full bg-blue-600 py-2 px-6">
      <div className="flex justify-between items-center">
        {/* 왼쪽 로고 */}
        <Logo className="w-8 h-8" />

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center gap-8">
          <TrackIcon className="w-5 h-5" />
          <SearchIcon className="w-5 h-5" />
          <MypageIcon className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}

export default Header;
