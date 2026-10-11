import { StyleSheet, Text, View } from 'react-native';

import { colors, radii, typography } from '@/theme';

type Props = {
  label?: string;
};

export function SampleBadge({ label = 'Sample content' }: Props) {
  return (
    <View style={styles.badge} accessibilityRole="text">
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 200, 87, 0.16)',
    borderColor: 'rgba(255, 200, 87, 0.45)',
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    ...typography.label,
    color: colors.warning,
    textTransform: 'uppercase',
  },
});
