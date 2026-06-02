import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { AnimatedIcon } from './craft';
import { CraftPill } from './journal-ui';
import { PhotoSlot, VideoCard } from './LetterMediaCards';
import { LetterPhotoLightbox } from './LetterPhotoLightbox';
import { PaperShape } from './paper-shape';
import {
  createDecoration,
  type DecorationItem,
  type DecorationType,
} from './paper-shape/decorations';
import type { FriendLetter } from '../content/journey';

const INK = '#76513e';

const LETTER_PASSWORDS: Record<string, string | undefined> = {
  wenjin: import.meta.env.VITE_LETTER_PASSWORD_WENJIN,
  dongxu: import.meta.env.VITE_LETTER_PASSWORD_DONGXU,
  zhaobin: import.meta.env.VITE_LETTER_PASSWORD_SHIFU,
  xiaopeng: import.meta.env.VITE_LETTER_PASSWORD_XIAOPENG,
  dichao: import.meta.env.VITE_LETTER_PASSWORD_DICHAO,
  tianyue: import.meta.env.VITE_LETTER_PASSWORD_TIANYUE,
};

function decoration(
  id: string,
  type: DecorationType,
  variant: string,
  x: number,
  y: number,
  rotation = 0,
  scale = 1,
): DecorationItem {
  return {
    ...createDecoration(type, variant, x, y, { rotation, scale }),
    id,
  };
}

const LETTER_DECORATIONS: Record<string, DecorationItem[]> = {
  dichao: [decoration('dichao-tape', 'washi-tape', 'stripe-pink', 46, -10, -5, 1.08)],
  wenjin: [decoration('wenjin-staple', 'staple', 'rose-gold', 40, -8, -7, 1)],
  dongxu: [decoration('dongxu-tape', 'washi-tape', 'dots-mint', 72, -10, 5, 1.06)],
  xiaopeng: [decoration('xiaopeng-staple', 'staple', 'silver', 64, -8, -7, 1)],
  zhaobin: [decoration('zhaobin-tape', 'washi-tape', 'stars-yellow', 90, -10, 4, 1.03)],
  tianyue: [decoration('tianyue-staple', 'staple', 'gold', 58, -8, 6, 1)],
};

function FriendTicket({
  friend,
  active,
  pending,
  onOpen,
  onKeyDown,
  buttonRef,
}: {
  friend: FriendLetter;
  active: boolean;
  pending: boolean;
  onOpen: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <div className={`ticket-wrap ${active ? 'is-active' : ''} ${pending ? 'is-pending' : ''}`}>
      <PaperShape
        preset="ticket"
        width={274}
        height={124}
        roughness={0.46}
        paperColor="cloud"
        strokeColor={INK}
        strokeWidth={1.55}
        shapeParams={{ shadowOpacity: active ? 0.28 : 0.16, edgeWobble: 0.8 }}
        contentPadding={{ all: 13, right: 24 }}
        contentAlign="start"
      >
        <button
          ref={buttonRef}
          type="button"
          className="ticket-button"
          onClick={onOpen}
          onKeyDown={onKeyDown}
          aria-expanded={active}
          aria-controls={pending ? `letter-lock-${friend.id}` : `letter-${friend.id}`}
          aria-label={`${active ? '收起' : pending ? '输入暗号打开' : '拆开'}写给 ${friend.name} 的信。可用方向键切换信件，Escape 收起当前信件。`}
        >
          <span className="ticket-kicker">TO · {friend.name}</span>
          <strong>{friend.nickname ?? '一封信'}</strong>
          <span className="ticket-action">
            <AnimatedIcon name={active ? 'heart' : 'envelope'} trigger="hover" size={16} />
            {active ? '先收好这封信' : pending ? '输入暗号' : '拆开看看'} <i aria-hidden="true">→</i>
          </span>
        </button>
      </PaperShape>
      <span className="ticket-dot" style={{ backgroundColor: friend.accent }} aria-hidden="true" />
    </div>
  );
}

