import { Switch, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/Card';
import { CheetahAccent } from '@/components/CheetahAccent';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { TranslationPicker } from '@/components/TranslationPicker';
import { useJournal } from '@/hooks/useJournal';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useSavedVerses } from '@/hooks/useSavedVerses';
import { useSettings } from '@/hooks/useSettings';
import { colors, radii, spacing, typography } from '@/theme';

export default function ProfileScreen() {
  const { settings, updateSettings } = useSettings();
  const { entries } = useJournal();
  const { verses } = useSavedVerses();
  const { progress } = useReadingProgress();
  const { attempts } = useQuizAttempts();

  const completedDays = progress.reduce(
    (sum, item) => sum + item.completedDayIds.length,
    0,
  );

  return (
    <Screen
      title="Profile & Settings"
      subtitle="Personalize Word Up. Preferences save on this device."
      showCheetah
    >
      <Card style={styles.card}>
        <Text style={styles.label}>Display name</Text>
        <TextInput
          value={settings.displayName}
          onChangeText={(displayName) => updateSettings({ displayName })}
          placeholder="Your name"
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />

        <Text style={styles.label}>Preferred translation</Text>
        <TranslationPicker
          value={settings.preferredTranslation}
          onChange={(preferredTranslation) =>
            updateSettings({ preferredTranslation })
          }
        />

        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Daily reminder idea</Text>
            <Text style={styles.switchHint}>
              Saved as a preference only — push notifications are not connected yet.
            </Text>
          </View>
          <Switch
            value={settings.dailyReminder}
            onValueChange={(dailyReminder) => updateSettings({ dailyReminder })}
            trackColor={{ false: colors.navyMid, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchCopy}>
            <Text style={styles.switchTitle}>Notifications</Text>
            <Text style={styles.switchHint}>
              Toggle kept for future setup. No alerts are sent in this version.
            </Text>
          </View>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={(notificationsEnabled) =>
              updateSettings({ notificationsEnabled })
            }
            trackColor={{ false: colors.navyMid, true: colors.accent }}
            thumbColor={colors.white}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.statsTitle}>Your local progress</Text>
        <View style={styles.statsGrid}>
          <Stat label="Prayers" value={String(entries.length)} />
          <Stat label="Verses" value={String(verses.length)} />
          <Stat label="Plan days" value={String(completedDays)} />
          <Stat label="Quizzes" value={String(attempts.length)} />
        </View>
        <CheetahAccent height={40} style={styles.cheetah} />
      </Card>

      <Card>
        <Text style={styles.aboutTitle}>About Word Up</Text>
        <Text style={styles.aboutBody}>
          Milestone 1 includes Home, navigation, starter layouts, a sample Bible
          Study flow, and local storage. A real Bible API and AI study generator
          are not connected yet.
        </Text>
        <PrimaryButton
          label="Reset name to Friend"
          variant="ghost"
          onPress={() => updateSettings({ displayName: 'Friend' })}
        />
      </Card>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  input: {
    ...typography.body,
    color: colors.white,
    backgroundColor: colors.navyMid,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  switchCopy: {
    flex: 1,
    gap: 4,
  },
  switchTitle: {
    ...typography.bodyBold,
    color: colors.white,
  },
  switchHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
  statsTitle: {
    ...typography.h3,
    color: colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  stat: {
    width: '47%',
    backgroundColor: colors.navyMid,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: 4,
  },
  statValue: {
    ...typography.h2,
    color: colors.accentSoft,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  cheetah: {
    maxWidth: 160,
  },
  aboutTitle: {
    ...typography.h3,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  aboutBody: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
});
