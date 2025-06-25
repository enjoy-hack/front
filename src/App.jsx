import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ['/Login'];
  const shouldHideHeaderFooter = hiddenRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