function LetterPasswordGate({
  friend,
  value,
  error,
  inputRef,
  onChange,
  onSubmit,
  onCancel,
}: {
  friend: FriendLetter;
  value: string;
  error: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <div className="letter-password-gate" id={`letter-lock-${friend.id}`}>
      <PaperShape
        preset="folded"
        layoutMode="fill"
        width={520}
        minHeight={178}
        maxWidth={560}
        paperColor="cream"
        strokeColor={INK}
        strokeWidth={1.45}
        roughness={0.46}
        shapeParams={{ shadowOpacity: 0.16, edgeWobble: 0.78 }}
        contentPadding={{ all: 20, top: 22, bottom: 18 }}
        contentAlign="start"
      >
        <form className="letter-password-form" onSubmit={onSubmit}>
          <p>给 {friend.name} 的信，需要先对一下暗号。</p>
          <label>
            <span>输入暗号</span>
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `letter-lock-error-${friend.id}` : undefined}
            />
          </label>
          {error && <small id={`letter-lock-error-${friend.id}`}>{error}</small>}
          <div className="letter-password-actions">
            <button type="submit">拆开这封信</button>
            <button type="button" onClick={onCancel}>先不拆</button>
          </div>
        </form>
      </PaperShape>
    </div>
  );
}

function LetterResetLayer({
  mode,
  friendName,
  onReload,
}: {
  mode: 'pending' | 'open';
  friendName: string;
  onReload: () => void;
}) {
  return (
    <div className="letter-reset-layer" role="note" aria-label="切换下一位查看前的重置操作">
      <div className="letter-reset-copy">
        <p>{mode === 'open' ? `正在查看写给 ${friendName} 的信。` : `正在核对写给 ${friendName} 的暗号。`}</p>

      </div>
      <div className="letter-reset-actions">
        <button type="button" className="is-ghost" onClick={onReload}>整页刷新</button>
      </div>
    </div>
  );
}

function LetterPanel({
  friend,
  panelRef,
  onKeyDown,
  onPhotoOpen,
  photoButtonRef,
}: {
  friend: FriendLetter;
  panelRef: RefObject<HTMLDivElement>;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPhotoOpen: (index: number) => void;
  photoButtonRef: (index: number, node: HTMLButtonElement | null) => void;
}) {
  return (
    <div
      ref={panelRef}
      className="opened-letter"
      id={`letter-${friend.id}`}
      role="region"
      tabIndex={-1}
      aria-labelledby={`letter-title-${friend.id}`}
      onKeyDown={onKeyDown}
    >
      <PaperShape
        preset={friend.paperPreset}
        layoutMode="fill"
        width={780}
        minHeight={560}
        maxWidth={820}
        maxHeight={6000}
        paperColor="cloud"
        strokeColor={INK}
        strokeWidth={1.6}
        roughness={0.54}
        showPattern
        patternType="lines"
        patternParams={{ patternColor: friend.accent, patternOpacity: 0.1, lineGap: 28 }}
        shapeParams={{ shadowOpacity: 0.2, edgeWobble: 1.1 }}
        decorations={LETTER_DECORATIONS[friend.id]}
        contentPadding={{ all: 28, top: 36, bottom: 40 }}
        contentAlign="start"
      >
        <article className="letter-content" style={{ '--friend-accent': friend.accent } as CSSProperties}>
          <header>
            <span className="letter-number">LETTER / {friend.name}</span>
            <h3 id={`letter-title-${friend.id}`}>{friend.greeting}</h3>
          </header>
          <p className="letter-message">{friend.message}</p>
          <div className="photo-collage">
            {friend.photos.map((photo, index) => (
              <PhotoSlot
                key={`${friend.id}-photo-${index}`}
                photo={photo}
                index={index}
                onOpen={() => onPhotoOpen(index)}
                buttonRef={(node) => photoButtonRef(index, node)}
              />
            ))}
          </div>
          {friend.video && <VideoCard video={friend.video} />}
        </article>
      </PaperShape>
    </div>
  );
}

