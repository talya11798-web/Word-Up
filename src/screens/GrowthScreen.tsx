import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const P = "#A98BD4";
const BG = "#F8F4FC";
const DARK = "#423451";
const WHITE = "#FFFFFF";

const SELF_CARE_OPTIONS = [
  "Journal",
  "Stretch",
  "Pray / reflect",
  "Listen to music",
  "Go outside",
  "Rest",
  "Talk to someone I trust",
  "Skincare / shower",
];

type Habit = {
  name: string;
  done: boolean;
};

type GrowthScreenProps = {
  onBack?: () => void;
};

export default function GrowthScreen({ onBack }: GrowthScreenProps) {
  const [growthGoals, setGrowthGoals] = useState<string[]>([]);
  const [goalInput, setGoalInput] = useState("");
  const [habits, setHabits] = useState<Habit[]>([
    { name: "Read something inspiring", done: false },
    { name: "Drink water", done: false },
    { name: "Organize my space", done: false },
    { name: "Take time for myself", done: false },
  ]);
  const [growthNotes, setGrowthNotes] = useState("");
  const [selfCare, setSelfCare] = useState<string[]>([]);

  const addGrowthGoal = () => {
    if (!goalInput.trim()) return;
    setGrowthGoals((old) => [goalInput.trim(), ...old]);
    setGoalInput("");
  };

  const toggleHabit = (name: string) => {
    setHabits((old) =>
      old.map((habit) =>
        habit.name === name ? { ...habit, done: !habit.done } : habit
      )
    );
  };

  const toggleSelfCare = (item: string) => {
    setSelfCare((old) =>
      old.includes(item) ? old.filter((x) => x !== item) : [...old, item]
    );
  };

  const habitsDone = habits.filter((habit) => habit.done).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA ♡</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {onBack && (
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.back}>‹ Back</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.sectionTitle}>MY GROWTH 🌱</Text>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Grow at your own pace.</Text>
            <Text style={styles.description}>
              Set goals, build gentle habits, and make space for self-care.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add a personal goal</Text>
            <TextInput
              style={styles.input}
              value={goalInput}
              onChangeText={setGoalInput}
              placeholder="Something I want to grow in..."
              placeholderTextColor="#A89BB3"
              onSubmitEditing={addGrowthGoal}
            />
            <TouchableOpacity style={styles.addButton} onPress={addGrowthGoal}>
              <Text style={styles.addText}>+ Add Goal</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>MY GOALS</Text>
          {growthGoals.length === 0 ? (
            <Text style={styles.emptyText}>
              Your growth goals will bloom here ♡
            </Text>
          ) : (
            growthGoals.map((goal, index) => (
              <View key={`${goal}-${index}`} style={styles.listItem}>
                <Text style={styles.listItemText}>🌱 {goal}</Text>
              </View>
            ))
          )}

          <Text style={styles.sectionTitle}>TODAY&apos;S HABITS</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {habitsDone} of {habits.length} done today
            </Text>
            {habits.map((habit) => (
              <TouchableOpacity
                key={habit.name}
                style={[
                  styles.moodButton,
                  habit.done && styles.selectedMood,
                ]}
                onPress={() => toggleHabit(habit.name)}
              >
                <Text style={styles.listItemText}>
                  {habit.done ? "☑ " : "☐ "}
                  {habit.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>SELF-CARE CHECK-IN</Text>
          <View style={styles.card}>
            {SELF_CARE_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moodButton,
                  selfCare.includes(item) && styles.selectedMood,
                ]}
                onPress={() => toggleSelfCare(item)}
              >
                <Text style={styles.listItemText}>
                  {selfCare.includes(item) ? "☑ " : "☐ "}
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>GROWTH NOTES</Text>
          <View style={styles.card}>
            <TextInput
              style={[styles.input, styles.notesInput]}
              value={growthNotes}
              onChangeText={setGrowthNotes}
              multiline
              textAlignVertical="top"
              placeholder="Reflections, wins, prayers, or reminders..."
              placeholderTextColor="#A89BB3"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    backgroundColor: "#EDE3F7",
    padding: 22,
    paddingTop: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  logo: { fontSize: 27, fontWeight: "900", color: DARK, letterSpacing: 2 },
  tagline: { fontSize: 9, color: "#78678B", letterSpacing: 2, marginTop: 5 },
  content: { padding: 20, paddingBottom: 35 },
  back: { color: P, fontWeight: "800", fontSize: 14, marginBottom: 14 },
  sectionTitle: {
    color: "#88769D",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    color: "#897D96",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  welcomeCard: {
    backgroundColor: "#EDE3F7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },
  welcomeTitle: { color: DARK, fontWeight: "900", fontSize: 19 },
  card: {
    backgroundColor: WHITE,
    padding: 17,
    borderRadius: 18,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#E9E1F0",
  },
  cardTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F8F4FC",
    borderRadius: 12,
    padding: 14,
    color: DARK,
    fontSize: 14,
    marginTop: 5,
  },
  notesInput: { height: 140, marginTop: 0 },
  addButton: {
    backgroundColor: P,
    borderRadius: 12,
    padding: 13,
    alignItems: "center",
    marginTop: 12,
  },
  addText: { color: WHITE, fontWeight: "800" },
  listItem: {
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 15,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#E9E1F0",
  },
  listItemText: { color: DARK, fontSize: 14, fontWeight: "600" },
  emptyText: {
    color: "#968AA1",
    fontSize: 13,
    marginVertical: 15,
    textAlign: "center",
  },
  moodButton: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#F8F4FC",
  },
  selectedMood: {
    backgroundColor: "#EDE3F7",
    borderWidth: 1,
    borderColor: P,
  },
});
