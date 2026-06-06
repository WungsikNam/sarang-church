const KEYS = {
  announcements: 'cms_announcements',
  bulletin:      'cms_bulletin',
  services:      'cms_services',
  congregation:  'cms_congregation',
  hero:          'cms_hero',
  greeting:      'cms_greeting',
  accounts:      'cms_accounts',
};

const defaults = {
  announcements: [],
  bulletin: { title: '2026년 4월 19일 주보', url: '/bulletin.pdf' },
  services: [
    { id: 1, name: '주일 예배',              time: '11:00', place: '본당' },
    { id: 2, name: '영유아부 예배',          time: '11:00', place: '교육관' },
    { id: 3, name: '학생회 예배 (중고등)',   time: '13:30', place: '본당' },
    { id: 4, name: '수요예배',               time: '20:00', place: '본당' },
    { id: 5, name: '금요예배',               time: '20:00', place: '본당' },
    { id: 6, name: '아침 말씀 산책',          time: '06:00', place: '본당' },
  ],
  congregation: [],
  hero: {
    title:    '함께 지어져 가는 교회',
    subtitle: '한국기독교장로회 사랑의교회에 오신 것을 환영합니다',
  },
  greeting: {
    text: '사랑의 교회에 오신 것을 환영합니다.',
  },
  accounts: [
    { id: 1, label: '십일조 · 감사헌금', bank: '은행', number: '111-111-11111' },
  ],
};

export function getData(key) {
  try {
    const raw = localStorage.getItem(KEYS[key]);
    return raw ? JSON.parse(raw) : defaults[key];
  } catch {
    return defaults[key];
  }
}

export function setData(key, value) {
  localStorage.setItem(KEYS[key], JSON.stringify(value));
}
