import { createContext, useContext, useState, useEffect } from 'react';
import { loadDoc, saveDoc } from '../firebase';
import { DEFAULT_GREETING, withDefaultGreeting } from './defaultGreeting';

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
  greeting: { text: DEFAULT_GREETING, history: '', photoUrl: '' },
};

const KEYS = ['announcements', 'bulletin', 'services', 'congregation', 'hero', 'greeting'];
const CACHE_KEY = 'cms_store_cache';

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const cached = readCache();
  const initial = { ...defaults, ...(cached ?? {}) };
  const [store, setStore] = useState({ ...initial, greeting: withDefaultGreeting(initial.greeting) });
  const [loading, setLoading] = useState(false); // 로딩 화면 없이 캐시/기본값으로 즉시 렌더링하고 백그라운드 동기화

  useEffect(() => {
    Promise.all(KEYS.map(key => loadDoc(key).then(val => [key, val])))
      .then(entries => {
        const loaded = { ...defaults, ...(readCache() ?? {}) };
        entries.forEach(([key, val]) => { if (val !== null) loaded[key] = val; });
        loaded.greeting = withDefaultGreeting(loaded.greeting);
        setStore(loaded);
        writeCache(loaded);
      })
      .catch(err => console.warn('Firebase 동기화 실패 (오프라인 모드):', err))
      .finally(() => setLoading(false));
  }, []);

  const update = async (key, value) => {
    const next = { ...store, [key]: value };
    setStore(next);
    writeCache(next);
    await saveDoc(key, value).catch(err => console.error('저장 오류:', err));
  };

  return (
    <StoreContext.Provider value={{ store, update, loading }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
