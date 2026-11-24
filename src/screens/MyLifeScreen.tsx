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

type LifePage =
  | "My Life"
  | "Calendar"
  | "To-Do List"
  | "Reminders"
  | "Goals"
  | "Routines";

type MyLifeScreenProps = {
  onBack?: () => void;
  initialPage?: LifePage;
};

export default function MyLifeScreen({
  onBack,
  initialPage = "My Life",
}: MyLifeScreenProps) {
  const [page, setPage] = useState<LifePage>(initialPage);

  const [tasks, setTasks] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const [reminders, setReminders] = useState<string[]>([]);
  const [reminderInput, setReminderInput] = useState("");

  const [goals, setGoals] = useState<string[]>([]);
  const [goalInput, setGoalInput] = useState("");

  const [routines, setRoutines] = useState<string[]>([]);
  const [routineInput, setRoutineInput] = useState("");

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState<{ name: string; date: string }[]>([]);

  const addItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    clear: () => void
  ) => {
    if (!value.trim()) {
      Alert.alert("Add something first", "Type something before adding it.");
      return;
    }
    setter((old) => [...old, value.trim()]);
    clear();
  };

  const toggleComplete = (item: string) => {
    setCompleted((old) =>
      old.includes(item) ? old.filter((x) => x !== item) : [...old, item]
    );
  };

  const addEvent = () => {
    if (!eventName.trim() || !eventDate.trim()) {
      Alert.alert("Missing information", "Add an event name and date.");
      return;
    }
    setEvents((old) => [
      ...old,
      { name: eventName.trim(), date: eventDate.trim() },
    ]);
    setEventName("");
    setEventDate("");
  };

  const addReminder = () =>
    addItem(reminderInput, setReminders, () => setReminderInput(""));
  const addTask = () => addItem(taskInput, setTasks, () => setTaskInput(""));
  const addGoal = () => addItem(goalInput, setGoals, () => setGoalInput(""));
  const addRoutine = () =>
    addItem(routineInput, setRoutines, () => setRoutineInput(""));

  const inputBox = (
    title: string,
    value: string,
    onChange: (value: string) => void,
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

  const listItems = (
    items: string[],
    emptyText: string,
    checkable = false
  ) => (
    <View style={{ marginTop: 10 }}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>{emptyText}</Text>
      ) : (
        items.map((item, index) => (
          <TouchableOpacity
            key={`${item}-${index}`}
            style={styles.listItem}
            onPress={() => checkable && toggleComplete(item)}
          >
            <Text style={styles.listItemText}>
              {checkable
                ? completed.includes(item)
                  ? "☑  "
                  : "☐  "
                : "♡  "}
              {item}
            </Text>
            {checkable && completed.includes(item) && (
              <Text style={styles.doneText}>Done</Text>
            )}
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  const sectionTitle = (title: string, subtitle: string) => (
    <View style={styles.intro}>
      {(onBack || page !== "My Life") && (
        <TouchableOpacity
          onPress={() => {
            if (page !== "My Life") {
              setPage("My Life");
              return;
            }
            onBack?.();
          }}
        >
          <Text style={styles.back}>
            ‹ {page !== "My Life" ? "Back to My Life" : "Back"}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.eyebrow}>{subtitle}</Text>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA ♡</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {page === "My Life" && (
          <View style={styles.content}>
            {sectionTitle("My Life ✨", "YOUR PERSONAL ORGANIZER")}

            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Make today yours.</Text>
              <Text style={styles.welcomeText}>
                Organize your plans, goals, and everyday moments.
              </Text>
            </View>

            <Text style={styles.sectionLabel}>YOUR ORGANIZER</Text>

            {(
              [
                ["Calendar", "📅", "Calendar & Events", "Keep track of important dates"],
                ["To-Do List", "📝", "To-Do List", "Your tasks and checklists"],
                ["Reminders", "🔔", "Reminders", "Things you don't want to forget"],
                ["Goals", "🎯", "Goals", "Your dreams and plans"],
                ["Routines", "🌷", "Daily Routines", "Build your everyday habits"],
              ] as const
            ).map(([next, emoji, title, description]) => (
              <TouchableOpacity
                key={next}
                style={styles.menuCard}
                onPress={() => setPage(next)}
              >
                <Text style={styles.menuEmoji}>{emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>{title}</Text>
                  <Text style={styles.menuDescription}>{description}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {page === "Calendar" && (
          <View style={styles.content}>
            {sectionTitle("Calendar 📅", "YOUR IMPORTANT DATES")}
            {inputBox(
              "Add an event",
              eventName,
              setEventName,
              "Event name...",
              addEvent
            )}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Event date</Text>
              <TextInput
                style={styles.input}
                value={eventDate}
                onChangeText={setEventDate}
                placeholder="Example: November 30, 2026"
                placeholderTextColor="#A89BB3"
              />
              <TouchableOpacity style={styles.addButton} onPress={addEvent}>
                <Text style={styles.addText}>+ Save event</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionLabel}>UPCOMING EVENTS</Text>
            {events.length === 0 ? (
              <Text style={styles.emptyText}>
                Your calendar is waiting for plans ♡
              </Text>
            ) : (
              events.map((event, index) => (
                <View style={styles.listItem} key={`${event.name}-${index}`}>
                  <View>
                    <Text style={styles.listItemText}>{event.name}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {page === "To-Do List" && (
          <View style={styles.content}>
            {sectionTitle("To-Do List 📝", "GET THINGS DONE")}
            {inputBox(
              "Add a task",
              taskInput,
              setTaskInput,
              "What do you need to do?",
              addTask
            )}
            <Text style={styles.sectionLabel}>MY TASKS</Text>
            {listItems(tasks, "No tasks yet. Add your first one!", true)}
            <Text style={styles.progress}>
              {completed.filter((item) => tasks.includes(item)).length} of{" "}
              {tasks.length} tasks completed
            </Text>
          </View>
        )}

        {page === "Reminders" && (
          <View style={styles.content}>
            {sectionTitle("Reminders 🔔", "DON'T FORGET")}
            {inputBox(
              "Add a reminder",
              reminderInput,
              setReminderInput,
              "Remember to...",
              addReminder
            )}
            <Text style={styles.sectionLabel}>MY REMINDERS</Text>
            {listItems(reminders, "No reminders yet ♡")}
          </View>
        )}

        {page === "Goals" && (
          <View style={styles.content}>
            {sectionTitle("My Goals 🎯", "DREAM IT. PLAN IT. DO IT.")}
            {inputBox(
              "Add a goal",
              goalInput,
              setGoalInput,
              "Something I want to achieve...",
              addGoal
            )}
            <Text style={styles.sectionLabel}>MY GOALS</Text>
            {listItems(goals, "Your goals will appear here ♡")}
          </View>
        )}

        {page === "Routines" && (
          <View style={styles.content}>
            {sectionTitle("Daily Routines 🌷", "CREATE YOUR FLOW")}
            {inputBox(
              "Add a routine",
              routineInput,
              setRoutineInput,
              "Example: Read for 15 minutes",
              addRoutine
            )}
            <Text style={styles.sectionLabel}>MY ROUTINES</Text>
            {listItems(routines, "Start building your routine ♡", true)}
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
  welcomeCard: {
    backgroundColor: "#EDE3F7",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  welcomeTitle: { color: DARK, fontWeight: "900", fontSize: 19 },
  welcomeText: { color: "#78678B", marginTop: 7, fontSize: 13 },
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
  progress: { color: P, fontWeight: "800", marginTop: 15 },
  eventDate: { color: "#968AA1", marginTop: 5, fontSize: 12 },
});
