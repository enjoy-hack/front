import TrackTabs from '../../features/track-management/components/TrackTabs';
import TrackIntroHeader from '../../features/track-management/components/TrackIntroHeader';
import { useState } from 'react';
import { TRACK_NAMES } from '../../entities/track';

const TrackInfo = () => {
  const [activeTab, setActiveTab] = useState(TRACK_NAMES[0]);

  return (
    <div className="p-8 flex justify-center min-h-[75vh] bg-white rounded-tl-[150px] rounded-br-[150px]">
      <div className="w-full max-w-[1200px] text-center">
        <div className="mb-16">
          <TrackIntroHeader />
        </div>
        <TrackTabs
          tabs={TRACK_NAMES}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default TrackInfo;
