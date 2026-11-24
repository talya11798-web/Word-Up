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

type CyclePage =
  | "My Cycle"
  | "Cycle Calendar"
  | "Period Log"
  | "Symptoms"
  | "Cycle History";

const SYMPTOM_OPTIONS = [
  "Cramps",
  "Headache",
  "Bloating",
  "Tiredness",
  "Acne",
  "Mood changes",
  "Tenderness",
  "No symptoms",
];

type MyCycleScreenProps = {
  onBack?: () => void;
  initialPage?: CyclePage;
};

export default function MyCycleScreen({
  onBack,
}: MyCycleScreenProps) {
  const [periodStart, setPeriodStart] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [cycleNotes, setCycleNotes] = useState("");
  const [cycleHistory, setCycleHistory] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const savePeriod = () => {
    if (!periodStart.trim()) {
      Alert.alert("Add a date", "Enter the first day of your period.");
      return;
    }

    setCycleHistory((old) => [periodStart.trim(), ...old]);
    Alert.alert("Period saved ♡", "Your cycle entry has been recorded.");
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((old) =>
      old.includes(symptom)
        ? old.filter((item) => item !== symptom)
        : [...old, symptom]
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
          <View style={styles.intro}>
            {onBack && (
              <TouchableOpacity onPress={onBack}>
                <Text style={styles.back}>‹ Back</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.eyebrow}>YOUR PERSONAL CYCLE SPACE</Text>
            <Text style={styles.heading}>My Cycle 🌷</Text>
          </View>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Get to know your cycle.</Text>
            <Text style={styles.description}>
              Keep track of your period dates, symptoms, and cycle notes.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Period start date</Text>
            <TextInput
              style={styles.input}
              value={periodStart}
              onChangeText={setPeriodStart}
              placeholder="Example: November 20, 2026"
              placeholderTextColor="#A89BB3"
            />

            <Text style={[styles.cardTitle, { marginTop: 14 }]}>
              Typical cycle length (days)
            </Text>
            <TextInput
              style={styles.input}
              value={cycleLength}
              onChangeText={setCycleLength}
              keyboardType="number-pad"
              placeholder="Example: 28"
              placeholderTextColor="#A89BB3"
            />

            <Text style={[styles.cardTitle, { marginTop: 14 }]}>
              Period length (days)
            </Text>
            <TextInput
              style={styles.input}
              value={periodLength}
              onChangeText={setPeriodLength}
              keyboardType="number-pad"
              placeholder="Example: 5"
              placeholderTextColor="#A89BB3"
            />

            <TouchableOpacity style={styles.addButton} onPress={savePeriod}>
              <Text style={styles.addText}>Save Period ♡</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>SYMPTOM CHECK-IN</Text>
          <View style={styles.card}>
            {SYMPTOM_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moodButton,
                  symptoms.includes(item) && styles.selectedMood,
                ]}
                onPress={() => toggleSymptom(item)}
              >
                <Text style={styles.listItemText}>
                  {symptoms.includes(item) ? "☑ " : "☐ "}
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>CYCLE NOTES</Text>
          <View style={styles.card}>
            <TextInput
              style={[styles.input, { height: 110, textAlignVertical: "top" }]}
              value={cycleNotes}
              onChangeText={setCycleNotes}
              multiline
              placeholder="Write down anything you want to remember..."
              placeholderTextColor="#A89BB3"
            />
          </View>

          <Text style={styles.sectionLabel}>PERIOD HISTORY</Text>
          {cycleHistory.length === 0 ? (
            <Text style={styles.emptyText}>
              Your recorded dates will appear here ♡
            </Text>
          ) : (
            cycleHistory.map((date, index) => (
              <View key={`${date}-${index}`} style={styles.listItem}>
                <Text style={styles.listItemText}>🌷 {date}</Text>
              </View>
            ))
          )}

          <Text style={styles.disclaimer}>
            Cycle predictions are estimates, not medical advice. Periods can be
            irregular, especially during the teen years. Your body doesn&apos;t
            have to follow a perfect calendar.
          </Text>
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
    backgroundColor: WHITE,
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
  disclaimer: {
    color: "#968AA1",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
    textAlign: "center",
  },
});
