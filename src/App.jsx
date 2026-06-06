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
        background: '#FAF7F4',
      }}>
        <img src="/logo.svg" alt="로고"
          style={{ width: '52px', height: '52px', opacity: 0.75 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <p style={{ fontSize: '0.82rem', color: '#B09880' }}>잠시만 기다려 주세요...</p>
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
      <footer style={{
        padding: '40px 24px 28px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--white) 0%, var(--bg) 100%)',
        marginBottom: 'var(--nav-h)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img src="/logo.svg" alt="로고"
            style={{ width: '48px', height: '48px', objectFit: 'contain', opacity: 0.85 }}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>
        <p style={{
          fontSize: '0.92rem',
          fontWeight: '700',
          color: 'var(--text)',
          marginBottom: '6px',
          letterSpacing: '-0.3px'
        }}>
          한국기독교장로회 사랑의교회
        </p>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-sub)',
          marginBottom: '14px',
          fontWeight: '500'
        }}>
          담임목사 김윤범 | 원로목사 성양권
        </p>
        
        <div style={{
          height: '1px',
          background: 'rgba(139, 90, 43, 0.05)',
          width: '60px',
          margin: '0 auto 14px'
        }} />
        
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-hint)',
          marginBottom: '4px',
          lineHeight: '1.5'
        }}>
          <i className="fas fa-map-marker-alt" style={{ marginRight: '5px', color: 'var(--primary-lt)' }} />
          경기 부천시 원미구 장말로187번길 30
        </p>
        <p style={{
          fontSize: '0.78rem',
          color: 'var(--text-hint)',
          marginBottom: '20px',
          lineHeight: '1.5'
        }}>
          <i className="fas fa-phone-alt" style={{ marginRight: '5px', color: 'var(--primary-lt)' }} />
          032-651-1690
        </p>
        
        <p style={{
          fontSize: '0.72rem',
          color: 'var(--text-hint)',
          opacity: 0.6,
          letterSpacing: '0.2px'
        }}>
          © 2026 사랑의교회. All rights reserved.
        </p>
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
