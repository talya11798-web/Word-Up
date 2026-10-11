import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Card } from '@/components/Card';
import { CheetahAccent } from '@/components/CheetahAccent';
import { Screen } from '@/components/Screen';
import { useResponsive } from '@/hooks/useResponsive';
import { useSettings } from '@/hooks/useSettings';
import { colors, radii, spacing, typography } from '@/theme';

type Shortcut = {
  href: '/study' | '/prayer' | '/notes' | '/plans' | '/quizzes' | '/profile';
  title: string;
  blurb: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SHORTCUTS: Shortcut[] = [
  {
    href: '/study',
    title: 'Bible Study',
    blurb: 'Look up a passage and walk through a study layout.',
    icon: 'book',
  },
  {
    href: '/prayer',
    title: 'Prayer Journal',
    blurb: 'Write prayers and keep them on this device.',
    icon: 'heart',
  },
  {
    href: '/notes',
    title: 'Notes & Verses',
    blurb: 'Save verses and short notes for later.',
    icon: 'bookmark',
  },
  {
    href: '/plans',
    title: 'Reading Plans',
    blurb: 'Track sample plans day by day.',
    icon: 'calendar',
  },
  {
    href: '/quizzes',
    title: 'Bible Quizzes',
    blurb: 'Try sample quizzes and save your score.',
    icon: 'help-circle',
  },
  {
    href: '/profile',
    title: 'Profile',
    blurb: 'Name, translation preference, and settings.',
    icon: 'person',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { settings } = useSettings();
  const { columns, isPhone } = useResponsive();
  const itemWidth =
    isPhone || columns === 1 ? '100%' : columns === 2 ? '48%' : '31%';

  return (
    <Screen showBrand showCheetah subtitle={`Hey ${settings.displayName} — ready to grow?`}>
      <LinearGradient
        colors={['#12243D', '#0A1628']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroEyebrow}>Today’s focus</Text>
        <Text style={styles.heroTitle}>Open the Word. Make it personal.</Text>
        <Text style={styles.heroBody}>
          Start with a study, jot a prayer, or save a verse. Everything on this
          first version stays on your device — no live Bible API yet.
        </Text>
        <Pressable style={styles.cta} onPress={() => router.push('/study')}>
          <Text style={styles.ctaText}>Start a Bible study</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </Pressable>
      </LinearGradient>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Jump in</Text>
        <CheetahAccent height={36} style={styles.miniCheetah} />
      </View>

      <View style={styles.grid}>
        {SHORTCUTS.map((item) => (
          <Pressable
            key={item.href}
            style={[styles.gridItem, { width: itemWidth }]}
            onPress={() => router.push(item.href)}
          >
            <Card style={styles.card}>
              <View style={styles.iconBubble}>
                <Ionicons name={item.icon} size={20} color={colors.accentSoft} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBlurb}>{item.blurb}</Text>
            </Card>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(47, 155, 255, 0.25)',
    gap: spacing.sm,
  },
  heroEyebrow: {
    ...typography.label,
    color: colors.accentSoft,
    textTransform: 'uppercase',
  },
  heroTitle: {
    ...typography.h2,
    color: colors.white,
  },
  heroBody: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  cta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ctaText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.white,
  },
  miniCheetah: {
    maxWidth: 120,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridItem: {
    marginBottom: 0,
  },
  card: {
    minHeight: 140,
    gap: spacing.sm,
  },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.white,
  },
  cardBlurb: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
