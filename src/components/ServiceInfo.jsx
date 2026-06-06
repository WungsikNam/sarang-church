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
                <span className="service-place">{s.place}</span>
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
