import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { useJournal } from '@/hooks/useJournal';
import { colors, radii, spacing, typography } from '@/theme';

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function PrayerJournalScreen() {
  const { entries, addEntry, deleteEntry } = useJournal();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    if (!body.trim()) {
      setError('Write a prayer first — even one sentence counts.');
      return;
    }
    await addEntry(title, body);
    setTitle('');
    setBody('');
    setError(null);
  };

  return (
    <Screen
      title="Prayer Journal"
      subtitle="Private prayers stored on this device with local storage."
    >
      <Card style={styles.composer}>
        <Text style={styles.label}>Title (optional)</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Something on my heart"
          placeholderTextColor={colors.textDim}
          style={styles.input}
        />
        <Text style={styles.label}>Prayer</Text>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Talk to God here..."
          placeholderTextColor={colors.textDim}
          style={[styles.input, styles.multiline]}
          multiline
          textAlignVertical="top"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton label="Save prayer" onPress={onSave} />
      </Card>

      {entries.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No prayers yet"
          message="Your journal entries will show up here after you save one."
        />
      ) : (
        <View style={styles.list}>
          {entries.map((entry) => (
            <Card key={entry.id} style={styles.entry}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDate}>{formatDate(entry.createdAt)}</Text>
              <Text style={styles.entryBody}>{entry.body}</Text>
              <PrimaryButton
                label="Delete"
                variant="danger"
                onPress={() => deleteEntry(entry.id)}
              />
            </Card>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  composer: {
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
    minHeight: 120,
  },
  error: {
    ...typography.caption,
    color: colors.danger,
  },
  list: {
    gap: spacing.md,
  },
  entry: {
    gap: spacing.sm,
  },
  entryTitle: {
    ...typography.h3,
    color: colors.white,
  },
  entryDate: {
    ...typography.caption,
    color: colors.textDim,
  },
  entryBody: {
    ...typography.body,
    color: colors.text,
  },
});
