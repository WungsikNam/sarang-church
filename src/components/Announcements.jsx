import { useStore } from '../data/StoreContext';
import YoutubeCard from './YoutubeCard';

const Announcements = () => {
  const { store } = useStore();
  const list = store.announcements ?? [];
  const formatDate = (raw) => raw ? raw.replace(/-/g, '.') : '';

  return (
    <div className="page">
      <div className="page-body">
        <YoutubeCard className="yt-card-flat" />

        {list.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon"><i className="far fa-bell" /></span>
            <p className="empty-state-title">등록된 공지사항이 없습니다</p>
            <p className="empty-state-sub">새 소식이 올라오면 이곳에서 확인할 수 있습니다</p>
          </div>
        ) : (
          <div className="announce-list">
            {list.map(item => (
              <article key={item.id} className="announce-card">
                {item.date && (
                  <span className="announce-date">
                    <i className="far fa-calendar" />{formatDate(item.date)}
                  </span>
                )}
                <h3 className="announce-title">{item.title}</h3>
                {item.content && <p className="announce-body">{item.content}</p>}
                {(item.attachments ?? []).length > 0 && (
                  <div className="attach-list">
                    {item.attachments.map((f, i) => (
                      <a key={i} className="attach-item" href={f.url} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-paperclip" />
                        <span className="attach-name">{f.name}</span>
                        <i className="fas fa-download" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
