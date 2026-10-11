import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';
import { Card } from './Card';

type Props = {
  title: string;
  children: ReactNode;
  sample?: boolean;
};

export function StudySection({ title, children, sample = true }: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {sample ? <Text style={styles.sample}>Sample</Text> : null}
      </View>
      {typeof children === 'string' ? (
        <Text style={styles.body}>{children}</Text>
      ) : (
        children
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.white,
    flex: 1,
  },
  sample: {
    ...typography.label,
    color: colors.warning,
    textTransform: 'uppercase',
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
});
