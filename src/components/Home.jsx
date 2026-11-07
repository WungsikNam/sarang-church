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

      {/* 하단 이미지 버튼 */}
      <div className="home-banners">
        <a className="home-banner" href="#announcements" onClick={go('announcements')}>
          <img src="/home-notice.webp" alt="공지사항 바로가기" width="900" height="327" loading="lazy" />
        </a>
        <a className="home-banner" href="#service" onClick={go('service')}>
          <img src="/home-service.webp" alt="예배안내 바로가기" width="900" height="328" loading="lazy" />
        </a>
      </div>

    </div>
  );
};

export default Home;
