import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { PrimaryButton } from '@/components/PrimaryButton';
import { SampleBadge } from '@/components/SampleBadge';
import { Screen } from '@/components/Screen';
import { StudySection } from '@/components/StudySection';
import { TranslationPicker } from '@/components/TranslationPicker';
import { DEFAULT_REFERENCE, SAMPLE_STUDIES } from '@/data/sampleStudy';
import type { Translation } from '@/data/types';
import { useSavedVerses } from '@/hooks/useSavedVerses';
import { useSettings } from '@/hooks/useSettings';
import { colors, radii, spacing, typography } from '@/theme';

export default function BibleStudyScreen() {
  const { settings, loading: settingsLoading } = useSettings();
  const { saveVerse } = useSavedVerses();
  const [reference, setReference] = useState(DEFAULT_REFERENCE);
  const [translation, setTranslation] = useState<Translation>('NLT');
  const [didHydrateTranslation, setDidHydrateTranslation] = useState(false);

  useEffect(() => {
    if (!settingsLoading && !didHydrateTranslation) {
      setTranslation(settings.preferredTranslation);
      setDidHydrateTranslation(true);
    }
  }, [didHydrateTranslation, settings.preferredTranslation, settingsLoading]);
  const [activeReference, setActiveReference] = useState(DEFAULT_REFERENCE);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const study = SAMPLE_STUDIES[translation];
  const usingSamplePassage = useMemo(
    () =>
      activeReference.trim().toLowerCase() ===
      DEFAULT_REFERENCE.toLowerCase(),
    [activeReference],
  );

  const loadStudy = () => {
    setActiveReference(reference.trim() || DEFAULT_REFERENCE);
    setSelectedAnswer(null);
    setSavedMessage(null);
  };

  const handleSaveVerse = async () => {
    const first = study.verses[0];
    await saveVerse({
      reference: `${activeReference} (${translation})`,
      translation,
      text: first.text,
      note: 'Saved from Bible Study sample content',
    });
    setSavedMessage('Saved to Notes & Verses on this device.');
  };

  return (
    <Screen
      title="Bible Study"
      subtitle="Enter a reference and pick KJV or NLT. Study sections below are sample content for this first version."
    >
      <View style={styles.form}>
        <Text style={styles.label}>Bible reference</Text>
        <TextInput
          value={reference}
          onChangeText={setReference}
          placeholder="e.g. John 3:16-17"
          placeholderTextColor={colors.textDim}
          style={styles.input}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={loadStudy}
        />

        <Text style={styles.label}>Translation</Text>
        <TranslationPicker value={translation} onChange={setTranslation} />

        <PrimaryButton label="Load study layout" onPress={loadStudy} />
      </View>

      <View style={styles.notice}>
        <SampleBadge label="No live Bible API yet" />
        <Text style={styles.noticeText}>
          {usingSamplePassage
            ? `Showing sample study for ${DEFAULT_REFERENCE} in ${translation}.`
            : `You entered “${activeReference}”. Full verse lookup is not connected yet, so the sample ${DEFAULT_REFERENCE} study in ${translation} is shown as a template.`}
        </Text>
      </View>

      <StudySection title="Verse-by-verse breakdown">
        <View style={styles.verseList}>
          {study.verses.map((verse) => (
            <View key={verse.verse} style={styles.verseCard}>
              <Text style={styles.verseRef}>
                v{verse.verse} · {translation}
              </Text>
              <Text style={styles.verseText}>{verse.text}</Text>
              <Text style={styles.verseNote}>{verse.note}</Text>
            </View>
          ))}
        </View>
      </StudySection>

      <StudySection title="Meaning">{study.meaning}</StudySection>
      <StudySection title="Deeper meaning">{study.deeperMeaning}</StudySection>
      <StudySection title="Personal connection">
        {study.personalConnection}
      </StudySection>
      <StudySection title="Big Idea">{study.bigIdea}</StudySection>
      <StudySection title="Life application">{study.lifeApplication}</StudySection>
      <StudySection title="Personal takeaway">
        {study.personalTakeaway}
      </StudySection>
      <StudySection title="Prayer">{study.prayer}</StudySection>

      <StudySection title="Quiz / activity">
        <Text style={styles.quizPrompt}>{study.quizActivity.prompt}</Text>
        <View style={styles.options}>
          {study.quizActivity.options.map((option, index) => {
            const selected = selectedAnswer === index;
            const correct =
              selectedAnswer !== null &&
              index === study.quizActivity.answerIndex;
            const wrong =
              selected && index !== study.quizActivity.answerIndex;
            return (
              <Pressable
                key={option}
                onPress={() => setSelectedAnswer(index)}
                style={[
                  styles.option,
                  selected && styles.optionSelected,
                  correct && styles.optionCorrect,
                  wrong && styles.optionWrong,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
        {selectedAnswer !== null ? (
          <Text style={styles.explanation}>
            {study.quizActivity.explanation}
          </Text>
        ) : null}
      </StudySection>

      <PrimaryButton label="Save first verse locally" onPress={handleSaveVerse} />
      {savedMessage ? <Text style={styles.saved}>{savedMessage}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.sm,
    backgroundColor: colors.navyCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: spacing.xs,
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
  notice: {
    gap: spacing.sm,
  },
  noticeText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  verseList: {
    gap: spacing.sm,
  },
  verseCard: {
    backgroundColor: colors.navyMid,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: 6,
  },
  verseRef: {
    ...typography.label,
    color: colors.accentSoft,
  },
  verseText: {
    ...typography.body,
    color: colors.white,
  },
  verseNote: {
    ...typography.caption,
    color: colors.textMuted,
  },
  quizPrompt: {
    ...typography.bodyBold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  options: {
    gap: 8,
  },
  option: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.navyMid,
    padding: 12,
  },
  optionSelected: {
    borderColor: colors.accent,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: 'rgba(61, 220, 151, 0.12)',
  },
  optionWrong: {
    borderColor: colors.danger,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
  },
  optionText: {
    ...typography.body,
    color: colors.text,
  },
  explanation: {
    ...typography.caption,
    color: colors.accentSoft,
    marginTop: spacing.sm,
  },
  saved: {
    ...typography.caption,
    color: colors.success,
    textAlign: 'center',
  },
});
