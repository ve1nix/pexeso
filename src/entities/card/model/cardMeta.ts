import type { CardFace } from './types';

export interface CardPalette {
  artFrom: string;
  artTo: string;
  glow: string;
  spark: string;
  glyphFrom: string;
  glyphTo: string;
  glyphGlow: string;
  accent: string;
}

export interface CardMeta {
  value: number;
  palette: CardPalette;
}

export const CARD_META: Record<CardFace, CardMeta> = {
  '1': {
    value: 1,
    palette: {
      artFrom: '#a83228',
      artTo: '#2a0806',
      glow: 'rgba(255, 100, 70, 0.38)',
      spark: 'rgba(255, 210, 170, 0.6)',
      glyphFrom: '#fff0e4',
      glyphTo: '#ff7a5c',
      glyphGlow: 'rgba(255, 110, 80, 0.75)',
      accent: '#ff8a6a',
    },
  },
  '2': {
    value: 2,
    palette: {
      artFrom: '#a85a1c',
      artTo: '#331505',
      glow: 'rgba(255, 160, 60, 0.36)',
      spark: 'rgba(255, 225, 170, 0.6)',
      glyphFrom: '#fff4dc',
      glyphTo: '#ffb054',
      glyphGlow: 'rgba(255, 170, 70, 0.75)',
      accent: '#ffba68',
    },
  },
  '3': {
    value: 3,
    palette: {
      artFrom: '#a8852a',
      artTo: '#332608',
      glow: 'rgba(255, 205, 80, 0.36)',
      spark: 'rgba(255, 245, 190, 0.65)',
      glyphFrom: '#fff8d4',
      glyphTo: '#ffd45e',
      glyphGlow: 'rgba(255, 210, 90, 0.75)',
      accent: '#ffdc73',
    },
  },
  '4': {
    value: 4,
    palette: {
      artFrom: '#3f8a44',
      artTo: '#0e2d16',
      glow: 'rgba(120, 220, 130, 0.34)',
      spark: 'rgba(225, 255, 215, 0.6)',
      glyphFrom: '#f4ffe8',
      glyphTo: '#8ed88a',
      glyphGlow: 'rgba(130, 225, 140, 0.72)',
      accent: '#9ce094',
    },
  },
  '5': {
    value: 5,
    palette: {
      artFrom: '#2a8a84',
      artTo: '#082b2a',
      glow: 'rgba(100, 220, 205, 0.34)',
      spark: 'rgba(215, 255, 248, 0.6)',
      glyphFrom: '#eafffb',
      glyphTo: '#6cd8cb',
      glyphGlow: 'rgba(110, 225, 205, 0.72)',
      accent: '#79ded0',
    },
  },
  '6': {
    value: 6,
    palette: {
      artFrom: '#2b6fa8',
      artTo: '#08243e',
      glow: 'rgba(90, 175, 255, 0.36)',
      spark: 'rgba(215, 240, 255, 0.6)',
      glyphFrom: '#eaf6ff',
      glyphTo: '#6cb6ec',
      glyphGlow: 'rgba(100, 180, 255, 0.75)',
      accent: '#7cc4f2',
    },
  },
  '7': {
    value: 7,
    palette: {
      artFrom: '#4a52a8',
      artTo: '#121538',
      glow: 'rgba(140, 150, 255, 0.36)',
      spark: 'rgba(230, 232, 255, 0.6)',
      glyphFrom: '#eef0ff',
      glyphTo: '#9ba4f0',
      glyphGlow: 'rgba(145, 155, 255, 0.75)',
      accent: '#a8b0ff',
    },
  },
  '8': {
    value: 8,
    palette: {
      artFrom: '#6f3fa8',
      artTo: '#201038',
      glow: 'rgba(190, 130, 255, 0.36)',
      spark: 'rgba(245, 225, 255, 0.6)',
      glyphFrom: '#f6eaff',
      glyphTo: '#c294ef',
      glyphGlow: 'rgba(195, 135, 255, 0.75)',
      accent: '#caa0f5',
    },
  },
  '9': {
    value: 9,
    palette: {
      artFrom: '#a83f88',
      artTo: '#38102d',
      glow: 'rgba(255, 130, 215, 0.36)',
      spark: 'rgba(255, 225, 245, 0.6)',
      glyphFrom: '#ffeaf7',
      glyphTo: '#ef94cf',
      glyphGlow: 'rgba(255, 140, 215, 0.75)',
      accent: '#f0a2d8',
    },
  },
  '10': {
    value: 10,
    palette: {
      artFrom: '#a02f3a',
      artTo: '#2c080e',
      glow: 'rgba(255, 110, 120, 0.36)',
      spark: 'rgba(255, 220, 215, 0.6)',
      glyphFrom: '#ffeae8',
      glyphTo: '#ef7c82',
      glyphGlow: 'rgba(255, 120, 130, 0.75)',
      accent: '#f28a90',
    },
  },
};

export const getCardMeta = (face: CardFace): CardMeta => CARD_META[face];
