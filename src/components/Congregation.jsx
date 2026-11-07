import { useStore } from '../data/StoreContext';

const iconList = ['fas fa-users', 'fas fa-praying-hands', 'fas fa-child', 'fas fa-cross', 'fas fa-dove'];

const Congregation = () => {
  const { store } = useStore();
  const list = store.congregation ?? [];

  return (
    <div className="page">
      <div className="page-body">
        {list.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon"><i className="fas fa-users" /></span>
            <p className="empty-state-title">등록된 신도회가 없습니다</p>
            <p className="empty-state-sub">신도회 소개가 등록되면 이곳에 표시됩니다</p>
          </div>
        ) : (
          <div className="group-list">
            {list.map((item, i) => (
              <div key={item.id} className="group-row cong-row">
                <span className="row-icon"><i className={iconList[i % iconList.length]} /></span>
                <span className="row-body">
                  <span className="row-title">{item.name}</span>
                  {item.leader && (
                    <span className="cong-leader"><i className="fas fa-user" />{item.leader}</span>
                  )}
                  {item.description && <span className="cong-desc">{item.description}</span>}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Congregation;
