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
        padding: '18px 20px',
        background: 'linear-gradient(135deg, #FBF8F3 0%, #F5EFEB 100%)',
        border: '1px solid #EADFD5',
        borderRadius: 'var(--r)',
        boxShadow: 'var(--shadow-xs)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 장식용 따옴표 아이콘 */}
        <i className="fas fa-quote-left" style={{
          position: 'absolute', top: '10px', left: '12px',
          fontSize: '2.5rem', color: '#E5D6C8', opacity: 0.35,
          pointerEvents: 'none'
        }} />
        <i className="fas fa-quote-right" style={{
          position: 'absolute', bottom: '10px', right: '12px',
          fontSize: '2.5rem', color: '#E5D6C8', opacity: 0.35,
          pointerEvents: 'none'
        }} />

        <p style={{
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#B08E6B',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '6px'
        }}>
          교회 표어
        </p>
        <h4 style={{
          fontSize: '1.05rem',
          fontWeight: '700',
          color: 'var(--primary-dk)',
          lineHeight: '1.45',
          fontFamily: '"Noto Sans KR", sans-serif',
          margin: '0 0 10px',
          wordBreak: 'keep-all'
        }}>
          "하늘에 계신 내 아버지의 뜻을 행하는 사람들"
          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-hint)', marginTop: '2px', fontWeight: '500' }}>
            (마태복음 7:21)
          </span>
        </h4>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-sub)',
          lineHeight: '1.6',
          margin: 0,
          wordBreak: 'keep-all'
        }}>
          나와 우리 안에 인격적으로 임재하시는 하나님의 마음을 따라 그분의 뜻을 행하는 사람들이 되고자 합니다.
        </p>
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