export function FriendLettersSection({ friends }: { friends: FriendLetter[] }) {
  const [openFriendId, setOpenFriendId] = useState<string | null>(null);
  const [pendingFriendId, setPendingFriendId] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const ticketRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const photoButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const letterPanelRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const openFriend = friends.find((friend) => friend.id === openFriendId);
  const pendingFriend = friends.find((friend) => friend.id === pendingFriendId);

  useEffect(() => {
    if (!openFriendId) return;
    const frame = requestAnimationFrame(() => {
      letterPanelRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [openFriendId]);

  useEffect(() => {
    if (!pendingFriendId) return;
    const frame = requestAnimationFrame(() => {
      passwordInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [pendingFriendId]);

  const resetLetterState = (focusFriendId?: string | null) => {
    setOpenFriendId(null);
    setPendingFriendId(null);
    setActivePhotoIndex(null);
    setPasswordValue('');
    setPasswordError('');
    if (focusFriendId) {
      requestAnimationFrame(() => focusTicket(focusFriendId));
    }
  };

  const toggleFriend = (friendId: string) => {
    if (openFriendId === friendId) {
      resetLetterState(friendId);
      return;
    }
    setOpenFriendId(null);
    setPendingFriendId(friendId);
    setPasswordValue('');
    setPasswordError('');
  };

  const focusTicket = (friendId: string) => {
    ticketRefs.current[friendId]?.focus();
  };

  const focusTicketByOffset = (friendId: string, offset: number) => {
    const currentIndex = friends.findIndex((friend) => friend.id === friendId);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + offset + friends.length) % friends.length;
    focusTicket(friends[nextIndex].id);
  };

  const handleTicketKeyDown = (event: KeyboardEvent<HTMLButtonElement>, friendId: string) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      focusTicketByOffset(friendId, 1);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusTicketByOffset(friendId, -1);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      focusTicket(friends[0].id);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      focusTicket(friends[friends.length - 1].id);
      return;
    }
    if (event.key === 'Escape' && openFriendId) {
      event.preventDefault();
      resetLetterState(friendId);
    }
    if (event.key === 'Escape' && pendingFriendId) {
      event.preventDefault();
      resetLetterState(friendId);
    }
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingFriendId) return;
    const expectedPassword = LETTER_PASSWORDS[pendingFriendId];
    if (!expectedPassword) {
      setPasswordError('这封信还没有配置暗号。');
      return;
    }
    if (passwordValue.trim() !== expectedPassword) {
      setPasswordError('暗号不对，再试一次。');
      return;
    }
    setOpenFriendId(pendingFriendId);
    setPendingFriendId(null);
    setPasswordValue('');
    setPasswordError('');
  };

  const cancelPasswordGate = () => {
    const closingFriendId = pendingFriendId;
    resetLetterState(closingFriendId);
  };

  const handleLetterKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !openFriendId) return;
    event.preventDefault();
    resetLetterState(openFriendId);
  };

  const closePhotoPreview = () => {
    if (!openFriendId || activePhotoIndex === null) return;
    const buttonKey = `${openFriendId}-${activePhotoIndex}`;
    setActivePhotoIndex(null);
    requestAnimationFrame(() => {
      photoButtonRefs.current[buttonKey]?.focus();
    });
  };

  return (
    <>
      <div className="tickets-grid">
        {friends.map((friend) => (
          <FriendTicket
            key={friend.id}
            friend={friend}
            active={friend.id === openFriendId}
            pending={friend.id === pendingFriendId}
            onOpen={() => toggleFriend(friend.id)}
            onKeyDown={(event) => handleTicketKeyDown(event, friend.id)}
            buttonRef={(node) => {
              ticketRefs.current[friend.id] = node;
            }}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {openFriend
          ? `已展开写给 ${openFriend.name} 的信。按 Escape 可以收起。`
          : pendingFriend
            ? `正在验证写给 ${pendingFriend.name} 的信。`
            : '当前没有展开的信。'}
      </p>

      {(pendingFriend || openFriend) && (
        <LetterResetLayer
          mode={openFriend ? 'open' : 'pending'}
          friendName={openFriend?.name ?? pendingFriend?.name ?? 'TA'}
          onReload={() => window.location.reload()}
        />
      )}

      {pendingFriend ? (
        <LetterPasswordGate
          friend={pendingFriend}
          value={passwordValue}
          error={passwordError}
          inputRef={passwordInputRef}
          onChange={(value) => {
            setPasswordValue(value);
            setPasswordError('');
          }}
          onSubmit={handlePasswordSubmit}
          onCancel={cancelPasswordGate}
        />
      ) : openFriend ? (
        <LetterPanel
          key={openFriend.id}
          friend={openFriend}
          panelRef={letterPanelRef}
          onKeyDown={handleLetterKeyDown}
          onPhotoOpen={setActivePhotoIndex}
          photoButtonRef={(index, node) => {
            photoButtonRefs.current[`${openFriend.id}-${index}`] = node;
          }}
        />
      ) : (
        <div className="letters-empty">
          <CraftPill tone="butter" icon="↑" tilt={-2}>先挑一封信拆开看看</CraftPill>
        </div>
      )}

      {openFriend && activePhotoIndex !== null && openFriend.photos[activePhotoIndex] && (
        <LetterPhotoLightbox
          photo={openFriend.photos[activePhotoIndex]}
          friendName={openFriend.name}
          onClose={closePhotoPreview}
        />
      )}
    </>
  );
}
