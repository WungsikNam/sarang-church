/* 예배 시간표 기본값 — day: '주일'이면 주일 목록, 그 외는 주중 목록에 표시 */
export const DEFAULT_SERVICES = [
  { id: 1, name: '주일 예배',        day: '주일',  time: '11:00', place: '대예배실' },
  { id: 2, name: '유·초등부 예배',   day: '주일',  time: '11:15', place: '소예배실 (지하 1층)' },
  { id: 3, name: '청년회',           day: '주일',  time: '12:20', place: '청년회실 (1층)' },
  { id: 4, name: '학생회 예배',      day: '주일',  time: '13:30', place: '대예배실' },
  { id: 5, name: '아침 기도회',      day: '화~금', time: '06:00', place: '대예배실' },
  { id: 6, name: '수요 기도회',      day: '수',    time: '19:00', place: '대예배실' },
  { id: 7, name: '금요 찬양기도회',  day: '금',    time: '20:30', place: '대예배실' },
];

/* 요일(day) 정보가 없는 예전 형식 데이터가 캐시에 남아 있으면 새 기본값으로 대체 */
export function withDefaultServices(services) {
  if (!Array.isArray(services) || services.length === 0) return DEFAULT_SERVICES;
  return services.every(s => s && s.day) ? services : DEFAULT_SERVICES;
}

/* '19:00' → { period: '저녁', clock: '7:00' } */
export function formatServiceTime(time = '') {
  const [h, m = '00'] = time.split(':').map(v => v.trim());
  const hour = Number(h);
  if (Number.isNaN(hour)) return { period: '', clock: time };
  const period = hour < 12 ? '오전' : hour < 18 ? '오후' : '저녁';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return { period, clock: `${h12}:${m.padStart(2, '0')}` };
}
