import { colors, gradients } from './colors';

export { colors, gradients };

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  brand: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 40,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: 'Outfit_700Bold',
    fontSize: 30,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 22,
  },
  h3: {
    fontFamily: 'Outfit_600SemiBold',
    fontSize: 18,
  },
  body: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    letterSpacing: 0.3,
  },
} as const;
