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
  "Take a relaxing break",
  "Listen to music",
  "Spend time on a hobby",
  "Tidy my space",
  "Write in my diary",
  "Get enough rest",
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
      old.includes(item)
        ? old.filter((value) => value !== item)
        : [...old, item]
    );
  };

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
            <Text style={styles.welcomeTitle}>
              Becoming her, one day at a time.
            </Text>
            <Text style={styles.description}>
              Your goals, habits, faith, and little moments of growth.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>MY GOALS ✨</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={goalInput}
              onChangeText={setGoalInput}
              placeholder="What's one goal you have?"
              placeholderTextColor="#A89BB3"
              onSubmitEditing={addGrowthGoal}
            />

            <TouchableOpacity style={styles.addButton} onPress={addGrowthGoal}>
              <Text style={styles.addText}>+ Add Goal</Text>
            </TouchableOpacity>

            {growthGoals.map((goal, index) => (
              <View style={styles.listItem} key={`${goal}-${index}`}>
                <Text style={styles.listItemText}>🌷 {goal}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>DAILY HABITS</Text>
          <View style={styles.card}>
            {habits.map((habit) => (
              <TouchableOpacity
                key={habit.name}
                style={styles.listItem}
                onPress={() => toggleHabit(habit.name)}
              >
                <Text style={styles.listItemText}>
                  {habit.done ? "☑ " : "☐ "}
                  {habit.name}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.description}>
              {habits.filter((h) => h.done).length} of {habits.length} habits
              completed
            </Text>
          </View>

          <Text style={styles.sectionTitle}>SELF-CARE CHECKLIST 🧴</Text>
          <View style={styles.card}>
            {SELF_CARE_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.listItem}
                onPress={() => toggleSelfCare(item)}
              >
                <Text style={styles.listItemText}>
                  {selfCare.includes(item) ? "☑ " : "☐ "}
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>FAITH & REFLECTION 🤍</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>My daily reflection</Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: 130,
                  textAlignVertical: "top",
                },
              ]}
              value={growthNotes}
              onChangeText={setGrowthNotes}
              multiline
              placeholder="What did I learn today? What am I grateful for?"
              placeholderTextColor="#A89BB3"
            />
          </View>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>A reminder for you ♡</Text>
            <Text style={styles.description}>
              You don&apos;t have to have everything figured out. Keep learning,
              growing, and becoming yourself.
            </Text>
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
  addButton: {
    backgroundColor: P,
    borderRadius: 12,
    padding: 13,
    alignItems: "center",
    marginTop: 12,
  },
  addText: { color: WHITE, fontWeight: "800" },
  listItem: {
    backgroundColor: "#F8F4FC",
    borderRadius: 14,
    padding: 15,
    marginBottom: 9,
    marginTop: 8,
  },
  listItemText: { color: DARK, fontSize: 14, fontWeight: "600" },
});
