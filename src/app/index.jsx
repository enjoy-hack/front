import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/home';
import TrackInfo from '../pages/info';
import NotFound from '../pages/NotFound';
import Search from '../pages/Search';
import Splash from '../pages/splash';
import Header from '../widgets/navigation/Header';
import Footer from '../widgets/navigation/Footer';
import Login from '../pages/login';
import MyPage from '../pages/my';
import UploadSection from '../components/UploadSection';

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
        <Route path="/upload" element={<UploadSection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
