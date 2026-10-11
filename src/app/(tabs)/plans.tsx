import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/Card';
import { SampleBadge } from '@/components/SampleBadge';
import { Screen } from '@/components/Screen';
import { SAMPLE_PLANS } from '@/data/samplePlans';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { colors, radii, spacing, typography } from '@/theme';

export default function ReadingPlansScreen() {
  const { getCompleted, toggleDay } = useReadingProgress();

  return (
    <Screen
      title="Reading Plans"
      subtitle="Sample plans with progress saved on this device."
    >
      <SampleBadge label="Sample plans" />

      {SAMPLE_PLANS.map((plan) => {
        const completed = getCompleted(plan.id);
        const percent = Math.round(
          (completed.length / plan.days.length) * 100,
        );

        return (
          <Card key={plan.id} style={styles.plan}>
            <View style={styles.planHeader}>
              <View style={styles.planCopy}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planDesc}>{plan.description}</Text>
              </View>
              <Text style={styles.percent}>{percent}%</Text>
            </View>

            <View style={styles.track}>
              <View style={[styles.fill, { width: `${percent}%` }]} />
            </View>

            <View style={styles.days}>
              {plan.days.map((day) => {
                const done = completed.includes(day.id);
                return (
                  <Pressable
                    key={day.id}
                    onPress={() => toggleDay(plan.id, day.id)}
                    style={[styles.day, done && styles.dayDone]}
                  >
                    <Ionicons
                      name={done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={done ? colors.success : colors.textDim}
                    />
                    <View style={styles.dayCopy}>
                      <Text style={styles.dayLabel}>{day.label}</Text>
                      <Text style={styles.dayRef}>{day.reference}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  plan: {
    gap: spacing.md,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  planCopy: {
    flex: 1,
    gap: 4,
  },
  planTitle: {
    ...typography.h3,
    color: colors.white,
  },
  planDesc: {
    ...typography.caption,
    color: colors.textMuted,
  },
  percent: {
    ...typography.h3,
    color: colors.accentSoft,
  },
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.navyMid,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  days: {
    gap: 8,
  },
  day: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.navyMid,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayDone: {
    borderColor: 'rgba(61, 220, 151, 0.35)',
  },
  dayCopy: {
    flex: 1,
    gap: 2,
  },
  dayLabel: {
    ...typography.bodyBold,
    color: colors.white,
  },
  dayRef: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
