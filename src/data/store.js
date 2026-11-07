import { DEFAULT_GREETING } from './defaultGreeting';
import { DEFAULT_SERVICES } from './defaultServices';

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
  services: DEFAULT_SERVICES,
  congregation: [],
  hero: {
    title:    '함께 지어져 가는 교회',
    subtitle: '한국기독교장로회 사랑의교회에 오신 것을 환영합니다',
  },
  greeting: {
    text: DEFAULT_GREETING,
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
