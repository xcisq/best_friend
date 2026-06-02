import { useRef, useState } from 'react';
import type { PhotoWallAsset } from '../content/journey';
import { LetterPhotoLightbox } from './LetterPhotoLightbox';

export function MemoryPhotoWall({ photos }: { photos: PhotoWallAsset[] }) {
  const [activePhoto, setActivePhoto] = useState<PhotoWallAsset | null>(null);
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openPhoto = (photo: PhotoWallAsset, button: HTMLButtonElement) => {
    activeButtonRef.current = button;
    setActivePhoto(photo);
  };

  const closePhoto = () => {
    setActivePhoto(null);
    requestAnimationFrame(() => activeButtonRef.current?.focus());
  };

  return (
    <section className="memory-photo-wall" aria-labelledby="memory-photo-wall-title">
      <div className="memory-photo-wall-heading">
        <div>
          <p>MEMORY WALL · CLICK TO OPEN</p>
          <h3 id="memory-photo-wall-title">把一起走过的瞬间，贴成一小面照片墙。</h3>
        </div>
        <span>{photos.length} 张回忆</span>
      </div>

      <div className="memory-photo-wall-grid">
        {photos.map((photo, index) => (
          <figure
            key={photo.id}
            className={`memory-wall-photo memory-wall-photo-${photo.frame} memory-wall-photo-${(index % 6) + 1}`}
          >
            <span className="memory-wall-fixing" aria-hidden="true" />
            <button
              type="button"
              onClick={(event) => openPhoto(photo, event.currentTarget)}
              aria-label={`放大查看照片：${photo.caption ?? photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                width="360"
                height="280"
              />
              <span className="memory-wall-zoom">＋</span>
            </button>
            {photo.wallNote && <figcaption>{photo.wallNote}</figcaption>}
          </figure>
        ))}
      </div>

      {activePhoto && (
        <LetterPhotoLightbox
          photo={activePhoto}
          friendName="照片墙"
          kicker="MEMORY WALL · 一起走过"
          onClose={closePhoto}
        />
      )}
    </section>
  );
}
