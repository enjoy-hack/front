import { Link } from 'react-router-dom';
import Logo from '../assets/logo-character2.svg?react';
import MyTrackHeader from '../assets/mytrack-header.svg?react';
import TrackIcon from '../assets/track.svg?react';
import SearchIcon from '../assets/search.svg?react';
import MypageIcon from '../assets/mypage.svg?react';

function Header() {
  return (
    <header className="w-full h-[70px] bg-blue-600 px-6 flex items-center">
      <div className="w-full flex justify-between items-center">
        {/* 왼쪽 로고 */}
        <Link to="/home">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 block" />
            <MyTrackHeader className="h-6" />
          </div>
        </Link>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center gap-8">
          <Link to="/track">
            <TrackIcon className="w-6 h-6" />
          </Link>
          <Link to="/search">
            <SearchIcon className="w-6 h-6" />
          </Link>
          <Link to="/mypage">
            <MypageIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
