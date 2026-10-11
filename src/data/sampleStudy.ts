import type { SampleStudy, Translation } from './types';

/** Clearly labeled sample content for the first milestone — not from a live Bible API. */
export const SAMPLE_STUDIES: Record<Translation, SampleStudy> = {
  KJV: {
    reference: 'John 3:16-17',
    translation: 'KJV',
    verses: [
      {
        verse: '16',
        text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
        note: 'God’s love is active — it gives.',
      },
      {
        verse: '17',
        text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.',
        note: 'Jesus came to rescue, not to crush.',
      },
    ],
    meaning:
      'These verses summarize the gospel: God loves people so much that He sent Jesus so anyone who believes can have eternal life.',
    deeperMeaning:
      '“Whosoever” means the invitation is wide open. Faith is not about being perfect — it is about trusting the One who was given for you.',
    personalConnection:
      'Think about a time you felt unseen. This passage says God already saw you and made a way toward life.',
    bigIdea: 'God’s love moves toward you with a gift, not a guilt trip.',
    lifeApplication:
      'Tell one person this week that God is for them. Or write a short note to yourself remembering you are loved on purpose.',
    personalTakeaway:
      'I can rest knowing God wants my life, not my perfection first.',
    prayer:
      'God, thank You for loving the world — and loving me. Help me trust Jesus today and show that love to someone else. Amen.',
    quizActivity: {
      prompt: 'According to this sample study, why did God send His Son?',
      options: [
        'To condemn the world',
        'So the world might be saved through Him',
        'Only for a few special people',
        'To prove who was strongest',
      ],
      answerIndex: 1,
      explanation:
        'John 3:17 (sample KJV text) says Jesus was sent so the world might be saved through Him.',
    },
  },
  NLT: {
    reference: 'John 3:16-17',
    translation: 'NLT',
    verses: [
      {
        verse: '16',
        text: 'For this is how God loved the world: He gave his one and only Son, so that everyone who believes in him will not perish but have eternal life.',
        note: 'Love is shown by giving.',
      },
      {
        verse: '17',
        text: 'God sent his Son into the world not to judge the world, but to save the world through him.',
        note: 'Rescue is the mission.',
      },
    ],
    meaning:
      'In plain words: God loved the world by giving Jesus so everyone who believes can have eternal life.',
    deeperMeaning:
      'Belief here means trusting Jesus with your life. The focus is relationship, not religious performance.',
    personalConnection:
      'When pressure hits at school or online, this verse reminds you that your worth starts with God’s love — not likes.',
    bigIdea: 'God’s love is a gift that opens a door to life.',
    lifeApplication:
      'Memorize one line from this passage, or put it as your lock-screen reminder for seven days.',
    personalTakeaway:
      'I am invited into life with God — not left out of it.',
    prayer:
      'Jesus, thank You for coming to save, not to shame. Help me believe You today and live like someone who is loved. Amen.',
    quizActivity: {
      prompt: 'What is the big idea of this sample NLT study?',
      options: [
        'God only loves people who never mess up',
        'God’s love is a gift that opens a door to life',
        'Faith means knowing every Bible fact',
        'Jesus came mainly to judge everyone',
      ],
      answerIndex: 1,
      explanation:
        'The sample study’s Big Idea is that God’s love is a gift that opens a door to life.',
    },
  },
};

export const DEFAULT_REFERENCE = 'John 3:16-17';
