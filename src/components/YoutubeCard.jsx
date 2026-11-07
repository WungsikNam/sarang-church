export const YOUTUBE_URL = 'https://www.youtube.com/channel/UCdKQePmQrykA5tQhCpiiwAw';

const YoutubeCard = ({ title = '사랑의교회 유튜브', sub = '설교 · 찬양 영상 보러가기', className = '' }) => (
  <a className={`yt-card ${className}`.trim()} href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
    <span className="yt-card-icon"><i className="fab fa-youtube" /></span>
    <span className="yt-card-text">
      <span className="yt-card-title">{title}</span>
      <span className="yt-card-sub">{sub}</span>
    </span>
    <i className="fas fa-arrow-up-right-from-square yt-card-arrow" />
  </a>
);

export default YoutubeCard;
