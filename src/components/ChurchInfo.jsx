import { useState, useEffect, useRef } from 'react';
import { useStore } from '../data/StoreContext';

const CENTER_LAT = 37.4936;
const CENTER_LNG = 126.7794;
const CENTER_NAME = '사랑의지역아동센터';

const STAFF = [
  { role: '담임목사',      name: '김윤범', color: 'var(--primary)' },
  { role: '원로목사',      name: '성양권', color: '#475569' },
  { role: '시무장로',      name: '육근현', color: '#059669' },
  { role: '전도사·센터장', name: '허진영', color: '#D97706' },
];

/* 스크롤 감지 훅 */
const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
};

const CenterMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const render = () => {
      if (!mapRef.current) return;
      const pos = new window.kakao.maps.LatLng(CENTER_LAT, CENTER_LNG);
      const map = new window.kakao.maps.Map(mapRef.current, { center: pos, level: 3 });
      const marker = new window.kakao.maps.Marker({ position: pos, map });
      new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px 10px;font-size:12px;font-weight:600;white-space:nowrap;">${CENTER_NAME}</div>`,
      }).open(map, marker);
    };
    if (window.kakao?.maps) window.kakao.maps.load(render);
    else {
      const s = document.querySelector('script[src*="dapi.kakao.com"]');
      if (s) { const fn = () => window.kakao.maps.load(render); s.addEventListener('load', fn); return () => s.removeEventListener('load', fn); }
    }
  }, []);
  return <div ref={mapRef} style={{ width: '100%', height: '200px' }} />;
};

