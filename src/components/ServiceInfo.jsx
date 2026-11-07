import { useStore } from '../data/StoreContext';
import { formatServiceTime } from '../data/defaultServices';

const ServiceRow = ({ s, showDay }) => {
  const { period, clock } = formatServiceTime(s.time);
  return (
    <div className="group-row service-row">
      <span className="service-when">
        <span className="service-period">{period}</span>
        <span className="service-time">{clock}</span>
      </span>
      <span className="service-divider" />
      <span className="service-info">
        <span className="service-name">{s.name}</span>
        <span className="service-tags">
          {showDay && s.day && <span className="badge badge-day">{s.day}</span>}
          {s.place && <span className="badge"><i className="fas fa-location-dot" />{s.place}</span>}
        </span>
      </span>
    </div>
  );
};

const ServiceInfo = () => {
  const { store } = useStore();
  const services = store.services ?? [];
  const sunday  = services.filter(s => (s.day ?? '주일') === '주일');
  const weekday = services.filter(s => (s.day ?? '주일') !== '주일');

  return (
    <div className="page">
      <div className="page-body">
        <header className="page-intro">
          <span className="page-intro-eyebrow">WORSHIP</span>
          <h2 className="page-intro-title">예배 시간 안내</h2>
        </header>

        {sunday.length > 0 && (
          <section>
            <h3 className="sec-title">주일</h3>
            <div className="group-list">
              {sunday.map(s => <ServiceRow key={s.id} s={s} />)}
            </div>
          </section>
        )}

        {weekday.length > 0 && (
          <section>
            <h3 className="sec-title">주중</h3>
            <div className="group-list">
              {weekday.map(s => <ServiceRow key={s.id} s={s} showDay />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ServiceInfo;
