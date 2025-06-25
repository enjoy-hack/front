import { useState } from 'react';
import CommonSquare from "../components/CommonSquare";
import MyTabs from "../components/MyTabs";
import MyInfo from "../components/MyInfo";
import MySetTrack from "../components/MySetTrack";

const MyPage = () => {
    const [activeTab, setActiveTab] = useState('내 정보');

    return (
        <div className="w-full mx-auto my-8 flex justify-center">
            <div>
                <MyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <CommonSquare>
                    {activeTab === '내 정보' ? <MyInfo /> : <MySetTrack />}
                </CommonSquare>
            </div>
        </div>
    );
};

export default MyPage;