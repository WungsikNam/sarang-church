import { useStore } from '../data/StoreContext';
import { YOUTUBE_URL } from './YoutubeCard';

const iconMenu = [
  { id: 'bulletin',      icon: 'fa-regular fa-file-lines', label: '주보' },
  { id: 'announcements', icon: 'fa-regular fa-envelope',   label: '교회소식' },
  { id: 'congregation',  icon: 'fa-regular fa-handshake',  label: '신도회' },
  { id: 'media',         icon: 'fa-regular fa-circle-play', label: '설교영상' },
  { id: 'location',      icon: 'fa-regular fa-map',        label: '오시는 길' },
  { id: 'menu',          icon: 'fa-regular fa-compass',    label: '전체메뉴' },
];

const Home = ({ navigateTo }) => {
  const { store } = useStore();
  const recent = (store.announcements ?? []).slice(0, 3);
  const formatDate = (raw) => raw ? raw.replace(/-/g, '.') : '';
  const go = (id) => (e) => { e.preventDefault(); navigateTo(id); };

  return (
    <div id="home" className="page home">
      {/* 교회 비전 */}
      <section className="home-vision">
        <img
          src="/church-vision.webp"
          alt="“하늘에 계신 내 아버지의 뜻을 행하는 사람들” (마 7:21) 나와 우리 안에 인격적으로 임재하시는 하나님의 마음을 따라 그분의 뜻을 행하는 사람들이 되고자 합니다. 한국기독교장로회 사랑의교회"
          loading="lazy"
        />
      </section>

      {/* 컬러 타일 */}
      <div className="tiles">
        <div className="tile-row">
          <a className="tile tile-orange" href="#info" onClick={go('info')}>
            <i className="tile-icon fas fa-church" />
            <span className="tile-text">
              <strong className="tile-title">교회안내</strong>
              <span className="tile-link">바로가기 <i className="fas fa-arrow-right-long" /></span>
            </span>
          </a>
          <a className="tile tile-navy" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
            <i className="tile-icon fas fa-bible" />
            <span className="tile-text">
              <span className="tile-pre">이번주</span>
              <strong className="tile-title">주일설교</strong>
            </span>
            <span className="tile-play"><i className="fas fa-play" /></span>
          </a>
        </div>
        <div className="tile-row rev">
          <a className="tile tile-slate" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
            <span className="tile-yt"><i className="fas fa-play" /></span>
            <span className="tile-text">
              <strong className="tile-title">유튜브 채널 <small>바로가기</small></strong>
            </span>
            <span className="tile-play"><i className="fas fa-play" /></span>
          </a>
          <a className="tile tile-sky" href="#service" onClick={go('service')}>
            <i className="tile-icon fas fa-hands-praying" />
            <span className="tile-text">
              <strong className="tile-title">예배안내</strong>
              <span className="tile-link">바로가기 <i className="fas fa-arrow-right-long" /></span>
            </span>
          </a>
        </div>
      </div>

      {/* 아이콘 메뉴 */}
      <nav className="icon-menu" aria-label="바로가기 메뉴">
        {iconMenu.map(item => (
          <a key={item.id} className="icon-menu-item" href={`#${item.id}`} onClick={go(item.id)}>
            <i className={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* 하단 타일 */}
      <div className="tile-trio">
        <a className="tile-sm tile-sky" href="#announcements" onClick={go('announcements')}>
          <strong>공지사항</strong>
          <i className="fas fa-bullhorn" />
        </a>
        <a className="tile-sm tile-navy" href="#location" onClick={go('location')}>
          <strong>오시는 길</strong>
          <i className="fas fa-location-dot" />
        </a>
      </div>

      {/* 최근 공지사항 */}
      <section className="home-section">
        <div className="section-header">
          <h3>최근 공지사항</h3>
          <a className="section-more" href="#announcements" onClick={go('announcements')}>
            전체보기 <i className="fas fa-chevron-right" />
          </a>
        </div>
        <div className="notice-preview">
          {recent.length === 0 ? (
            <div className="notice-empty">
              <span className="notice-empty-icon"><i className="far fa-bell" /></span>
              <p className="notice-empty-title">새로운 소식이 없습니다</p>
              <p className="notice-empty-sub">공지가 올라오면 이곳에 표시됩니다</p>
            </div>
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
      </section>
    </div>
  );
};

export default Home;
