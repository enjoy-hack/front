import CommonSquare from "../components/CommonSquare";
import MyTabs from "../components/MyTabs";

const MyPage = () => {
    return (
        <div className="w-full mx-auto my-8 flex justify-center">
            <div>
                <MyTabs />
                <CommonSquare> <h3>일단</h3></CommonSquare>
            </div>
        </div>
    );
}

export default MyPage;