export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
};

export type BibleQuiz = {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export const SAMPLE_QUIZZES: BibleQuiz[] = [
  {
    id: 'basics-boost',
    title: 'Bible Basics Boost',
    description: 'Sample quiz — fun check-in, not a grade.',
    questions: [
      {
        id: 'q1',
        prompt: 'How many books are in the Protestant Bible?',
        options: ['39', '66', '27', '100'],
        answerIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Which book tells the Christmas story with shepherds?',
        options: ['Luke', 'Revelation', 'Acts', 'Jonah'],
        answerIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Who wrote many of the New Testament letters?',
        options: ['Paul', 'Noah', 'David', 'Esther'],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 'jesus-journey',
    title: 'Jesus Journey',
    description: 'Sample quiz about moments in Jesus’ life.',
    questions: [
      {
        id: 'q1',
        prompt: 'Jesus grew up in which town?',
        options: ['Nazareth', 'Rome', 'Babylon', 'Tarshish'],
        answerIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'How many disciples did Jesus choose as His closest twelve?',
        options: ['3', '7', '12', '40'],
        answerIndex: 2,
      },
    ],
  },
];
