const items = [
  { id: 'info',          icon: 'fas fa-church',         label: '교회안내',  desc: '인사말 · 조직도' },
  { id: 'service',       icon: 'fas fa-calendar-alt',   label: '예배안내',  desc: '예배 시간표' },
  { id: 'location',      icon: 'fas fa-map-marker-alt', label: '오시는 길', desc: '찾아오는 방법' },
  { id: 'announcements', icon: 'fas fa-bullhorn',       label: '공지사항',  desc: '교회 소식 및 알림' },
  { id: 'congregation',  icon: 'fas fa-users',          label: '신도회',    desc: '남·여신도회 소개' },
  { id: 'bulletin',      icon: 'fas fa-book-open',      label: '주보',      desc: '온라인 주보 보기' },
];

const MenuPage = ({ navigateTo }) => (
  <div className="page">
    <div className="page-body">
      <nav className="group-list">
        {items.map(item => (
          <button key={item.id} className="group-row" onClick={() => navigateTo(item.id)}>
            <span className="row-icon"><i className={item.icon} /></span>
            <span className="row-body">
              <span className="row-title">{item.label}</span>
              <span className="row-sub">{item.desc}</span>
            </span>
            <i className="fas fa-chevron-right row-arrow" />
          </button>
        ))}
      </nav>

      <button className="admin-link" onClick={() => navigateTo('admin')}>
        <i className="fas fa-cog" />
        관리자 페이지
      </button>
    </div>
  </div>
);

export default MenuPage;
