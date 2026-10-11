import { useCallback, useEffect, useState } from 'react';

import type { UserSettings } from '@/data/types';
import { STORAGE_KEYS } from '@/storage/keys';
import { readJson, writeJson } from '@/storage/storage';

const DEFAULT_SETTINGS: UserSettings = {
  displayName: 'Friend',
  preferredTranslation: 'NLT',
  dailyReminder: true,
  notificationsEnabled: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await readJson<UserSettings>(
        STORAGE_KEYS.settings,
        DEFAULT_SETTINGS,
      );
      if (active) {
        setSettings({ ...DEFAULT_SETTINGS, ...data });
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const updateSettings = useCallback(async (patch: Partial<UserSettings>) => {
    setSettings((current) => {
      const next = { ...current, ...patch };
      void writeJson(STORAGE_KEYS.settings, next);
      return next;
    });
  }, []);

  return { settings, loading, updateSettings };
}
