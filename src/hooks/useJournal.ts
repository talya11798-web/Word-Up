import { useCallback, useEffect, useState } from 'react';

import type { JournalEntry } from '@/data/types';
import { STORAGE_KEYS } from '@/storage/keys';
import { createId, readJson, writeJson } from '@/storage/storage';

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await readJson<JournalEntry[]>(STORAGE_KEYS.journal, []);
      if (active) {
        setEntries(data);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (next: JournalEntry[]) => {
    setEntries(next);
    await writeJson(STORAGE_KEYS.journal, next);
  }, []);

  const addEntry = useCallback(
    async (title: string, body: string) => {
      const now = new Date().toISOString();
      const entry: JournalEntry = {
        id: createId('journal'),
        title: title.trim() || 'Untitled prayer',
        body: body.trim(),
        createdAt: now,
        updatedAt: now,
      };
      await persist([entry, ...entries]);
      return entry;
    },
    [entries, persist],
  );

  const deleteEntry = useCallback(
    async (id: string) => {
      await persist(entries.filter((entry) => entry.id !== id));
    },
    [entries, persist],
  );

  return { entries, loading, addEntry, deleteEntry };
}
