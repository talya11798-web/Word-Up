import { useCallback, useEffect, useState } from 'react';

import type { QuizAttempt } from '@/data/types';
import { STORAGE_KEYS } from '@/storage/keys';
import { readJson, writeJson } from '@/storage/storage';

export function useQuizAttempts() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await readJson<QuizAttempt[]>(STORAGE_KEYS.quizAttempts, []);
      if (active) {
        setAttempts(data);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const saveAttempt = useCallback(
    async (attempt: Omit<QuizAttempt, 'completedAt'>) => {
      const next: QuizAttempt = {
        ...attempt,
        completedAt: new Date().toISOString(),
      };
      const filtered = attempts.filter((item) => item.quizId !== attempt.quizId);
      const updated = [next, ...filtered];
      setAttempts(updated);
      await writeJson(STORAGE_KEYS.quizAttempts, updated);
    },
    [attempts],
  );

  const getAttempt = useCallback(
    (quizId: string) => attempts.find((item) => item.quizId === quizId),
    [attempts],
  );

  return { attempts, loading, saveAttempt, getAttempt };
}
