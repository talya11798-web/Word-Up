import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const P = "#A98BD4";
const BG = "#F8F4FC";
const DARK = "#423451";
const WHITE = "#FFFFFF";

const SUBJECTS = [
  "Math",
  "Science",
  "English",
  "History",
  "Art",
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
    if (!schoolInput.trim()) {
      Alert.alert("Add something first", "Type a school task before adding.");
      return;
    }
    const label = `${schoolSubject}: ${schoolInput.trim()}`;
    setSchoolTasks((old) => [...old, label]);
    setSchoolInput("");
  };

  const toggleComplete = (task: string) => {
    setSchoolCompleted((old) =>
      old.includes(task) ? old.filter((item) => item !== task) : [...old, task]
    );
  };

  const completedCount = schoolTasks.filter((task) =>
    schoolCompleted.includes(task)
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA ♡</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.intro}>
            {onBack && (
              <TouchableOpacity onPress={onBack}>
                <Text style={styles.back}>‹ Back</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.eyebrow}>STAY ORGANIZED</Text>
            <Text style={styles.heading}>School 📚</Text>
          </View>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Your academic space.</Text>
            <Text style={styles.description}>
              Track homework, pick a subject, and keep study notes in one place.
            </Text>
          </View>

          <Text style={styles.sectionLabel}>SUBJECT</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subjectRow}
          >
            {SUBJECTS.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectChip,
                  schoolSubject === subject && styles.subjectChipActive,
                ]}
                onPress={() => setSchoolSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectText,
                    schoolSubject === subject && styles.subjectTextActive,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add homework / task</Text>
            <TextInput
              style={styles.input}
              value={schoolInput}
              onChangeText={setSchoolInput}
              placeholder={`Something for ${schoolSubject}...`}
              placeholderTextColor="#A89BB3"
              onSubmitEditing={addSchoolTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addSchoolTask}>
              <Text style={styles.addText}>+ Add School Task</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>MY SCHOOL TASKS</Text>
          {schoolTasks.length === 0 ? (
            <Text style={styles.emptyText}>
              Your homework list is waiting ♡
            </Text>
          ) : (
            schoolTasks.map((task, index) => (
              <TouchableOpacity
                key={`${task}-${index}`}
                style={styles.listItem}
                onPress={() => toggleComplete(task)}
              >
                <Text style={styles.listItemText}>
                  {schoolCompleted.includes(task) ? "☑ " : "☐ "}
                  {task}
                </Text>
                {schoolCompleted.includes(task) && (
                  <Text style={styles.doneText}>Done</Text>
                )}
              </TouchableOpacity>
            ))
          )}
          <Text style={styles.progress}>
            {completedCount} of {schoolTasks.length} completed
          </Text>

          <Text style={styles.sectionLabel}>STUDY NOTES</Text>
          <View style={styles.card}>
            <TextInput
              style={[styles.input, styles.notesInput]}
              value={studyNotes}
              onChangeText={setStudyNotes}
              multiline
              textAlignVertical="top"
              placeholder="Key ideas, reminders, or study tips..."
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
  intro: { marginTop: 8, marginBottom: 20 },
  back: { color: P, fontWeight: "800", fontSize: 14, marginBottom: 14 },
  eyebrow: { color: P, fontSize: 10, fontWeight: "900", letterSpacing: 2 },
  heading: { color: DARK, fontSize: 29, fontWeight: "900", marginTop: 7 },
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
  sectionLabel: {
    color: "#88769D",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 12,
  },
  subjectRow: { paddingBottom: 4, gap: 8 },
  subjectChip: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#DDD3E7",
  },
  subjectChipActive: { backgroundColor: P, borderColor: P },
  subjectText: { color: DARK, fontSize: 12, fontWeight: "700" },
  subjectTextActive: { color: WHITE },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: { color: DARK, fontSize: 14, fontWeight: "600", flex: 1 },
  doneText: { color: P, fontSize: 11, fontWeight: "800" },
  emptyText: {
    color: "#968AA1",
    fontSize: 13,
    marginVertical: 15,
    textAlign: "center",
  },
  progress: { color: P, fontWeight: "800", marginTop: 8 },
});
