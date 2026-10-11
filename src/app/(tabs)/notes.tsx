import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { TranslationPicker } from '@/components/TranslationPicker';
import type { Translation } from '@/data/types';
import { useSavedVerses } from '@/hooks/useSavedVerses';
import { useSettings } from '@/hooks/useSettings';
import { colors, radii, spacing, typography } from '@/theme';

export default function NotesScreen() {
  const { settings } = useSettings();
  const { verses, saveVerse, deleteVerse } = useSavedVerses();
  const [reference, setReference] = useState('');
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [translation, setTranslation] = useState<Translation>(
    settings.preferredTranslation,
  );

  const onSave = async () => {
    if (!reference.trim() || !text.trim()) return;
    await saveVerse({ reference, translation, text, note });
    setReference('');
    setText('');
    setNote('');
  };

  return (
    <Screen
      title="Notes & Saved Verses"
      subtitle="Keep verses and short notes on this device. Nothing is uploaded in this version."
    >
      <Card style={styles.form}>
        <Text style={styles.label}>Reference</Text>
        <TextInput
          value={reference}
          onChangeText={setReference}
          placeholder="Psalm 23:1"
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />
        <Text style={styles.label}>Translation</Text>
        <TranslationPicker value={translation} onChange={setTranslation} />
        <Text style={styles.label}>Verse text</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Paste or type the verse"
          placeholderTextColor={colors.textDim}
          style={[styles.input, styles.multiline]}
          multiline
        />
        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Why this verse matters to you"
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />
        <PrimaryButton label="Save verse" onPress={onSave} />
      </Card>

      {verses.length === 0 ? (
        <EmptyState
          icon="bookmark-outline"
          title="No saved verses yet"
          message="Save one from here or from the Bible Study screen."
        />
      ) : (
        <View style={styles.list}>
          {verses.map((verse) => (
            <Card key={verse.id} accent>
              <Text style={styles.ref}>
                {verse.reference} · {verse.translation}
              </Text>
              <Text style={styles.text}>{verse.text}</Text>
              {verse.note ? <Text style={styles.note}>{verse.note}</Text> : null}
              <PrimaryButton
                label="Remove"
                variant="danger"
                onPress={() => deleteVerse(verse.id)}
                style={styles.remove}
              />
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.sm,
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
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  list: {
    gap: spacing.md,
  },
  ref: {
    ...typography.label,
    color: colors.accentSoft,
    marginBottom: 6,
  },
  text: {
    ...typography.body,
    color: colors.white,
  },
  note: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 8,
  },
  remove: {
    marginTop: spacing.sm,
  },
});
