import { useEffect, useRef } from 'react';

const Location = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const timestamp = '1780733184090';
    const key = 'p34g49qyjjk';
    const scriptId = 'daum-map-loader';

    const renderMap = () => {
      if (window.daum?.roughmap && mapRef.current) {
        // 기존 렌더링 영역 비우기
        mapRef.current.innerHTML = '';
        
        // 중요: React DOM이 완전히 렌더링되어 메인 문서에 부착된 이후에
        // 카카오맵 렌더러가 getElementById를 찾을 수 있도록 마이크로 태스크 딜레이(50ms)를 적용합니다.
        // 이 조치가 새로고침 없이 탭을 이동했을 때 지도가 즉시 로드되지 않던 버그를 완전히 해결합니다.
        setTimeout(() => {
          try {
            new window.daum.roughmap.Lander({
              timestamp: timestamp,
              key: key,
              mapWidth: '100%',
              mapHeight: '260',
            }).render();
          } catch (err) {
            console.error('카카오맵 렌더링 실패:', err);
          }
        }, 50);
      }
    };

    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
      script.charset = 'UTF-8';
      script.className = 'daum_roughmap_loader_script';
      script.onload = renderMap;
      document.head.appendChild(script);
    } else {
      renderMap();
    }
  }, []);

  return (
    <div className="page">
      <div className="page-body">
        {/* 지도가 그려지는 영역 */}
        <div className="map-wrap" style={{ minHeight: '260px', background: 'var(--surface)' }}>
          <div
            id="daumRoughmapContainer1780733184090"
            ref={mapRef}
            className="root_daum_roughmap root_daum_roughmap_landing"
            style={{ width: '100%' }}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div className="location-info-row">
            <span className="location-icon"><i className="fas fa-map-marker-alt" /></span>
            <span>
              <div className="location-text-label">주소</div>
              <div className="location-text-val">경기 부천시 원미구 장말로187번길 30</div>
            </span>
          </div>
          <div className="location-divider" />
          <div className="location-info-row">
            <span className="location-icon"><i className="fas fa-phone" /></span>
            <span>
              <div className="location-text-label">연락처</div>
              <a href="tel:032-651-1690" className="location-text-val" style={{ textDecoration: 'none', color: 'inherit' }}>
                032-651-1690
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
