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

const SUBJECTS = [
  "Math",
  "ELA",
  "Science",
  "Social Studies",
  "Spanish",
  "Other",
];

type SchoolScreenProps = {
  onBack?: () => void;
};

export default function SchoolScreen({ onBack }: SchoolScreenProps) {
  const [schoolTasks, setSchoolTasks] = useState<string[]>([]);
  const [schoolInput, setSchoolInput] = useState("");
  const [schoolSubject, setSchoolSubject] = useState("Math");
  const [schoolCompleted, setSchoolCompleted] = useState<string[]>([]);
  const [studyNotes, setStudyNotes] = useState("");

  const addSchoolTask = () => {
    if (!schoolInput.trim()) return;

    setSchoolTasks((old) => [
      `${schoolSubject}: ${schoolInput.trim()}`,
      ...old,
    ]);
    setSchoolInput("");
  };

  const toggleSchoolTask = (task: string) => {
    setSchoolCompleted((old) =>
      old.includes(task)
        ? old.filter((item) => item !== task)
        : [...old, task]
    );
  };

  const remaining = schoolTasks.length - schoolCompleted.filter((task) =>
    schoolTasks.includes(task)
  ).length;

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

          <Text style={styles.sectionTitle}>MY SCHOOL 📚</Text>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>You&apos;ve got this!</Text>
            <Text style={styles.description}>
              Keep your assignments, subjects, and study notes organized.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add homework</Text>

            <Text style={styles.description}>Choose a subject</Text>

            <View style={styles.chipRow}>
              {SUBJECTS.map((subject) => (
                <TouchableOpacity
                  key={subject}
                  onPress={() => setSchoolSubject(subject)}
                  style={[
                    styles.moodButton,
                    schoolSubject === subject && styles.selectedMood,
                  ]}
                >
                  <Text style={styles.listItemText}>{subject}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              value={schoolInput}
              onChangeText={setSchoolInput}
              placeholder="What homework do you have?"
              placeholderTextColor="#A89BB3"
              onSubmitEditing={addSchoolTask}
            />

            <TouchableOpacity style={styles.addButton} onPress={addSchoolTask}>
              <Text style={styles.addText}>+ Add Assignment</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>MY ASSIGNMENTS</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {remaining} left to complete
            </Text>

            {schoolTasks.length === 0 ? (
              <Text style={styles.emptyText}>
                No assignments yet. Enjoy the free time! ♡
              </Text>
            ) : (
              schoolTasks.map((task, index) => (
                <TouchableOpacity
                  key={`${task}-${index}`}
                  style={styles.listItem}
                  onPress={() => toggleSchoolTask(task)}
                >
                  <Text style={styles.listItemText}>
                    {schoolCompleted.includes(task) ? "☑ " : "☐ "}
                    {task}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>

          <Text style={styles.sectionTitle}>STUDY NOTES ✏️</Text>

          <View style={styles.card}>
            <TextInput
              style={[
                styles.input,
                {
                  height: 150,
                  textAlignVertical: "top",
                },
              ]}
              value={studyNotes}
              onChangeText={setStudyNotes}
              multiline
              placeholder="Write your study notes here..."
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
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    marginBottom: 8,
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
