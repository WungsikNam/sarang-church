import { useStore } from '../data/StoreContext';

const menuItems = [
  { id: 'info',          icon: 'fas fa-church',         label: '교회안내' },
  { id: 'service',       icon: 'fas fa-calendar-alt',   label: '예배안내' },
  { id: 'location',      icon: 'fas fa-map-marker-alt', label: '오시는 길' },
  { id: 'announcements', icon: 'fas fa-bullhorn',       label: '공지사항' },
  { id: 'congregation',  icon: 'fas fa-users',          label: '신도회' },
  { id: 'bulletin',      icon: 'fas fa-book-open',      label: '주보' },
];

const Home = ({ navigateTo }) => {
  const { store } = useStore();
  const recent = (store.announcements ?? []).slice(0, 3);
  const hero = store.hero;
  const formatDate = (raw) => raw ? raw.replace(/-/g, '.') : '';

  return (
    <div id="home" className="page">
      <div className="hero">
        <img src="/hero.png" alt="사랑의 교회" />
        <div className="hero-overlay">
          <h2>{hero.title}</h2>
          <p>{hero.subtitle}</p>
        </div>
      </div>

      <a
        href="https://youtube.com/channel/UCdKQePmQrykA5tQhCpiiwAw?si=ZQ3QMzAvS-bvbDky"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          background: '#FF0000', margin: '16px 16px 16px',
          borderRadius: 'var(--r)', padding: '13px 16px',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(255,0,0,0.3)',
        }}
      >
        <i className="fab fa-youtube" style={{ fontSize: '1.5rem', color: '#fff', flexShrink: 0 }} />
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#fff' }}>
            사랑의교회 유튜브 바로가기
          </span>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.82)' }}>
            설교 · 찬양 영상 보러가기
          </span>
        </span>
        <i className="fas fa-chevron-right" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }} />
      </a>

      {/* 교회 표어 섹션 */}
      <div style={{
        margin: '0 16px 16px',
        borderRadius: 'var(--r)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
      }}>
        {/* 상단 배너 */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-dk) 0%, var(--primary) 100%)',
          padding: '20px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px', height: '36px', flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="fas fa-cross" style={{ color: '#fff', fontSize: '0.95rem' }} />
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '1.5px', fontWeight: '600', marginBottom: '2px' }}>
              2026 교회 표어
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', lineHeight: '1.4', wordBreak: 'keep-all' }}>
              하늘에 계신 내 아버지의 뜻을 행하는 사람들
            </p>
          </div>
        </div>

        {/* 하단 설명 */}
        <div style={{
          background: '#fff',
          padding: '14px 20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: '3px', flexShrink: 0, alignSelf: 'stretch',
            background: 'var(--primary-lt)',
            borderRadius: '4px',
          }} />
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '4px' }}>
              마태복음 7:21
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: '1.65', wordBreak: 'keep-all' }}>
              나와 우리 안에 인격적으로 임재하시는 하나님의 마음을 따라 그분의 뜻을 행하는 사람들이 되고자 합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="quick-grid">
        {menuItems.map(item => (
          <a key={item.id} className="quick-card" href={`#${item.id}`}
            onClick={e => { e.preventDefault(); navigateTo(item.id); }}>
            <span className="quick-icon"><i className={item.icon} /></span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <div className="home-section">
        <div className="section-header">
          <h3>최근 공지사항</h3>
          <a className="section-more" href="#announcements"
            onClick={e => { e.preventDefault(); navigateTo('announcements'); }}>
            전체보기 <i className="fas fa-chevron-right" style={{ fontSize: '0.65rem' }} />
          </a>
        </div>
        <div className="notice-preview">
          {recent.length === 0 ? (
            <p className="notice-empty">등록된 공지사항이 없습니다.</p>
          ) : (
            recent.map(item => (
              <div key={item.id} className="notice-preview-item"
                onClick={() => navigateTo('announcements')}>
                <span className="notice-dot" />
                <span className="notice-preview-title">{item.title}</span>
                <span className="notice-preview-date">{formatDate(item.date)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
