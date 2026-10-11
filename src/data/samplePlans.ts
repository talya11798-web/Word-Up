export type ReadingPlan = {
  id: string;
  title: string;
  description: string;
  days: { id: string; label: string; reference: string }[];
};

export const SAMPLE_PLANS: ReadingPlan[] = [
  {
    id: 'gospel-glow',
    title: 'Gospel Glow (7 Days)',
    description: 'A short walk through who Jesus is and why that matters.',
    days: [
      { id: 'gg-1', label: 'Day 1', reference: 'John 1:1-14' },
      { id: 'gg-2', label: 'Day 2', reference: 'Luke 5:17-26' },
      { id: 'gg-3', label: 'Day 3', reference: 'Mark 4:35-41' },
      { id: 'gg-4', label: 'Day 4', reference: 'Matthew 5:1-12' },
      { id: 'gg-5', label: 'Day 5', reference: 'John 11:17-44' },
      { id: 'gg-6', label: 'Day 6', reference: 'Luke 23:32-49' },
      { id: 'gg-7', label: 'Day 7', reference: 'John 20:1-18' },
    ],
  },
  {
    id: 'peace-reset',
    title: 'Peace Reset (5 Days)',
    description: 'Sample plan for anxiety, rest, and trusting God.',
    days: [
      { id: 'pr-1', label: 'Day 1', reference: 'Philippians 4:4-9' },
      { id: 'pr-2', label: 'Day 2', reference: 'Psalm 23' },
      { id: 'pr-3', label: 'Day 3', reference: 'Matthew 6:25-34' },
      { id: 'pr-4', label: 'Day 4', reference: 'Isaiah 26:3-4' },
      { id: 'pr-5', label: 'Day 5', reference: 'John 14:25-27' },
    ],
  },
];
