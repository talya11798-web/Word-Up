import { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, gradients, spacing, typography } from '@/theme';
import { CheetahAccent } from './CheetahAccent';

type Props = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  showBrand?: boolean;
  showCheetah?: boolean;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  rightSlot?: ReactNode;
};

export function Screen({
  children,
  title,
  subtitle,
  showBrand = false,
  showCheetah = false,
  scroll = true,
  contentStyle,
  rightSlot,
}: Props) {
  const { contentMaxWidth, gutter } = useResponsive();

  const body = (
    <View style={[styles.inner, { maxWidth: contentMaxWidth, paddingHorizontal: gutter }, contentStyle]}>
      {(showBrand || title || showCheetah || rightSlot) && (
        <View style={styles.headerBlock}>
          <View style={styles.headerTop}>
            <View style={styles.headerCopy}>
              {showBrand ? <Text style={styles.brand}>Word Up</Text> : null}
              {title ? (
                <Text style={[styles.title, showBrand && styles.titleUnderBrand]}>
                  {title}
                </Text>
              ) : null}
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            {rightSlot}
          </View>
          {showCheetah ? <CheetahAccent style={styles.cheetah} /> : null}
        </View>
      )}
      {children}
    </View>
  );

  return (
    <LinearGradient colors={[...gradients.screen]} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top', 'left', 'right']}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {body}
          </ScrollView>
        ) : (
          <View style={styles.flex}>{body}</View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  headerBlock: {
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: 6,
  },
  brand: {
    ...typography.brand,
    color: colors.white,
  },
  title: {
    ...typography.h1,
    color: colors.white,
  },
  titleUnderBrand: {
    fontSize: 20,
    fontFamily: 'Outfit_600SemiBold',
    color: colors.accentSoft,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    maxWidth: 520,
  },
  cheetah: {
    alignSelf: 'flex-start',
  },
});
