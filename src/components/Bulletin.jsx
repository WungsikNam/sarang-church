import { useStore } from '../data/StoreContext';

const Bulletin = () => {
  const { store } = useStore();
  const { title, url } = store.bulletin;

  return (
    <div className="page">
      <div className="page-body">
        <div className="bulletin-card">
          <div className="bulletin-icon"><i className="fas fa-book-open" /></div>
          <h2 className="bulletin-title">{title}</h2>
          <p className="bulletin-sub">이번 주 주보를 확인하세요</p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary btn-block">
            <i className="fas fa-file-pdf" />
            주보 보기 / 다운로드
          </a>
        </div>
        <div className="info-note">
          <i className="fas fa-info-circle" />
          <span>PDF 파일이 열리지 않을 경우 브라우저의 PDF 뷰어 또는 외부 앱을 이용해 주세요.</span>
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
