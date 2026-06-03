import { useEffect, useMemo, useRef, useState } from 'react';

const TRACKS = [
  {
    id: 'qifengle',
    title: '起风了',
    note: '适合刚翻开第一页的时候',
    src: '/audio/%E8%B5%B7%E9%A3%8E%E4%BA%86.mp3',
    tone: 'butter',
    badge: 'Tape A',
  },
  {
    id: 'doujie-guitar',
    title: '豆姐 Guitar Session',
    note: '更像收尾时的慢慢回响',
    src: '/audio/doujieguitar.mp3',
    tone: 'mint',
    badge: 'Tape B',
  },
] as const;

export function BackgroundMusicCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const activeTrack = TRACKS[activeTrackIndex];
  const currentLabel = useMemo(
    () => `${activeTrack.badge} · ${activeTrack.title}`,
    [activeTrack],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();

    if (!isPlaying) return;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        setIsPlaying(false);
        setErrorMessage('这段音频暂时没能开始播放，点一下再试试。');
      });
    }
  }, [activeTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setErrorMessage('');
    if (isMuted) {
      setIsMuted(false);
      audio.muted = false;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setErrorMessage('浏览器拦住了播放，重新点一下试试。');
    }
  };

  const selectTrack = async (index: number) => {
    if (index === activeTrackIndex) return;
    setErrorMessage('');
    setActiveTrackIndex(index);
  };

  const handleNextTrack = () => {
    const nextIndex = (activeTrackIndex + 1) % TRACKS.length;
    void selectTrack(nextIndex);
  };

  return (
    <section className="background-music-card" aria-labelledby="background-music-title">
      <div className="background-music-copy">
        <div className="background-music-kicker-row">
          <p className="background-music-kicker">BGM ARCHIVE</p>
          <span className={`background-music-status background-music-status-${activeTrack.tone}`}>
            {isPlaying ? 'Now Playing' : 'Muted By Default'}
          </span>
        </div>
        <h3 id="background-music-title">给这一页放一段慢慢响起的背景音乐</h3>
        <p className="background-music-note">
          两段音频都收在这里。默认不自动出声，点一下再让这一页开始有声音。
        </p>

        <div className="background-music-track-list" role="list" aria-label="可选背景音乐">
          {TRACKS.map((track, index) => (
            <button
              key={track.id}
              type="button"
              className={`background-music-track background-music-track-${track.tone} ${index === activeTrackIndex ? 'is-active' : ''}`}
              onClick={() => {
                void selectTrack(index);
              }}
              aria-pressed={index === activeTrackIndex}
            >
              <small>{track.badge}</small>
              <b>{track.title}</b>
              <span>{track.note}</span>
            </button>
          ))}
        </div>

        <div className="background-music-controls">
          <button type="button" className="background-music-primary" onClick={() => { void togglePlayback(); }}>
            {isPlaying ? '暂停这首' : '开始播放'}
          </button>
          <button type="button" className="background-music-secondary" onClick={handleNextTrack}>
            换一首
          </button>
          <button
            type="button"
            className="background-music-secondary"
            onClick={() => setIsMuted((value) => !value)}
            aria-pressed={!isMuted}
          >
            {isMuted ? '开启声音' : '静音一下'}
          </button>
        </div>

        <p className="background-music-meta" aria-live="polite">
          {currentLabel} {isPlaying ? '正在循环播放。' : '已经准备好。'}
        </p>
        {errorMessage && <p className="background-music-error">{errorMessage}</p>}
      </div>

      <div className="background-music-visual" aria-hidden="true">
        <div className={`background-music-vinyl ${isPlaying ? 'is-spinning' : ''}`}>
          <span className="background-music-vinyl-ring background-music-vinyl-ring-one" />
          <span className="background-music-vinyl-ring background-music-vinyl-ring-two" />
          <span className="background-music-vinyl-center" />
        </div>
        <div className="background-music-cassette">
          <span className="background-music-cassette-label">{activeTrack.badge}</span>
          <strong>{activeTrack.title}</strong>
          <div className="background-music-reels">
            <i className={isPlaying ? 'is-spinning' : ''} />
            <i className={isPlaying ? 'is-spinning' : ''} />
          </div>
        </div>
        <div className="background-music-eq">
          <span className={isPlaying ? 'is-active' : ''} />
          <span className={isPlaying ? 'is-active' : ''} />
          <span className={isPlaying ? 'is-active' : ''} />
          <span className={isPlaying ? 'is-active' : ''} />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={activeTrack.src}
        preload="metadata"
        loop
      />
    </section>
  );
}
