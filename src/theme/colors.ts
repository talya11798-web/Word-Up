export const colors = {
  black: '#05070D',
  navy: '#0A1628',
  navyMid: '#12243D',
  navyCard: '#152A48',
  navyElevated: '#1B3356',
  accent: '#2F9BFF',
  accentSoft: '#5BB4FF',
  accentMuted: 'rgba(47, 155, 255, 0.18)',
  white: '#FFFFFF',
  text: '#F4F7FC',
  textMuted: '#A8B7CC',
  textDim: '#6E8199',
  border: 'rgba(255, 255, 255, 0.08)',
  success: '#3DDC97',
  warning: '#FFC857',
  danger: '#FF6B6B',
  cheetahTan: '#C4A574',
  cheetahDark: '#3A2A1A',
  cheetahGold: '#E8C89A',
  overlay: 'rgba(5, 7, 13, 0.72)',
} as const;

export const gradients = {
  screen: [colors.black, colors.navy, colors.navyMid] as const,
  hero: [colors.navy, '#0D1F3A', colors.black] as const,
  card: [colors.navyCard, colors.navyElevated] as const,
  accent: [colors.accent, '#1A7AE0'] as const,
};
