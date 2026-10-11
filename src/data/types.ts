export type Translation = 'KJV' | 'NLT';

export type JournalEntry = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type SavedVerse = {
  id: string;
  reference: string;
  translation: Translation;
  text: string;
  note?: string;
  createdAt: string;
};

export type ReadingPlanProgress = {
  planId: string;
  completedDayIds: string[];
  updatedAt: string;
};

export type QuizAttempt = {
  quizId: string;
  score: number;
  total: number;
  completedAt: string;
};

export type UserSettings = {
  displayName: string;
  preferredTranslation: Translation;
  dailyReminder: boolean;
  notificationsEnabled: boolean;
};

export type StudySectionKey =
  | 'verseBreakdown'
  | 'meaning'
  | 'deeperMeaning'
  | 'personalConnection'
  | 'bigIdea'
  | 'lifeApplication'
  | 'personalTakeaway'
  | 'prayer'
  | 'quizActivity';

export type VerseBreakdownItem = {
  verse: string;
  text: string;
  note: string;
};

export type SampleStudy = {
  reference: string;
  translation: Translation;
  verses: VerseBreakdownItem[];
  meaning: string;
  deeperMeaning: string;
  personalConnection: string;
  bigIdea: string;
  lifeApplication: string;
  personalTakeaway: string;
  prayer: string;
  quizActivity: {
    prompt: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
};
