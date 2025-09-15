import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-character2.svg?react';
import MyTrackHeader from '../../assets/mytrack-header.svg?react';
// import TrackIcon from '../../assets/track.svg?react';
// import SearchIcon from '../../assets/search.svg?react';
// import MypageIcon from '../../assets/mypage.svg?react';

function Header() {
  return (
    <header className="fixed left-0 top-0 z-20 w-full h-[60px] bg-blue-primary">
      <div className="mx-auto flex h-full max-w-[1280px] justify-between items-center px-4 md:px-8">
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
            {/* <TrackIcon className="w-6 h-6" /> */}
            <span className="inline-block text-white font-semibold hover:text-blue-light-3 hover:scale-103 transform transition-all">
              서비스 소개
            </span>
          </Link>
          {/* <Link to="/search">
            <SearchIcon className="w-6 h-6" />
          </Link> */}
          <Link to="/login">
            <span className="inline-block text-white font-semibold hover:text-blue-light-3 hover:scale-103 transform transition-all">
              로그인
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
