import { useCallback, useEffect, useState } from 'react';

import type { ReadingPlanProgress } from '@/data/types';
import { STORAGE_KEYS } from '@/storage/keys';
import { readJson, writeJson } from '@/storage/storage';

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingPlanProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await readJson<ReadingPlanProgress[]>(
        STORAGE_KEYS.readingProgress,
        [],
      );
      if (active) {
        setProgress(data);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = useCallback(async (next: ReadingPlanProgress[]) => {
    setProgress(next);
    await writeJson(STORAGE_KEYS.readingProgress, next);
  }, []);

  const toggleDay = useCallback(
    async (planId: string, dayId: string) => {
      const existing = progress.find((item) => item.planId === planId);
      if (!existing) {
        await persist([
          ...progress,
          {
            planId,
            completedDayIds: [dayId],
            updatedAt: new Date().toISOString(),
          },
        ]);
        return;
      }

      const completed = existing.completedDayIds.includes(dayId)
        ? existing.completedDayIds.filter((id) => id !== dayId)
        : [...existing.completedDayIds, dayId];

      await persist(
        progress.map((item) =>
          item.planId === planId
            ? {
                ...item,
                completedDayIds: completed,
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
    },
    [persist, progress],
  );

  const getCompleted = useCallback(
    (planId: string) =>
      progress.find((item) => item.planId === planId)?.completedDayIds ?? [],
    [progress],
  );

  return { progress, loading, toggleDay, getCompleted };
}
