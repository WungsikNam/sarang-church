import { useState } from 'react';
import { getData } from '../data/store';

const Offering = () => {
  const accounts = getData('accounts');
  const [copied, setCopied] = useState(null);

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(() => alert('복사에 실패했습니다. 직접 입력해 주세요.'));
  };

  return (
    <div className="page">
      <div className="page-body">
        {accounts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon"><i className="fas fa-hand-holding-heart" /></span>
            <p className="empty-state-title">등록된 계좌가 없습니다</p>
          </div>
        ) : (
          <div className="offering-list">
            {accounts.map((a, i) => (
              <div key={a.id ?? i} className="offering-card">
                <div className="offering-label">헌금 계좌</div>
                <div className="offering-title">{a.label}</div>
                <div className="offering-account">
                  <span>
                    <span className="account-bank">{a.bank}</span>
                    <span className="account-num">{a.number}</span>
                  </span>
                  <button className="copy-btn" onClick={() => copy(`${a.bank} ${a.number}`, i)}>
                    {copied === i ? '복사됨 ✓' : '복사'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="info-note">
          <i className="fas fa-info-circle" />
          <span>
            <strong>헌금 안내</strong>
            헌금 시 예금주명 뒤에 성함을 함께 기재해 주시면 감사하겠습니다.
            <br />문의: <a href="tel:032-651-1690" style={{ color: 'inherit' }}>032-651-1690</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Offering;
