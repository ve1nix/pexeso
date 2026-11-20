import type { CssVariables } from 'shared/lib/cssVariables';
import type { Card as CardEntity, CardStatus } from 'shared/model/card';

import { getCardMeta } from '../model/cardMeta';
import styles from './Card.module.css';

interface CardProps {
  card: CardEntity;
  status: CardStatus;
  onFlip: (uid: string) => void;
}

const getCardClassNames = (status: CardStatus): string => {
  const names = [styles.cardButton];

  if (status !== 'hidden') {
    names.push(styles.flipped);
  }
  if (status === 'open') {
    names.push(styles.open);
  }
  if (status === 'matched') {
    names.push(styles.matched);
  }

  return names.join(' ');
};

const getCardLabel = (status: CardStatus, value: number): string => {
  if (status !== 'hidden') {
    return `Карта ${value}`;
  }

  return 'Закрытая карточка';
};

const getGlyphClassName = (value: number): string => {
  if (value === 10) {
    return `${styles.glyph} ${styles.glyphWide}`;
  }

  return styles.glyph;
};

export const Card = ({ card, status, onFlip }: CardProps) => {
  const isFaceUp = status !== 'hidden';
  const meta = getCardMeta(card.face);

  const paletteStyle: CssVariables = {
    '--art-from': meta.palette.artFrom,
    '--art-to': meta.palette.artTo,
    '--art-glow': meta.palette.glow,
    '--art-spark': meta.palette.spark,
    '--glyph-from': meta.palette.glyphFrom,
    '--glyph-to': meta.palette.glyphTo,
    '--glyph-glow': meta.palette.glyphGlow,
    '--accent': meta.palette.accent,
  };


  return (
    <li className={styles.card}>
      <button
        type="button"
        className={getCardClassNames(status)}
        onClick={() => onFlip(card.uid)}
        disabled={isFaceUp}
        aria-label={getCardLabel(status, meta.value)}
      >
        <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
          <span className={styles.backCorners} />
          <span className={`${styles.backBand} ${styles.backBandTop}`} />
          <span className={`${styles.backBand} ${styles.backBandBottom}`} />
          <span className={styles.backFrame} />
          <span className={styles.emblemOuter}>
            <span className={styles.emblem}>
              <span>✦</span>
            </span>
          </span>
        </span>

        <span className={`${styles.face} ${styles.front}`} style={paletteStyle} aria-hidden="true">
          <span className={styles.frameLine} />
          <span className={`${styles.ornament} ${styles.ornamentTop}`} />
          <span className={styles.sigil}>
            <span className={styles.ring} />
            <span className={getGlyphClassName(meta.value)}>
              {meta.value}
            </span>
          </span>
          <span className={`${styles.ornament} ${styles.ornamentBottom}`} />
          <span className={styles.rarityGem} />
        </span>
      </button>
    </li>
  );
};
