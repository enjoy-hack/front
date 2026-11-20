// 2025-09 FSD 리팩터링 때 src/components/MyTabs.jsx 가 지워지면서 마이페이지가 깨졌다. 원래 코드를 복구했다.
import { MY_TABS } from '../model/tabs';

const MyTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap justify-center gap-56 relative">
      {MY_TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-tl-xl rounded-tr-xl font-medium transition
              ${
                isActive
                  ? 'bg-[#0259DD] text-white'
                  : 'text-[#84AFFB] border border-[#84AFFB] hover:bg-blue-100'
              }
            `}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default MyTabs;
