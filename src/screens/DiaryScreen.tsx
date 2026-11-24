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

type Entry = {
  title: string;
  text: string;
  mood: string;
  date: string;
};

type DiaryPage =
  | "Diary"
  | "New Entry"
  | "Mood"
  | "Gratitude"
  | "Notes";

type DiaryScreenProps = {
  onBack?: () => void;
  initialPage?: DiaryPage;
};

export default function DiaryScreen({
  onBack,
  initialPage = "Diary",
}: DiaryScreenProps) {
  const [page, setPage] = useState<DiaryPage>(initialPage);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryText, setEntryText] = useState("");
  const [mood, setMood] = useState("😊 Happy");
  const [gratitude, setGratitude] = useState<string[]>([]);
  const [gratitudeInput, setGratitudeInput] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState("");

  const addItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    clear: () => void
  ) => {
    if (!value.trim()) {
      Alert.alert("Add something first", "Type something before adding.");
      return;
    }
    setter((old) => [...old, value.trim()]);
    clear();
  };

  const addEntry = () => {
    if (!entryTitle.trim() || !entryText.trim()) {
      Alert.alert(
        "Missing information",
        "Add a title and write something first."
      );
      return;
    }

    setEntries((old) => [
      {
        title: entryTitle.trim(),
        text: entryText.trim(),
        mood,
        date: new Date().toLocaleDateString(),
      },
      ...old,
    ]);

    setEntryTitle("");
    setEntryText("");
    Alert.alert("Entry saved ♡", "Your journal entry has been added.");
    setPage("Diary");
  };

  const sectionTitle = (title: string, subtitle: string) => (
    <View style={styles.intro}>
      <TouchableOpacity
        onPress={() => {
          if (page !== "Diary") {
            setPage("Diary");
            return;
          }
          onBack?.();
        }}
      >
        <Text style={styles.back}>
          ‹ {page !== "Diary" ? "Back to Diary" : "Back"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.eyebrow}>{subtitle}</Text>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );

  const inputCard = (
    title: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    onAdd: () => void
  ) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#A89BB3"
        onSubmitEditing={onAdd}
      />
      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );

  const menuItem = (
    emoji: string,
    title: string,
    description: string,
    destination: DiaryPage
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
        {page === "Diary" && (
          <View style={styles.content}>
            {sectionTitle("The Diary 📔", "YOUR PRIVATE LITTLE CORNER")}
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>A space just for you.</Text>
              <Text style={styles.description}>
                Write your thoughts, celebrate little moments, and check in with
                yourself.
              </Text>
            </View>
            {menuItem(
              "✍️",
              "New Journal Entry",
              "Write about your day",
              "New Entry"
            )}
            {menuItem(
              "🌈",
              "Mood Check-In",
              "How are you feeling today?",
              "Mood"
            )}
            {menuItem(
              "🌸",
              "Gratitude Journal",
              "Things you're thankful for",
              "Gratitude"
            )}
            {menuItem("🗒️", "My Notes", "Keep your personal notes", "Notes")}

            <Text style={styles.sectionLabel}>RECENT JOURNAL ENTRIES</Text>
            {entries.length === 0 ? (
              <Text style={styles.emptyText}>
                Your first entry is waiting to be written ♡
              </Text>
            ) : (
              entries.slice(0, 5).map((entry, i) => (
                <TouchableOpacity
                  key={`${entry.title}-${i}`}
                  style={styles.card}
                  onPress={() =>
                    Alert.alert(
                      entry.title,
                      `${entry.date} · ${entry.mood}\n\n${entry.text}`
                    )
                  }
                >
                  <Text style={styles.cardTitle}>{entry.title}</Text>
                  <Text style={styles.eventDate}>
                    {entry.date} · {entry.mood}
                  </Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {entry.text}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {page === "New Entry" && (
          <View style={styles.content}>
            {sectionTitle("New Entry ✍️", "LET YOUR THOUGHTS OUT")}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Entry title</Text>
              <TextInput
                style={styles.input}
                value={entryTitle}
                onChangeText={setEntryTitle}
                placeholder="Give your entry a title..."
                placeholderTextColor="#A89BB3"
              />
              <Text style={[styles.cardTitle, { marginTop: 14 }]}>
                How was your day?
              </Text>
              <TextInput
                style={[styles.input, styles.journalInput]}
                value={entryText}
                onChangeText={setEntryText}
                multiline
                textAlignVertical="top"
                placeholder="Dear diary..."
                placeholderTextColor="#A89BB3"
              />
              <TouchableOpacity style={styles.addButton} onPress={addEntry}>
                <Text style={styles.addText}>Save Journal Entry ♡</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {page === "Mood" && (
          <View style={styles.content}>
            {sectionTitle("Mood Check-In 🌈", "HOW ARE YOU FEELING?")}
            <View style={styles.card}>
              {[
                "😊 Happy",
                "😌 Calm",
                "🥰 Excited",
                "😐 Okay",
                "😔 Sad",
                "😣 Stressed",
                "😴 Tired",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.moodButton,
                    mood === item && styles.selectedMood,
                  ]}
                  onPress={() => setMood(item)}
                >
                  <Text style={styles.listItemText}>
                    {item} {mood === item ? "✓" : ""}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  Alert.alert("Mood saved ♡", `Today's mood: ${mood}`);
                  setPage("Diary");
                }}
              >
                <Text style={styles.addText}>Save Today&apos;s Mood</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {page === "Gratitude" && (
          <View style={styles.content}>
            {sectionTitle("Gratitude 🌸", "THE LITTLE THINGS MATTER")}
            {inputCard(
              "I'm thankful for...",
              gratitudeInput,
              setGratitudeInput,
              "Something good in my life...",
              () =>
                addItem(gratitudeInput, setGratitude, () =>
                  setGratitudeInput("")
                )
            )}
            {gratitude.map((item, i) => (
              <View key={`${item}-${i}`} style={styles.listItem}>
                <Text style={styles.listItemText}>🌸 {item}</Text>
              </View>
            ))}
            {gratitude.length === 0 && (
              <Text style={styles.emptyText}>
                Your gratitude list starts here ♡
              </Text>
            )}
          </View>
        )}

        {page === "Notes" && (
          <View style={styles.content}>
            {sectionTitle("My Notes 🗒️", "YOUR IDEAS & THOUGHTS")}
            {inputCard(
              "Write a note",
              noteInput,
              setNoteInput,
              "Type a note...",
              () => addItem(noteInput, setNotes, () => setNoteInput(""))
            )}
            {notes.map((item, i) => (
              <View key={`${item}-${i}`} style={styles.listItem}>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
            {notes.length === 0 && (
              <Text style={styles.emptyText}>No notes yet ♡</Text>
            )}
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
    marginBottom: 22,
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
  journalInput: { height: 180, marginTop: 10 },
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
  eventDate: { color: "#968AA1", marginTop: 5, fontSize: 12 },
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
