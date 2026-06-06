import { useStore } from '../data/StoreContext';

const ServiceInfo = () => {
  const { store } = useStore();
  const services = store.services ?? [];

  return (
    <div className="page">
      <div className="page-body">
        <div className="service-list">
          {services.map((s) => (
            <div key={s.id} className="service-row">
              <span className="service-info">
                <span className="service-name">{s.name}</span>
                <span className="service-place">
                  <span style={{
                    display: 'inline-block',
                    background: 'var(--surface)',
                    color: 'var(--primary)',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    border: '1px solid rgba(139,90,43,0.15)',
                  }}>{s.place}</span>
                </span>
              </span>
              <span className="service-time">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
