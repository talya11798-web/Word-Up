import React, { useMemo, useState } from "react";
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
  "Fatigue",
  "Mood swings",
  "Acne",
  "Back pain",
  "Cravings",
];

type MyCycleScreenProps = {
  onBack?: () => void;
  initialPage?: CyclePage;
};

export default function MyCycleScreen({
  onBack,
  initialPage = "My Cycle",
}: MyCycleScreenProps) {
  const [page, setPage] = useState<CyclePage>(initialPage);

  const [periodStart, setPeriodStart] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [periodLength, setPeriodLength] = useState("5");
  const [cycleNotes, setCycleNotes] = useState("");
  const [cycleHistory, setCycleHistory] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const prediction = useMemo(() => {
    if (!periodStart.trim()) return null;
    const start = new Date(periodStart);
    if (Number.isNaN(start.getTime())) return null;

    const cycleDays = Math.max(1, Number(cycleLength) || 28);
    const periodDays = Math.max(1, Number(periodLength) || 5);

    const nextStart = new Date(start);
    nextStart.setDate(nextStart.getDate() + cycleDays);

    const periodEnd = new Date(start);
    periodEnd.setDate(periodEnd.getDate() + periodDays - 1);

    const format = (date: Date) =>
      date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    return {
      periodEnd: format(periodEnd),
      nextStart: format(nextStart),
      cycleDays,
      periodDays,
    };
  }, [periodStart, cycleLength, periodLength]);

  const savePeriod = () => {
    if (!periodStart.trim()) {
      Alert.alert("Add a date", "Enter the first day of your period.");
      return;
    }

    setCycleHistory((old) => [periodStart.trim(), ...old]);
    Alert.alert("Period saved ♡", "Your cycle entry has been recorded.");
    setPage("Cycle History");
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((old) =>
      old.includes(symptom)
        ? old.filter((item) => item !== symptom)
        : [...old, symptom]
    );
  };

  const sectionTitle = (title: string, subtitle: string) => (
    <View style={styles.intro}>
      <TouchableOpacity
        onPress={() => {
          if (page !== "My Cycle") {
            setPage("My Cycle");
            return;
          }
          onBack?.();
        }}
      >
        <Text style={styles.back}>
          ‹ {page !== "My Cycle" ? "Back to My Cycle" : "Back"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.eyebrow}>{subtitle}</Text>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );

  const menuItem = (
    emoji: string,
    title: string,
    description: string,
    destination: CyclePage
  ) => (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={() => setPage(destination)}
    >
      <Text style={styles.menuEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA ♡</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {page === "My Cycle" && (
          <View style={styles.content}>
            {sectionTitle("My Cycle 🌷", "YOUR BODY, YOUR RHYTHM")}
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Track with care.</Text>
              <Text style={styles.description}>
                Log your dates, notice patterns, and keep gentle notes for
                yourself.
              </Text>
            </View>

            {prediction && (
              <View style={styles.predictionCard}>
                <Text style={styles.cardTitle}>ESTIMATED NEXT PERIOD</Text>
                <Text style={styles.predictionDate}>{prediction.nextStart}</Text>
                <Text style={styles.description}>
                  Based on a {prediction.cycleDays}-day cycle. Estimates only —
                  teen cycles can be irregular.
                </Text>
              </View>
            )}

            <Text style={styles.sectionLabel}>YOUR CYCLE TOOLS</Text>
            {menuItem(
              "🗓️",
              "Cycle Calendar",
              "See your estimated window",
              "Cycle Calendar"
            )}
            {menuItem(
              "📝",
              "Period Log",
              "Record start dates and cycle length",
              "Period Log"
            )}
            {menuItem(
              "💜",
              "Symptoms",
              "Note how you're feeling",
              "Symptoms"
            )}
            {menuItem(
              "📊",
              "Cycle History",
              "Review previous entries",
              "Cycle History"
            )}

            <Text style={styles.disclaimer}>
              Cycle predictions are estimates, not medical advice or guarantees.
            </Text>
          </View>
        )}

        {page === "Cycle Calendar" && (
          <View style={styles.content}>
            {sectionTitle("Cycle Calendar 🗓️", "YOUR ESTIMATED WINDOW")}
            {!prediction ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Nothing to show yet</Text>
                <Text style={styles.description}>
                  Add a period start date in Period Log to see an estimate here.
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setPage("Period Log")}
                >
                  <Text style={styles.addText}>Open Period Log</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Current period window</Text>
                  <Text style={styles.listItemText}>
                    Starts: {periodStart.trim()}
                  </Text>
                  <Text style={[styles.listItemText, { marginTop: 8 }]}>
                    Ends around: {prediction.periodEnd}
                  </Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Next estimated start</Text>
                  <Text style={styles.predictionDate}>{prediction.nextStart}</Text>
                  <Text style={styles.description}>
                    {prediction.periodDays}-day period · {prediction.cycleDays}
                    -day cycle
                  </Text>
                </View>
              </>
            )}
            <Text style={styles.disclaimer}>
              These are gentle estimates only — not medical predictions.
            </Text>
          </View>
        )}

        {page === "Period Log" && (
          <View style={styles.content}>
            {sectionTitle("Period Log 📝", "RECORD YOUR DATES")}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Period start date</Text>
              <TextInput
                style={styles.input}
                value={periodStart}
                onChangeText={setPeriodStart}
                placeholder="Example: 2026-11-23"
                placeholderTextColor="#A89BB3"
              />

              <Text style={[styles.cardTitle, { marginTop: 14 }]}>
                Cycle length (days)
              </Text>
              <TextInput
                style={styles.input}
                value={cycleLength}
                onChangeText={setCycleLength}
                keyboardType="number-pad"
                placeholder="28"
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
                placeholder="5"
                placeholderTextColor="#A89BB3"
              />

              <Text style={[styles.cardTitle, { marginTop: 14 }]}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={cycleNotes}
                onChangeText={setCycleNotes}
                multiline
                textAlignVertical="top"
                placeholder="Anything you want to remember..."
                placeholderTextColor="#A89BB3"
              />

              <TouchableOpacity style={styles.addButton} onPress={savePeriod}>
                <Text style={styles.addText}>Save Period ♡</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {page === "Symptoms" && (
          <View style={styles.content}>
            {sectionTitle("Symptoms 💜", "HOW ARE YOU FEELING?")}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tap to select</Text>
              {SYMPTOM_OPTIONS.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.symptomButton,
                    symptoms.includes(item) && styles.selectedSymptom,
                  ]}
                  onPress={() => toggleSymptom(item)}
                >
                  <Text style={styles.listItemText}>
                    {symptoms.includes(item) ? "☑ " : "☐ "}
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  Alert.alert(
                    "Symptoms saved ♡",
                    symptoms.length
                      ? symptoms.join(", ")
                      : "No symptoms selected."
                  )
                }
              >
                <Text style={styles.addText}>Save Today&apos;s Symptoms</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {page === "Cycle History" && (
          <View style={styles.content}>
            {sectionTitle("Cycle History 📊", "YOUR PREVIOUS ENTRIES")}
            {cycleHistory.length === 0 ? (
              <Text style={styles.emptyText}>
                Your cycle history will appear here ♡
              </Text>
            ) : (
              cycleHistory.map((item, index) => (
                <View key={`${item}-${index}`} style={styles.listItem}>
                  <Text style={styles.listItemText}>♡  {item}</Text>
                </View>
              ))
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setPage("Period Log")}
            >
              <Text style={styles.addText}>+ Log another period</Text>
            </TouchableOpacity>
          </View>
        )}
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
  predictionCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E9E1F0",
  },
  predictionDate: {
    color: DARK,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 6,
  },
  sectionLabel: {
    color: "#88769D",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 2,
    marginTop: 10,
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    padding: 16,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9E1F0",
  },
  menuEmoji: { fontSize: 26, marginRight: 14 },
  menuTitle: { color: DARK, fontSize: 15, fontWeight: "800" },
  menuDescription: { color: "#95899F", fontSize: 11, marginTop: 4 },
  arrow: { color: P, fontSize: 25 },
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
  notesInput: { height: 110, marginTop: 10 },
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
  symptomButton: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#F8F4FC",
  },
  selectedSymptom: {
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
