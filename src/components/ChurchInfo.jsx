import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../data/StoreContext';
import { mountChurchMap } from '../data/church';

const CENTER_NAME = '사랑의지역아동센터';

const STAFF = [
  { role: '담임목사',      name: '김윤범' },
  { role: '원로목사',      name: '성양권' },
  { role: '시무장로',      name: '육근현' },
  { role: '전도사·센터장', name: '허진영' },
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
  useEffect(() => mountChurchMap(mapRef.current, CENTER_NAME), []);
  return <div ref={mapRef} className="center-map" />;
};



const INTRO_ALT = '세상은 우리에게 자꾸만 증명하라고 말합니다. 하지만 예수님은 다르게 말씀하셨습니다. '
  + '너는 존재 자체로 이미 소중하단다. 사랑의교회는 상처받은 마음이 치유되고, '
  + '내가 얼마나 사랑받는 존재인지 다시 깨닫는 회복의 공간입니다. — 사랑의교회 김윤범 목사';

/* 부드럽게 펼쳐지는 패널 */
const Collapse = ({ open, children }) => (
  <div className={`ci-collapse${open ? ' open' : ''}`} aria-hidden={!open}>
    <div className="ci-collapse-inner">{children}</div>
  </div>
);

/* 인사말: 첫 문단이 따옴표로 감싼 짧은 문장이면 제목으로 보여줌 */
const GreetingBody = ({ text, photoUrl }) => {
  const paras = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const first = paras[0] ?? '';
  const isTitle = paras.length > 1 && first.length <= 30 && /^["“]/.test(first);
  const body = isTitle ? paras.slice(1) : paras;
  return (
    <div className="ci-pastor-text">
      {isTitle && <p className="ci-greeting-title">{first.replace(/^["“]|["”]$/g, '')}</p>}
      {body.map((p, i) => <p key={i}>{p}</p>)}
      <p className="ci-greeting-sign">
        {photoUrl && <img src={photoUrl} alt="김윤범 담임목사" />}
        <span>사랑의교회 담임목사 <strong>김윤범</strong></span>
      </p>
    </div>
  );
};

const ChurchInfo = () => {
  const { store } = useStore();
  const { text, history, photoUrl } = store.greeting;
  const [historyOpen, setHistoryOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const zoomImgRef = useRef(null);
  /* 확대 시 이미지 오른쪽의 글씨 영역(가로 약 42~95%)이 화면 가운데 오도록 */
  const centerOnText = () => {
    const box = zoomImgRef.current?.parentElement;
    if (!box) return;
    box.scrollLeft = Math.max(0, box.scrollWidth * 0.685 - box.clientWidth / 2);
  };

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => { if (e.key === 'Escape') setZoom(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [zoom]);

  return (
    <div className="page ci">

      {/* 인트로 */}
      <header className="ci-intro">
        <p className="ci-eyebrow">한국기독교장로회</p>
        <h1 className="ci-title">사랑의교회</h1>
      </header>

      <div className="ci-body">

        {/* 교회 소개 */}
        <section id="ci-about" className="ci-section">
          <Reveal><h2 className="ci-h2"><span>01</span>교회 소개</h2></Reveal>
          <Reveal delay={60}>
            <button className="ci-intro-img" onClick={() => setZoom(true)} aria-label="교회 소개 이미지 크게 보기">
              <img src="/church-intro.webp" alt={INTRO_ALT} />
              <span className="ci-zoom-hint"><i className="fas fa-expand" />크게 보기</span>
            </button>
          </Reveal>
          {text && (
            <Reveal delay={80}>
              <article className="ci-pastor">
                <span className="ci-badge">담임목사 인사</span>
                <GreetingBody text={text} photoUrl={photoUrl} />
                {history && (
                  <>
                    <div className="ci-pastor-actions">
                      <button className={historyOpen ? 'on' : ''} aria-expanded={historyOpen}
                        onClick={() => setHistoryOpen(v => !v)}>
                        담임목사 이력 보기 <i className="fas fa-chevron-down" />
                      </button>
                    </div>
                    <Collapse open={historyOpen}><p className="ci-history-text">{history}</p></Collapse>
                  </>
                )}
              </article>
            </Reveal>
          )}
        </section>

        {/* 섬기는 사람들 */}
        <section id="ci-staff" className="ci-section">
          <Reveal><h2 className="ci-h2"><span>02</span>섬기는 사람들</h2></Reveal>
          <Reveal delay={60}>
            <div className="ci-staff">
              {STAFF.map(p => (
                <div key={p.name} className="ci-staff-card">
                  <span className="ci-staff-role">{p.role}</span>
                  <strong className="ci-staff-name">{p.name}</strong>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* 지역아동센터 */}
        <section id="ci-center" className="ci-section">
          <Reveal><h2 className="ci-h2"><span>03</span>지역 아동 복지</h2></Reveal>
          <Reveal delay={60}>
            <div className="ci-center">
              <div className="ci-center-head">
                <span className="ci-center-kicker">COMMUNITY WELFARE</span>
                <strong>사랑의지역아동센터</strong>
                <i className="fas fa-child-reaching" />
              </div>
              <div className="ci-center-body">
                <p>방과 후 돌봄이 필요한 지역 아동들에게 학습 지원, 급식, 정서 케어, 문화 체험을 제공하는 따뜻한 공간입니다.</p>
                <dl className="ci-center-facts">
                  <div><dt>시설 구분</dt><dd>지역아동 복지시설 (방과후 돌봄)</dd></div>
                  <div><dt>센터장</dt><dd>허진영 전도사</dd></div>
                </dl>
              </div>
              <CenterMap />
            </div>
          </Reveal>
        </section>

        {/* 소속 교단 */}
        <section id="ci-denom" className="ci-section">
          <Reveal><h2 className="ci-h2"><span>04</span>소속 교단</h2></Reveal>
          <Reveal delay={60}>
            <div className="ci-denom-card">
              <p>
                사랑의교회가 속한 <strong>한국기독교장로회(기장)</strong>는 예수 그리스도의 복음을 세상에 전하고, 더불어 우리 이웃과 사회 속에서 온전히 실천하고자 노력해 온 건강하고 따뜻한 교단입니다.
              </p>
            </div>
          </Reveal>
        </section>
      </div>

      {zoom && createPortal(
        <div className="ci-lightbox" role="dialog" aria-modal="true" aria-label="교회 소개 이미지"
          onClick={() => setZoom(false)}>
          <div className="ci-lightbox-scroll" onClick={e => e.stopPropagation()}>
            <img src="/church-intro.webp" alt={INTRO_ALT} onLoad={centerOnText} ref={zoomImgRef} />
          </div>
          <p className="ci-lightbox-hint">좌우로 밀어서 보기 · 바깥을 누르면 닫힘</p>
          <button className="ci-lightbox-close" aria-label="닫기" onClick={() => setZoom(false)}>
            <i className="fas fa-xmark" />
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ChurchInfo;
