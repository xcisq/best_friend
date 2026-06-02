import type { MediaAsset } from '../content/journey';

export function PhotoSlot({
  photo,
  index,
  onOpen,
  buttonRef,
}: {
  photo: MediaAsset;
  index: number;
  onOpen?: () => void;
  buttonRef?: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <figure className={`photo-slot photo-slot-${(index % 3) + 1}`}>
      <div className="photo-tape" aria-hidden="true" />
      {photo.src ? (
        <button
          ref={buttonRef}
          type="button"
          className="photo-slot-button"
          onClick={onOpen}
          aria-label={`放大查看照片：${photo.caption ?? photo.alt}`}
        >
          <span className="photo-slot-frame" aria-hidden="true" />
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" width="720" height="520" />
          <span className="photo-slot-zoom">点击放大</span>
        </button>
      ) : (
        <div className="photo-placeholder" role="img" aria-label={photo.alt}>
          <span aria-hidden="true">＋</span>
          <small>{photo.caption ?? '这里放一张照片'}</small>
        </div>
      )}
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

export function VideoCard({ video }: { video: MediaAsset }) {
  return (
    <div className="video-card">
      <p className="video-label">一段会动的回忆 <span aria-hidden="true">▶</span></p>
      {video.src ? (
        <video controls preload="metadata" poster={video.poster} aria-label={video.alt}>
          <source src={video.src} />
          你的浏览器暂时无法播放这个视频。
        </video>
      ) : (
        <div className="video-placeholder">
          <span aria-hidden="true">▷</span>
          <small>{video.caption ?? '这里可以放一段短视频'}</small>
        </div>
      )}
    </div>
  );
}
