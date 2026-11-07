import { useState, useEffect, Suspense, lazy } from 'react';
import { StoreProvider, useStore } from './data/StoreContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

import Home from './components/Home';
import Announcements from './components/Announcements';
import Bulletin from './components/Bulletin';
import ChurchInfo from './components/ChurchInfo';
import ServiceInfo from './components/ServiceInfo';
import Location from './components/Location';
import Offering from './components/Offering';
import Congregation from './components/Congregation';
import MenuPage from './components/MenuPage';
import Media from './components/Media';

const Admin = lazy(() => import('./components/Admin'));

const Spinner = () => (
  <div style={{
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '40vh', color: 'var(--text-hint)', fontSize: '0.85rem',
  }}>
    <i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px' }} />
    불러오는 중...
  </div>
);

function AppInner() {
  const { loading } = useStore();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId) => {
    window.location.hash = pageId;
    setCurrentPage(pageId);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '14px',
        background: 'var(--bg)',
      }}>
        <img src="/logo.svg" alt="로고"
          style={{ width: '52px', height: '52px', opacity: 0.75 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-hint)' }}>잠시만 기다려 주세요...</p>
      </div>
    );
  }

  const isAdmin = currentPage === 'admin';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':          return <Home navigateTo={navigateTo} />;
      case 'announcements': return <Announcements />;
      case 'bulletin':      return <Bulletin />;
      case 'info':          return <ChurchInfo />;
      case 'service':       return <ServiceInfo />;
      case 'location':      return <Location />;
      case 'offering':      return <Offering />;
      case 'congregation':  return <Congregation />;
      case 'media':         return <Media />;
      case 'menu':          return <MenuPage navigateTo={navigateTo} />;
      case 'admin':         return <Admin navigateTo={navigateTo} />;
      default:              return <Home navigateTo={navigateTo} />;
    }
  };

  if (isAdmin) {
    return (
      <main style={{ flex: 1 }}>
        <Suspense fallback={<Spinner />}>{renderPage()}</Suspense>
      </main>
    );
  }

  return (
    <>
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        <Suspense fallback={<Spinner />}>{renderPage()}</Suspense>
      </main>
      <footer className="app-footer">
        <img className="footer-logo" src="/logo.svg" alt="한국기독교장로회 로고"
          onError={e => { e.target.style.display = 'none'; }} />
        <p className="footer-name">한국기독교장로회 사랑의교회</p>
        <p className="footer-pastors">담임목사 김윤범 · 원로목사 성양권</p>
        <div className="footer-contact">
          <span><i className="fas fa-map-marker-alt" />경기 부천시 원미구 장말로187번길 30</span>
          <a href="tel:032-651-1690"><i className="fas fa-phone-alt" />032-651-1690</a>
        </div>
        <p className="footer-copy">© 2026 사랑의교회. All rights reserved.</p>
        <button className="footer-admin" onClick={() => navigateTo('admin')}>관리자</button>
      </footer>
      <BottomNav current={currentPage} navigateTo={navigateTo} />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  );
}
