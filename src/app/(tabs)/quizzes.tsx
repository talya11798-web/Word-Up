import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SampleBadge } from '@/components/SampleBadge';
import { Screen } from '@/components/Screen';
import { SAMPLE_QUIZZES } from '@/data/sampleQuizzes';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import { colors, radii, spacing, typography } from '@/theme';

export default function QuizzesScreen() {
  const { getAttempt, saveAttempt } = useQuizAttempts();
  const [activeQuizId, setActiveQuizId] = useState(SAMPLE_QUIZZES[0]?.id ?? '');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const quiz = useMemo(
    () => SAMPLE_QUIZZES.find((item) => item.id === activeQuizId) ?? SAMPLE_QUIZZES[0],
    [activeQuizId],
  );

  const lastAttempt = quiz ? getAttempt(quiz.id) : undefined;

  const score = useMemo(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.answerIndex ? 1 : 0);
    }, 0);
  }, [answers, quiz]);

  if (!quiz) {
    return (
      <Screen title="Bible Quizzes" subtitle="No quizzes available yet." />
    );
  }

  const onSelectQuiz = (id: string) => {
    setActiveQuizId(id);
    setAnswers({});
    setSubmitted(false);
  };

  const onSubmit = async () => {
    setSubmitted(true);
    await saveAttempt({
      quizId: quiz.id,
      score,
      total: quiz.questions.length,
    });
  };

  return (
    <Screen
      title="Bible Quizzes"
      subtitle="Sample quizzes for practice. Scores save locally on this device."
    >
      <SampleBadge label="Sample quizzes" />

      <View style={styles.quizPicker}>
        {SAMPLE_QUIZZES.map((item) => {
          const selected = item.id === quiz.id;
          const attempt = getAttempt(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectQuiz(item.id)}
              style={[styles.quizChip, selected && styles.quizChipSelected]}
            >
              <Text style={styles.quizChipTitle}>{item.title}</Text>
              <Text style={styles.quizChipMeta}>
                {attempt
                  ? `Last score: ${attempt.score}/${attempt.total}`
                  : item.description}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Card style={styles.quizCard}>
        <Text style={styles.quizTitle}>{quiz.title}</Text>
        <Text style={styles.quizDesc}>{quiz.description}</Text>

        {quiz.questions.map((question, index) => (
          <View key={question.id} style={styles.question}>
            <Text style={styles.prompt}>
              {index + 1}. {question.prompt}
            </Text>
            {question.options.map((option, optionIndex) => {
              const selected = answers[question.id] === optionIndex;
              const showResult = submitted;
              const isCorrect = optionIndex === question.answerIndex;
              return (
                <Pressable
                  key={option}
                  disabled={submitted}
                  onPress={() =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: optionIndex,
                    }))
                  }
                  style={[
                    styles.option,
                    selected && styles.optionSelected,
                    showResult && isCorrect && styles.optionCorrect,
                    showResult && selected && !isCorrect && styles.optionWrong,
                  ]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        {!submitted ? (
          <PrimaryButton
            label="Check answers"
            onPress={onSubmit}
            disabled={Object.keys(answers).length < quiz.questions.length}
          />
        ) : (
          <Text style={styles.result}>
            You scored {score}/{quiz.questions.length}. Nice work — saved locally.
          </Text>
        )}

        {lastAttempt && !submitted ? (
          <Text style={styles.previous}>
            Previous best on this device: {lastAttempt.score}/{lastAttempt.total}
          </Text>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  quizPicker: {
    gap: spacing.sm,
  },
  quizChip: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.navyCard,
    padding: spacing.md,
    gap: 4,
  },
  quizChipSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  quizChipTitle: {
    ...typography.bodyBold,
    color: colors.white,
  },
  quizChipMeta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  quizCard: {
    gap: spacing.md,
  },
  quizTitle: {
    ...typography.h3,
    color: colors.white,
  },
  quizDesc: {
    ...typography.caption,
    color: colors.textMuted,
  },
  question: {
    gap: 8,
  },
  prompt: {
    ...typography.bodyBold,
    color: colors.white,
  },
  option: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.navyMid,
    padding: 12,
  },
  optionSelected: {
    borderColor: colors.accent,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: 'rgba(61, 220, 151, 0.12)',
  },
  optionWrong: {
    borderColor: colors.danger,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
  },
  optionText: {
    ...typography.body,
    color: colors.text,
  },
  result: {
    ...typography.bodyBold,
    color: colors.success,
  },
  previous: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
