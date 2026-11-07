export const CHURCH_NAME    = '사랑의교회';
export const CHURCH_ADDRESS = '경기 부천시 원미구 장말로187번길 30';
export const CHURCH_PHONE   = '032-651-1690';

/* 주소검색이 실패할 때 쓰는 대략 좌표 (장말로187번길, 부천 중동) */
export const CHURCH_LAT = 37.49387;
export const CHURCH_LNG = 126.76297;

/* 카카오맵 앱/웹에서 주소로 바로 검색 */
export const KAKAO_MAP_URL = `https://map.kakao.com/link/search/${encodeURIComponent(CHURCH_ADDRESS)}`;

/**
 * el 안에 카카오 지도를 그리고, CHURCH_ADDRESS를 주소검색해 정확한 위치에 마커를 둔다.
 * SDK가 아직 안 불러와졌으면 로드 후 그린다. 정리 함수를 반환한다.
 */
export function mountChurchMap(el, label = CHURCH_NAME) {
  const render = () => {
    if (!el) return;
    const { maps } = window.kakao;
    const fallback = new maps.LatLng(CHURCH_LAT, CHURCH_LNG);
    const map = new maps.Map(el, { center: fallback, level: 3 });
    const marker = new maps.Marker({ position: fallback, map });
    const info = new maps.InfoWindow({
      content: `<div style="padding:6px 10px;font-size:13px;font-weight:600;white-space:nowrap;">${label}</div>`,
      removable: false,
    });
    info.open(map, marker);

    if (maps.services) {
      new maps.services.Geocoder().addressSearch(CHURCH_ADDRESS, (result, status) => {
        if (status !== maps.services.Status.OK || !result[0]) return;
        const pos = new maps.LatLng(Number(result[0].y), Number(result[0].x));
        marker.setPosition(pos);
        map.setCenter(pos);
        info.open(map, marker);
      });
    }
  };

  if (window.kakao?.maps) {
    window.kakao.maps.load(render);
    return () => {};
  }
  const script = document.querySelector('script[src*="dapi.kakao.com"]');
  if (!script) return () => {};
  const onLoad = () => window.kakao.maps.load(render);
  script.addEventListener('load', onLoad);
  return () => script.removeEventListener('load', onLoad);
}
