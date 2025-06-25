import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12 bg-white text-[#333]">
      {/* 상단 */}
      <div className="flex flex-col items-center">
        {/* <BotLogo className="w-16 h-16 mb-2" /> */}
        <p className="text-sm text-[#4290F5]">사용자님 반갑습니다! 무엇이든 물어보세요</p>
      </div>

      {/* 검색창 */}
      <div className="flex flex-col items-center mt-10 w-full max-w-xl px-4">
        <div className="flex w-full items-center border border-blue-300 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm placeholder:text-gray-400"
          />
          {/* <FiSearch className="text-blue-400 w-5 h-5" /> */}
        </div>

        {/* 필터 버튼 */}
        <button className="mt-4 flex items-center gap-1 px-3 py-1.5 border border-blue-300 text-blue-400 rounded-md text-sm hover:bg-blue-50">
          {/* <FiSliders className="w-4 h-4" /> */}
        </button>
      </div>

      {/* 최근 검색어 */}
      <div className="text-sm text-gray-400 mt-20">최근검색어가 없습니다.</div>

      {/* 하단 문구 */}
      <footer className="text-blue-600 text-sm mt-auto mb-4">
        당신의 진로를 향한 질주를 응원합니다
      </footer>
    </div>
  );
};

export default Search;
