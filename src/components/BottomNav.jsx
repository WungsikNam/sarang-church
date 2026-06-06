const tabs = [
  { id: 'home',          icon: 'fas fa-home',        label: '홈' },
  { id: 'service',       icon: 'fas fa-calendar-alt', label: '예배안내' },
  { id: 'announcements', icon: 'fas fa-bullhorn',     label: '공지사항' },
];

const BottomNav = ({ current, navigateTo }) => (
  <nav className="bottom-nav">
    {tabs.map(t => (
      <button
        key={t.id}
        className={`nav-item${current === t.id ? ' active' : ''}`}
        onClick={() => navigateTo(t.id)}
      >
        <i className={`nav-icon ${t.icon}`} />
        <span className="nav-label">{t.label}</span>
        <span className="nav-dot" />
      </button>
    ))}
  </nav>
);

export default BottomNav;
