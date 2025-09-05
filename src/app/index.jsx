// 전역 컨텍스트 및 상태 관리 설정 (라우팅, 인증 등)

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Header from '../widgets/navigation/Header';
import Footer from '../widgets/navigation/Footer';

import Home from '../pages/home';
import TrackInfo from '../pages/info';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import Splash from '../pages/splash';
import Login from '../pages/login';
import MyPage from '../pages/my';
import TrackDataUploadModal from '../features/track-management/components/TrackDataUploadModal';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ['/login', '/splash'];
  const shouldHideHeaderFooter = hiddenRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-blue-primary">
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/track" element={<TrackInfo />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/upload" element={<TrackDataUploadModal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
