import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import TrackInfo from './pages/TrackInfo';
import NotFound from './pages/NotFound';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Splash from './pages/Splash';

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/track" element={<TrackInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
