import { useEffect, useRef } from 'react';
import type { MediaAsset } from '../content/journey';

export function LetterPhotoLightbox({
  photo,
  friendName,
  kicker,
  onClose,
}: {
  photo: MediaAsset;
  friendName: string;
  kicker?: string;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(frame);
    };
  }, [onClose]);

  return (
    <div className="letter-photo-lightbox" role="dialog" aria-modal="true" aria-label={`查看 ${friendName} 的照片`}>
      <button
        type="button"
        className="letter-photo-backdrop"
        onClick={onClose}
        aria-label="关闭照片预览"
      />
      <div className="letter-photo-shell" onClick={(event) => event.stopPropagation()}>
        <div className="letter-photo-paper">
          <div className="letter-photo-dialog">
            <div className="letter-photo-frame">
              <span className="letter-photo-star letter-photo-star-one" aria-hidden="true" />
              <span className="letter-photo-star letter-photo-star-two" aria-hidden="true" />
              <span className="letter-photo-tape letter-photo-tape-left" aria-hidden="true" />
              <span className="letter-photo-tape letter-photo-tape-right" aria-hidden="true" />
              <img src={photo.src} alt={photo.alt} className="letter-photo-large" decoding="async" />
              {photo.caption && <p className="letter-photo-caption">{photo.caption}</p>}
            </div>
            <div className="letter-photo-toolbar">
              <span className="letter-photo-kicker">{kicker ?? `PHOTO FOR ${friendName}`}</span>
              <button ref={closeButtonRef} type="button" className="letter-photo-close" onClick={onClose}>
                收起这张照片
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
