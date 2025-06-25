const MYTABS = [ '내 정보', '관심 트랙 설정'];

const MyTabs = ({ activeTab, setActiveTab }) => {
    return (
          <div className="flex flex-wrap justify-center gap-56 relative">
            {MYTABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-tl-xl rounded-tr-xl font-medium transition
              ${isActive
                ? "bg-[#0259DD] text-white"
                : "text-[#84AFFB] border border-[#84AFFB] hover:bg-blue-100"}
            `}
          >
            {tab}
          </button>
        );
      })}
        </div>
    );
}

export default MyTabs;