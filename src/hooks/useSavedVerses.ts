import { useCallback, useEffect, useState } from 'react';

import type { SavedVerse, Translation } from '@/data/types';
import { STORAGE_KEYS } from '@/storage/keys';
import { createId, readJson, writeJson } from '@/storage/storage';

export function useSavedVerses() {
  const [verses, setVerses] = useState<SavedVerse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await readJson<SavedVerse[]>(STORAGE_KEYS.savedVerses, []);
      if (active) {
        setVerses(data);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (next: SavedVerse[]) => {
    setVerses(next);
    await writeJson(STORAGE_KEYS.savedVerses, next);
  }, []);

  const saveVerse = useCallback(
    async (input: {
      reference: string;
      translation: Translation;
      text: string;
      note?: string;
    }) => {
      const verse: SavedVerse = {
        id: createId('verse'),
        reference: input.reference.trim(),
        translation: input.translation,
        text: input.text.trim(),
        note: input.note?.trim(),
        createdAt: new Date().toISOString(),
      };
      await persist([verse, ...verses]);
      return verse;
    },
    [persist, verses],
  );

  const deleteVerse = useCallback(
    async (id: string) => {
      await persist(verses.filter((verse) => verse.id !== id));
    },
    [persist, verses],
  );

  return { verses, loading, saveVerse, deleteVerse };
}
