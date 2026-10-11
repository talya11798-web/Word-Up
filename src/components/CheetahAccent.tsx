import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors } from '@/theme';

type Spot = {
  top: number;
  left: number;
  size: number;
  rotate?: string;
};

const SPOTS: Spot[] = [
  { top: 8, left: 12, size: 18 },
  { top: 22, left: 48, size: 14, rotate: '20deg' },
  { top: 10, left: 78, size: 16, rotate: '-12deg' },
  { top: 36, left: 28, size: 12 },
  { top: 40, left: 68, size: 20, rotate: '8deg' },
  { top: 18, left: 110, size: 13 },
  { top: 34, left: 140, size: 15, rotate: '-18deg' },
  { top: 12, left: 165, size: 11 },
];

type Props = {
  style?: ViewStyle;
  height?: number;
};

/** Tasteful cheetah-print strip used sparingly as decoration. */
export function CheetahAccent({ style, height = 56 }: Props) {
  return (
    <View style={[styles.wrap, { height }, style]} pointerEvents="none">
      <View style={styles.base} />
      {SPOTS.map((spot, index) => (
        <View
          key={index}
          style={[
            styles.spot,
            {
              top: spot.top,
              left: spot.left,
              width: spot.size,
              height: spot.size * 0.72,
              transform: [{ rotate: spot.rotate ?? '0deg' }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderRadius: 18,
    width: '100%',
    maxWidth: 220,
  },
  base: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.cheetahTan,
    opacity: 0.9,
  },
  spot: {
    position: 'absolute',
    backgroundColor: colors.cheetahDark,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: colors.cheetahGold,
    opacity: 0.85,
  },
});
