import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Translation } from '@/data/types';
import { colors, radii, typography } from '@/theme';

type Props = {
  value: Translation;
  onChange: (value: Translation) => void;
};

const OPTIONS: Translation[] = ['KJV', 'NLT'];

export function TranslationPicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityLabel={`Select ${option}`}
            accessibilityState={{ selected }}
            hitSlop={12}
            onPress={() => onChange(option)}
            style={selected ? styles.chipSelected : styles.chip}
          >
            <Text style={selected ? styles.labelSelected : styles.label}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flex: 1,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.navyMid,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  chipSelected: {
    flex: 1,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    ...typography.bodyBold,
    color: colors.textMuted,
  },
  labelSelected: {
    ...typography.bodyBold,
    color: colors.accentSoft,
  },
});
