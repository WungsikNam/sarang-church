import { useEffect, useRef, useState } from 'react';

const CHURCH_LAT = 37.4936;
const CHURCH_LNG = 126.7794;
const CHURCH_ADDRESS = '경기 부천시 원미구 장말로187번길 30';
const CHURCH_PHONE = '032-651-1690';
const CHURCH_NAME = '사랑의교회';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        marginLeft: 'auto',
        flexShrink: 0,
        padding: '4px 10px',
        background: copied ? 'var(--primary)' : 'var(--surface)',
        color: copied ? '#fff' : 'var(--text-sub)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-sm)',
        fontSize: '12px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '복사됨' : '복사'}
    </button>
  );
};

const Location = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const renderMap = () => {
      if (!mapRef.current) return;

      const center = new window.kakao.maps.LatLng(CHURCH_LAT, CHURCH_LNG);

      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      });
      mapInstance.current = map;

      const marker = new window.kakao.maps.Marker({ position: center, map });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:6px 10px;font-size:13px;font-weight:600;white-space:nowrap;">${CHURCH_NAME}</div>`,
        removable: false,
      });
      infowindow.open(map, marker);
    };

    if (window.kakao?.maps) {
      window.kakao.maps.load(renderMap);
    } else {
      const script = document.querySelector('script[src*="dapi.kakao.com"]');
      if (script) {
        const onLoad = () => window.kakao.maps.load(renderMap);
        script.addEventListener('load', onLoad);
        return () => script.removeEventListener('load', onLoad);
      }
    }
  }, []);

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/map/${CHURCH_NAME},${CHURCH_LAT},${CHURCH_LNG}`,
      '_blank'
    );
  };

  return (
    <div className="page">
      <div className="page-body">
        {/* 지도 영역 */}
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '260px',
            borderRadius: 'var(--r)',
            overflow: 'hidden',
            background: 'var(--surface)',
          }}
        />

        {/* 버튼 */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button
            onClick={openKakaoMap}
            style={{
              flex: 1,
              padding: '10px',
              background: '#FEE500',
              color: '#3C1E1E',
              border: 'none',
              borderRadius: 'var(--r-sm)',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            카카오맵에서 보기
          </button>
        </div>

        {/* 주소 / 연락처 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '12px' }}>
          <div className="location-info-row" style={{ alignItems: 'center' }}>
            <span className="location-icon"><i className="fas fa-map-marker-alt" /></span>
            <span style={{ flex: 1 }}>
              <div className="location-text-label">주소</div>
              <div className="location-text-val">{CHURCH_ADDRESS}</div>
            </span>
            <CopyButton text={CHURCH_ADDRESS} />
          </div>
          <div className="location-divider" />
          <div className="location-info-row" style={{ alignItems: 'center' }}>
            <span className="location-icon"><i className="fas fa-phone" /></span>
            <span style={{ flex: 1 }}>
              <div className="location-text-label">연락처</div>
              <a href={`tel:${CHURCH_PHONE}`} className="location-text-val" style={{ textDecoration: 'none', color: 'inherit' }}>
                {CHURCH_PHONE}
              </a>
            </span>
            <CopyButton text={CHURCH_PHONE} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
