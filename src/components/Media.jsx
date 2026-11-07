import YoutubeCard from './YoutubeCard';

const Media = () => (
  <div className="page">
    <div className="page-body">
      <YoutubeCard className="yt-card-flat" title="유튜브 채널 바로가기" sub="설교 · 찬양 다시보기" />
      <div className="info-note">
        <i className="fas fa-info-circle" />
        <span>유튜브 채널에서 주일 예배, 특별 집회, 찬양 영상을 시청하실 수 있습니다.</span>
      </div>
    </div>
  </div>
);

export default Media;
