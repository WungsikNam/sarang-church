import { useEffect, useRef, useState } from 'react';
import { CHURCH_ADDRESS, KAKAO_MAP_URL, mountChurchMap } from '../data/church';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button onClick={handleCopy} className={`btn btn-sm btn-light${copied ? ' is-done' : ''}`}>
      {copied ? '복사됨' : '복사'}
    </button>
  );
};

const Location = () => {
  const mapRef = useRef(null);

  useEffect(() => mountChurchMap(mapRef.current), []);

  const openKakaoMap = () => window.open(KAKAO_MAP_URL, '_blank');

  return (
    <div className="page">
      <div className="page-body">
        <div className="location-stack">
          <div ref={mapRef} className="map-wrap" />
          <button onClick={openKakaoMap} className="btn btn-kakao btn-block">
            <i className="fas fa-map" />
            카카오맵에서 보기
          </button>
        </div>

        <div className="group-list">
          <div className="group-row">
            <span className="row-icon"><i className="fas fa-map-marker-alt" /></span>
            <span className="row-body">
              <span className="location-text-label">주소</span>
              <span className="location-text-val">{CHURCH_ADDRESS}</span>
            </span>
            <CopyButton text={CHURCH_ADDRESS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
