import { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@/theme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  accent?: boolean;
};

export function Card({ children, style, accent = false }: Props) {
  return (
    <View style={[styles.card, accent && styles.accent, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.navyCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  accent: {
    borderColor: 'rgba(47, 155, 255, 0.35)',
    backgroundColor: colors.navyElevated,
  },
});
