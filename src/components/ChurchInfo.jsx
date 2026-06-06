import { useStore } from '../data/StoreContext';

const ChurchInfo = () => {
  const { store } = useStore();
  const { text, history, photoUrl } = store.greeting;

  return (
    <div className="page">

      {/* 담임목사 프로필 — 대형 사진 */}
      <div style={{ position: 'relative', background: 'var(--surface)', marginBottom: '0' }}>
        {/* 사진 영역 */}
        <div style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dk) 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {photoUrl && (
            <img
              src={photoUrl}
              alt="담임목사"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          )}
          {/* 하단 그라디언트 오버레이 */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(30,15,5,0.75) 100%)',
          }} />
          {/* 이름 오버레이 */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '20px',
          }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginBottom: '4px' }}>
              한국기독교장로회 사랑의교회
            </p>
            <p style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fff', letterSpacing: '-0.3px' }}>
              김윤범 목사
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', marginTop: '3px' }}>
              담임목사
            </p>
          </div>
        </div>
      </div>

      <div className="page-body" style={{ paddingTop: '20px' }}>

        {/* 1. 교회 소개 섹션 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div className="page-section-title" style={{ marginBottom: 0 }}>교회 소개</div>
          <div className="card" style={{
            background: 'var(--white)',
            padding: '22px 20px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              color: 'var(--primary-dk)',
              marginBottom: '14px',
              fontFamily: '"Noto Sans KR", sans-serif',
              letterSpacing: '-0.3px',
              textAlign: 'center'
            }}>
              "당신은 이미 소중합니다"
            </h3>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--text)',
              lineHeight: '1.85',
              margin: '0 0 16px',
              wordBreak: 'keep-all',
              textAlign: 'justify'
            }}>
              세상은 우리에게 자꾸만 증명하라고 말합니다. 더 유능해야 하고, 더 가져야 하고, 더 완벽해야 한다고 말이죠. 하지만 우리 교회가 믿음으로 고백하는 예수님은 다르게 말씀하셨습니다. <strong style={{ color: 'var(--primary-dk)' }}>"너는 존재 자체로 이미 소중하단다"</strong>라고요.
            </p>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--text)',
              lineHeight: '1.85',
              margin: '0 0 16px',
              wordBreak: 'keep-all',
              textAlign: 'justify'
            }}>
              사랑의교회는 세상의 평가에 상처받은 마음이 치유되고, 내가 얼마나 사랑받는 존재인지 다시 깨닫는 회복의 공간입니다. 잘나지 않아도, 무언가를 이루지 못했어도 당신은 그 자체로 빛나는 사람입니다.
            </p>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--text)',
              lineHeight: '1.85',
              margin: '0 0 18px',
              wordBreak: 'keep-all',
              textAlign: 'justify'
            }}>
              그 변함없는 사랑을 이곳에서 함께 누렸으면 좋겠습니다. 당신의 깨어진 마음을 만지시고 다시 일으켜 세우실 하나님의 사랑, 그 따뜻한 품으로 당신을 초대합니다.
            </p>
            
            {/* 기장 교단 설명 카드 */}
            <div style={{
              background: 'var(--surface)',
              borderRadius: '12px',
              padding: '14px 16px',
              borderLeft: '4px solid #B09880',
              marginTop: '10px'
            }}>
              <p style={{
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#8A7055',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <i className="fas fa-info-circle" /> 소속 교단 안내
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-sub)',
                lineHeight: '1.6',
                margin: 0,
                wordBreak: 'keep-all'
              }}>
                사랑의교회가 속한 <strong>한국기독교장로회(기장)</strong>는 예수 그리스도의 복음을 세상에 전하며, 더불어 우리 이웃과 사회 속에서 온전히 실천하고자 노력해 온 건강하고 따뜻한 교단입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 2. 섬기는 사람들 섹션 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div className="page-section-title" style={{ marginBottom: 0 }}>섬기는 사람들</div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {[
              { role: '담임목사', name: '김윤범', desc: '예수님의 마음을 전하는 목자', icon: 'fa-user-tie', bg: '#F9F6F0', color: '#8A7055' },
              { role: '원로목사', name: '성양권', desc: '우리 교회의 주춧돌과 같은 목자', icon: 'fa-user-shield', bg: '#F1F5F9', color: '#475569' },
              { role: '시무장로', name: '육근현', desc: '교회의 화평과 질서를 세우는 목자', icon: 'fa-user-check', bg: '#ECFDF5', color: '#059669' },
              { role: '전도사/센터장', name: '허진영', desc: '아이들의 꿈을 함께 가꾸는 목자', icon: 'fa-child-reaching', bg: '#FEF3C7', color: '#D97706' }
            ].map((person, idx) => (
              <div key={idx} style={{
                background: person.bg,
                padding: '16px 18px',
                borderRadius: 'var(--r)',
                border: '1px solid rgba(0,0,0,0.02)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '46px', height: '46px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: person.color,
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 8px rgba(93,64,55,0.06)',
                  flexShrink: 0
                }}>
                  <i className={`fas ${person.icon}`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: person.color,
                      letterSpacing: '0.3px'
                    }}>
                      {person.role}
                    </span>
                    <h4 style={{
                      fontSize: '0.98rem',
                      fontWeight: '700',
                      color: 'var(--text)',
                      margin: 0
                    }}>
                      {person.name}
                    </h4>
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-sub)',
                    lineHeight: '1.45',
                    margin: 0,
                    wordBreak: 'keep-all'
                  }}>
                    {person.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 사랑의지역아동센터 섹션 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div className="page-section-title" style={{ marginBottom: 0 }}>지역 아동 복지</div>
          
          <div style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FEF8EC 100%)',
            border: '1px dashed #F5D3A6',
            borderRadius: 'var(--r)',
            padding: '20px',
            boxShadow: 'var(--shadow-xs)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 배경 미세 장식 아이콘 */}
            <i className="fas fa-hands-holding-child" style={{
              position: 'absolute', bottom: '-15px', right: '-10px',
              fontSize: '4.5rem', color: '#FCECD3', opacity: 0.35,
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{
                background: '#FFF3E0',
                color: '#E65100',
                width: '32px', height: '32px',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0
              }}>
                <i className="fas fa-heart-pulse" />
              </span>
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: '800',
                color: '#D84315',
                margin: 0,
                letterSpacing: '-0.2px'
              }}>
                사랑의지역아동센터
              </h3>
            </div>
            
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--text)',
              lineHeight: '1.7',
              margin: '0 0 14px',
              wordBreak: 'keep-all',
              textAlign: 'justify'
            }}>
              방과 후 돌봄과 배움이 필요한 지역사회의 아동들을 위해 안전하고 건강한 보살핌을 제공하는 따뜻한 공간입니다. 전문적인 학습 지도와 더불어 균형 잡힌 정서 지원, 다채로운 문화 체험을 통해 아이들의 무한한 꿈과 밝은 미래를 함께 키워 나갑니다.
            </p>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              padding: '10px 12px',
              border: '1px solid rgba(230,81,0,0.06)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
              }}>
                <li style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', gap: '6px' }}>
                  <strong style={{ color: '#E65100', flexShrink: 0 }}>• 시설 구분:</strong>
                  <span>지역아동 복지시설 (방과후 돌봄)</span>
                </li>
                <li style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', gap: '6px' }}>
                  <strong style={{ color: '#E65100', flexShrink: 0 }}>• 센터장:</strong>
                  <span>허진영 전도사</span>
                </li>
                <li style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', gap: '6px' }}>
                  <strong style={{ color: '#E65100', flexShrink: 0 }}>• 주요 혜택:</strong>
                  <span>학습 지원, 급식 지도, 정서 케어, 예체능 및 특별활동 제공</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. 목사 이력 및 인사말 (기존 정보 유지) */}
        {history ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div className="page-section-title" style={{ marginBottom: 0 }}>목사 이력</div>
            <div className="card">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                {history}
              </p>
            </div>
          </div>
        ) : null}

        {text ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <div className="page-section-title" style={{ marginBottom: 0 }}>담임목사 인사말</div>
            <div className="card" style={{
              borderLeft: '3px solid var(--primary)',
              borderRadius: '0 var(--r) var(--r) 0',
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                {text}
              </p>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default ChurchInfo;
