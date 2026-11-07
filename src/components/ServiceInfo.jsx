import { useStore } from '../data/StoreContext';

const ServiceInfo = () => {
  const { store } = useStore();
  const services = store.services ?? [];

  return (
    <div className="page">
      <div className="page-body">
        <header className="page-intro">
          <span className="page-intro-eyebrow">WORSHIP</span>
          <h2 className="page-intro-title">예배 시간 안내</h2>
        </header>

        <div className="group-list">
          {services.map((s) => (
            <div key={s.id} className="group-row service-row">
              <span className="service-time">{s.time}</span>
              <span className="service-divider" />
              <span className="service-info">
                <span className="service-name">{s.name}</span>
                {s.place && (
                  <span className="badge"><i className="fas fa-location-dot" />{s.place}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