const ChurchInfo = () => {
  const { store } = useStore();
  const { text, history, photoUrl } = store.greeting;
  const [historyOpen, setHistoryOpen] = useState(false);
  const [greetingOpen, setGreetingOpen] = useState(false);

  return (
    <div className="page" style={{ background: '#F9F7F4' }}>

      {/* 히어로 */}
      <div style={{ position: 'relative', height: '320px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, var(--primary-dk) 0%, var(--primary) 100%)',
        }} />
        {photoUrl && (
          <img src={photoUrl} alt="담임목사" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            animation: 'fadeIn 1.2s ease both',
          }} />
        )}
        {/* 패턴 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(15,8,3,0.82) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '28px', left: '22px', right: '22px',
          animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both',
        }}>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2.5px', marginBottom: '8px', textTransform: 'uppercase' }}>
            한국기독교장로회
          </p>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.05, marginBottom: '10px' }}>
            사랑의교회
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.5)' }} />
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.5px' }}>
              김윤범 담임목사
            </p>
          </div>
        </div>
      </div>

      {/* 교회 슬로건 풀배너 */}
      <Reveal>
        <div style={{
          background: 'var(--primary-dk)', padding: '22px 24px',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <div style={{
            width: '2px', height: '48px', flexShrink: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
            borderRadius: '2px',
          }} />
          <div>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', marginBottom: '5px' }}>
              CHURCH MOTTO
            </p>
            <p style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff', lineHeight: 1.45, wordBreak: 'keep-all' }}>
              "당신은 이미 소중합니다"
            </p>
          </div>
        </div>
      </Reveal>

      <div style={{ padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: '36px' }}>

        {/* 교회 소개 */}
        <section>
          <Reveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dk)', letterSpacing: '-0.5px', marginBottom: '14px' }}>
              교회 소개
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              background: '#fff', borderRadius: 'var(--r)',
              boxShadow: '0 4px 24px rgba(93,64,55,0.09)',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.9, wordBreak: 'keep-all' }}>
                  세상은 우리에게 자꾸만 증명하라고 말합니다. 하지만 예수님은 다르게 말씀하셨습니다.{' '}
                  <strong style={{ color: 'var(--primary-dk)' }}>"너는 존재 자체로 이미 소중하단다"</strong>라고요.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#333', lineHeight: 1.9, wordBreak: 'keep-all' }}>
                  사랑의교회는 상처받은 마음이 치유되고, 내가 얼마나 사랑받는 존재인지 다시 깨닫는 회복의 공간입니다.
                </p>
              </div>
              <div style={{
                margin: '0 22px 22px',
                padding: '14px 16px', borderRadius: '10px',
                background: 'var(--surface)', borderLeft: '3px solid var(--primary-lt)',
              }}>
                <p style={{ fontSize: '0.73rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>소속 교단</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                  <strong>한국기독교장로회(기장)</strong> — 복음과 이웃 사랑을 함께 실천하는 교단입니다.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 섬기는 사람들 */}
        <section>
          <Reveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dk)', letterSpacing: '-0.5px', marginBottom: '14px' }}>
              섬기는 사람들
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {STAFF.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--r-sm)',
                  boxShadow: '0 2px 12px rgba(93,64,55,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderLeft: `3px solid ${p.color}`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <span style={{ fontSize: '0.82rem', color: '#888' }}>{p.role}</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-0.3px' }}>
                    {p.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 지역아동센터 */}
        <section>
          <Reveal>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dk)', letterSpacing: '-0.5px', marginBottom: '14px' }}>
              지역 아동 복지
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              background: '#fff', borderRadius: 'var(--r)',
              boxShadow: '0 4px 24px rgba(93,64,55,0.09)', overflow: 'hidden',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #BF360C, #E64A19)',
                padding: '18px 22px',
              }}>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '2px', marginBottom: '5px' }}>
                  COMMUNITY WELFARE
                </p>
                <p style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fff' }}>
                  사랑의지역아동센터
                </p>
              </div>
              <div style={{ padding: '18px 22px 0' }}>
                <p style={{ fontSize: '0.88rem', color: '#444', lineHeight: 1.8, wordBreak: 'keep-all', marginBottom: '16px' }}>
                  방과 후 돌봄이 필요한 지역 아동들에게 학습 지원, 급식, 정서 케어, 문화 체험을 제공하는 따뜻한 공간입니다.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '18px' }}>
                  {[
                    ['시설 구분', '지역아동 복지시설 (방과후 돌봄)'],
                    ['센터장', '허진영 전도사'],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '0.73rem', fontWeight: '700', color: '#E64A19', width: '60px', flexShrink: 0 }}>{label}</span>
                      <span style={{ fontSize: '0.84rem', color: '#555' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <CenterMap />
            </div>
          </Reveal>
        </section>

        {/* 목사 이력 */}
        {history && (
          <section>
            <Reveal>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dk)', letterSpacing: '-0.5px', marginBottom: '14px' }}>
                목사 이력
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ background: '#fff', borderRadius: 'var(--r)', boxShadow: '0 4px 24px rgba(93,64,55,0.09)', overflow: 'hidden' }}>
                <button onClick={() => setHistoryOpen(v => !v)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.92rem', fontWeight: '700', color: 'var(--text)',
                }}>
                  <span>이력 보기</span>
                  <i className={`fas fa-chevron-${historyOpen ? 'up' : 'down'}`} style={{ fontSize: '0.75rem', color: '#bbb' }} />
                </button>
                {historyOpen && (
                  <div style={{ padding: '0 22px 20px', borderTop: '1px solid #F0EAE2' }}>
                    <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.9, whiteSpace: 'pre-wrap', paddingTop: '16px' }}>{history}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </section>
        )}

        {/* 담임목사 인사말 */}
        {text && (
          <section>
            <Reveal>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dk)', letterSpacing: '-0.5px', marginBottom: '14px' }}>
                담임목사 인사말
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <div style={{ background: '#fff', borderRadius: 'var(--r)', boxShadow: '0 4px 24px rgba(93,64,55,0.09)', overflow: 'hidden' }}>
                <button onClick={() => setGreetingOpen(v => !v)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.92rem', fontWeight: '700', color: 'var(--text)',
                }}>
                  <span>인사말 보기</span>
                  <i className={`fas fa-chevron-${greetingOpen ? 'up' : 'down'}`} style={{ fontSize: '0.75rem', color: '#bbb' }} />
                </button>
                {greetingOpen && (
                  <div style={{ padding: '0 22px 20px', borderTop: '3px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.9, whiteSpace: 'pre-wrap', paddingTop: '16px' }}>{text}</p>
                  </div>
                )}
              </div>
            </Reveal>
          </section>
        )}

      </div>
    </div>
  );
};

export default ChurchInfo;
