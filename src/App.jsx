import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import TrackInfo from './pages/TrackInfo';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Splash from './pages/Splash';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Login from './pages/Login';
import MyPage from './pages/My';
import UploadSection from './components/UploadSection';

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
    <div className="flex flex-col min-h-screen">
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/splash" element={<Splash />} /> */}
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
