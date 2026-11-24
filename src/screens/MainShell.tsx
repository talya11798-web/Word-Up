import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

const lavender = "#B99AD9";
const dark = "#453653";
const pale = "#F5EFFB";

type MainShellProps = {
  onSignOut?: () => void;
};

export default function MainShell({ onSignOut }: MainShellProps) {
  const [page, setPage] = useState("Home");
  const [moreOpen, setMoreOpen] = useState(false);

  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [doneTasks, setDoneTasks] = useState<string[]>([]);

  const [journal, setJournal] = useState("");
  const [journalEntries, setJournalEntries] = useState<string[]>([]);

  const [periodDate, setPeriodDate] = useState("");
  const [periodHistory, setPeriodHistory] = useState<string[]>([]);
  const [cycleNotes, setCycleNotes] = useState("");

  const [schoolInput, setSchoolInput] = useState("");
  const [schoolTasks, setSchoolTasks] = useState<string[]>([]);

  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [theme, setTheme] = useState("Lavender");
  const [notifications, setNotifications] = useState(true);

  const [beautySaved, setBeautySaved] = useState<string[]>([]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks((old) => [taskInput.trim(), ...old]);
    setTaskInput("");
  };

  const addSchoolTask = () => {
    if (!schoolInput.trim()) return;
    setSchoolTasks((old) => [schoolInput.trim(), ...old]);
    setSchoolInput("");
  };

  const addGoal = () => {
    if (!goalInput.trim()) return;
    setGoals((old) => [goalInput.trim(), ...old]);
    setGoalInput("");
  };

  const saveJournal = () => {
    if (!journal.trim()) return;
    setJournalEntries((old) => [journal.trim(), ...old]);
    setJournal("");
    setPage("Diary");
  };

  const savePeriod = () => {
    if (!periodDate.trim()) return;
    setPeriodHistory((old) => [periodDate.trim(), ...old]);
    setPeriodDate("");
  };

  const toggleTask = (task: string) => {
    setDoneTasks((old) =>
      old.includes(task) ? old.filter((item) => item !== task) : [...old, task]
    );
  };

  const toggleBeauty = (item: string) => {
    setBeautySaved((old) =>
      old.includes(item)
        ? old.filter((value) => value !== item)
        : [...old, item]
    );
  };

  const goTo = (nextPage: string) => {
    setPage(nextPage);
    setMoreOpen(false);
  };

  const heading = (title: string, subtitle?: string) => (
    <View style={styles.heading}>
      <Text style={styles.headingTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );

  const card = (children: React.ReactNode) => (
    <View style={styles.card}>{children}</View>
  );

  const field = (
    value: string,
    onChangeText: (value: string) => void,
    placeholder: string,
    multiline = false
  ) => (
    <TextInput
      style={[styles.input, multiline && styles.multiline]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#A99BB3"
      multiline={multiline}
    />
  );

  const action = (label: string, onPress: () => void) => (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  const item = (label: string, onPress: () => void) => (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Text style={styles.listText}>{label}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  const sectionLabel = (label: string) => (
    <Text style={styles.sectionLabel}>{label}</Text>
  );

  const menu = [
    ["✨", "Beauty & Style"],
    ["📚", "School"],
    ["🌱", "My Growth"],
    ["👤", "Profile"],
    ["⚙️", "Settings"],
  ];

  const mainPages = [
    "Home",
    "My Life",
    "Diary",
    "My Cycle",
    "Beauty & Style",
    "School",
    "My Growth",
    "Profile",
    "Settings",
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <Text style={styles.logo}>
          HER ERA<Text style={styles.logoDot}>.</Text>
        </Text>
        <Text style={styles.topTag}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {page === "Home" && (
          <>
            {heading(
              `Hey${profileName ? `, ${profileName}` : " there"}! ♡`,
              "WELCOME TO YOUR SPACE"
            )}
            <View style={styles.hero}>
              <Text style={styles.heroSmall}>YOUR DAILY REMINDER</Text>
              <Text style={styles.heroTitle}>This is your era.</Text>
              <Text style={styles.heroText}>
                Take your time. Grow at your own pace. Make today yours.
              </Text>
            </View>

            {sectionLabel("YOUR DAY")}
            {card(
              <>
                <Text style={styles.cardTitle}>To-do list</Text>
                <Text style={styles.subtitle}>
                  {tasks.length - doneTasks.filter((t) => tasks.includes(t)).length}{" "}
                  tasks left to do
                </Text>
                {tasks.slice(0, 3).map((task, index) => (
                  <TouchableOpacity
                    key={`${task}-${index}`}
                    style={styles.listItem}
                    onPress={() => toggleTask(task)}
                  >
                    <Text style={styles.listText}>
                      {doneTasks.includes(task) ? "☑ " : "☐ "}
                      {task}
                    </Text>
                  </TouchableOpacity>
                ))}
                {item("Open My Life →", () => goTo("My Life"))}
              </>
            )}

            {sectionLabel("YOUR SPACES")}
            <View style={styles.grid}>
              {[
                ["🗓️", "My Life"],
                ["📔", "Diary"],
                ["🌷", "My Cycle"],
                ["✨", "Beauty & Style"],
                ["📚", "School"],
                ["🌱", "My Growth"],
              ].map(([emoji, name]) => (
                <TouchableOpacity
                  key={name}
                  style={styles.gridCard}
                  onPress={() => goTo(name)}
                >
                  <Text style={styles.gridEmoji}>{emoji}</Text>
                  <Text style={styles.gridText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {page === "My Life" && (
          <>
            {heading("My Life 🗓️", "PLAN YOUR DAYS YOUR WAY")}
            {card(
              <>
                <Text style={styles.cardTitle}>Add a to-do</Text>
                {field(taskInput, setTaskInput, "What do you need to do?")}
                {action("+ Add Task", addTask)}
              </>
            )}
            {sectionLabel("MY TASKS")}
            {card(
              <>
                {tasks.length === 0 && (
                  <Text style={styles.subtitle}>
                    Your list is waiting for you ♡
                  </Text>
                )}
                {tasks.map((task, index) => (
                  <TouchableOpacity
                    key={`${task}-${index}`}
                    style={styles.listItem}
                    onPress={() => toggleTask(task)}
                  >
                    <Text style={styles.listText}>
                      {doneTasks.includes(task) ? "☑ " : "☐ "}
                      {task}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {sectionLabel("LIFE ORGANIZER")}
            {item("Calendar", () => goTo("Calendar"))}
            {item("Reminders", () => goTo("Reminders"))}
            {item("Goals", () => goTo("My Growth"))}
            {item("Daily routines", () => goTo("My Growth"))}
          </>
        )}

        {page === "Diary" && (
          <>
            {heading("The Diary 📔", "A LITTLE SPACE JUST FOR YOU")}
            {card(
              <>
                <Text style={styles.cardTitle}>Write something today</Text>
                {field(journal, setJournal, "What's on your mind?", true)}
                {action("Save Journal Entry ♡", saveJournal)}
              </>
            )}
            {sectionLabel("MY ENTRIES")}
            {card(
              <>
                {journalEntries.length === 0 && (
                  <Text style={styles.subtitle}>
                    Your memories will appear here.
                  </Text>
                )}
                {journalEntries.map((entry, index) => (
                  <View key={`${entry}-${index}`} style={styles.listItem}>
                    <Text style={styles.listText}>{entry}</Text>
                  </View>
                ))}
              </>
            )}
          </>
        )}

        {page === "My Cycle" && (
          <>
            {heading("My Cycle 🌷", "YOUR PERSONAL CYCLE SPACE")}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Get to know your cycle.</Text>
              <Text style={styles.heroText}>
                Keep track of dates and personal notes.
              </Text>
            </View>
            {card(
              <>
                <Text style={styles.cardTitle}>Period start date</Text>
                {field(
                  periodDate,
                  setPeriodDate,
                  "Enter date, e.g. 2026-11-20"
                )}
                {action("Save Period", savePeriod)}
              </>
            )}
            {sectionLabel("CYCLE NOTES")}
            {card(
              <>
                {field(
                  cycleNotes,
                  setCycleNotes,
                  "Add symptoms or notes...",
                  true
                )}
              </>
            )}
            {sectionLabel("PERIOD HISTORY")}
            {card(
              <>
                {periodHistory.length === 0 && (
                  <Text style={styles.subtitle}>
                    Your saved dates will appear here.
                  </Text>
                )}
                {periodHistory.map((date, index) => (
                  <Text style={styles.listText} key={`${date}-${index}`}>
                    🌷 {date}
                  </Text>
                ))}
              </>
            )}
            <Text style={styles.disclaimer}>
              Cycle dates and predictions can vary. This tracker is for personal
              organization, not medical advice. Your information is not yet
              protected by a private account or secure storage.
            </Text>
          </>
        )}

        {page === "Beauty & Style" && (
          <>
            {heading("Beauty & Style ✨", "YOUR INSPIRATION BOARD")}
            <View style={styles.grid}>
              {[
                "Nails 💅",
                "Hair 🎀",
                "Outfits 👗",
                "Makeup 💄",
                "Wishlist 🛍️",
                "Saved Looks ♡",
              ].map((name) => (
                <TouchableOpacity
                  key={name}
                  style={styles.gridCard}
                  onPress={() => toggleBeauty(name)}
                >
                  <Text style={styles.gridText}>{name}</Text>
                  <Text style={styles.subtitle}>
                    {beautySaved.includes(name) ? "Saved ♡" : "Tap to save"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.disclaimer}>
              This is the starter inspiration board. Photo galleries and image
              uploads can be added in a later update.
            </Text>
          </>
        )}

        {page === "School" && (
          <>
            {heading("School 📚", "STAY ON TOP OF YOUR SCHOOL LIFE")}
            {card(
              <>
                <Text style={styles.cardTitle}>Add an assignment</Text>
                {field(
                  schoolInput,
                  setSchoolInput,
                  "Enter homework or assignment"
                )}
                {action("+ Add Assignment", addSchoolTask)}
              </>
            )}
            {sectionLabel("MY ASSIGNMENTS")}
            {card(
              <>
                {schoolTasks.length === 0 && (
                  <Text style={styles.subtitle}>No assignments added yet.</Text>
                )}
                {schoolTasks.map((task, index) => (
                  <Text style={styles.listText} key={`${task}-${index}`}>
                    📚 {task}
                  </Text>
                ))}
              </>
            )}
            {item("Study planner", () => goTo("Study Planner"))}
            {item("Study notes", () => goTo("Study Notes"))}
          </>
        )}

        {page === "My Growth" && (
          <>
            {heading("My Growth 🌱", "BECOMING HER, ONE DAY AT A TIME")}
            {card(
              <>
                <Text style={styles.cardTitle}>My goals</Text>
                {field(goalInput, setGoalInput, "Add a personal goal")}
                {action("+ Add Goal", addGoal)}
                {goals.map((goal, index) => (
                  <Text style={styles.listText} key={`${goal}-${index}`}>
                    🌷 {goal}
                  </Text>
                ))}
              </>
            )}
            {sectionLabel("DAILY REMINDERS")}
            {card(
              <>
                {[
                  "Make time for myself",
                  "Read something inspiring",
                  "Practice gratitude",
                  "Keep learning",
                  "Rest when I need to",
                ].map((value) => (
                  <Text style={styles.listText} key={value}>
                    ♡ {value}
                  </Text>
                ))}
              </>
            )}
            {item("Faith & reflection", () => goTo("Faith & Reflection"))}
          </>
        )}

        {page === "Profile" && (
          <>
            {heading("My Profile 👤", "YOUR PERSONAL SPACE")}
            {card(
              <>
                <Text style={styles.cardTitle}>Your name</Text>
                {field(profileName, setProfileName, "Enter your name")}
                <Text style={styles.cardTitle}>Your bio</Text>
                {field(
                  profileBio,
                  setProfileBio,
                  "A little about you...",
                  true
                )}
                <Text style={styles.subtitle}>HER ERA member ♡</Text>
              </>
            )}
            {item("Settings", () => goTo("Settings"))}
          </>
        )}

        {page === "Settings" && (
          <>
            {heading("Settings ⚙️", "MAKE HER ERA YOURS")}
            {card(
              <>
                <Text style={styles.cardTitle}>Appearance</Text>
                {["Lavender", "Soft Pink", "Cream", "Dark Mode"].map(
                  (value) => (
                    <TouchableOpacity
                      key={value}
                      style={styles.listItem}
                      onPress={() => setTheme(value)}
                    >
                      <Text style={styles.listText}>
                        {theme === value ? "☑ " : "○ "}
                        {value}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
                <Text style={styles.subtitle}>
                  Theme selection is a prototype preference; it does not recolor
                  the app yet.
                </Text>
              </>
            )}
            {card(
              <>
                <Text style={styles.cardTitle}>Notifications</Text>
                <TouchableOpacity
                  onPress={() => setNotifications((old) => !old)}
                >
                  <Text style={styles.listText}>
                    {notifications
                      ? "🔔 Notifications On"
                      : "🔕 Notifications Off"}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.subtitle}>
                  This switch does not yet control phone notifications.
                </Text>
              </>
            )}
            {card(
              <>
                <Text style={styles.cardTitle}>Privacy & Security</Text>
                <Text style={styles.subtitle}>
                  Account sign-in, Face ID, secure PIN, and private data storage
                  are planned features and are not active yet.
                </Text>
              </>
            )}
            {card(
              <>
                <Text style={styles.cardTitle}>About HER ERA</Text>
                <Text style={styles.listText}>
                  YOUR LIFE. YOUR SPACE. YOUR ERA.
                </Text>
                <Text style={styles.subtitle}>Version 1.0 starter</Text>
              </>
            )}
            {onSignOut && (
              <TouchableOpacity style={styles.primaryButton} onPress={onSignOut}>
                <Text style={styles.primaryButtonText}>Sign Out</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {page !== "Home" && !mainPages.includes(page) && (
          <>
            {heading(page, "COMING TO YOUR SPACE")}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Coming soon ♡</Text>
              <Text style={styles.heroText}>
                We&apos;re building this part of HER ERA next.
              </Text>
            </View>
            {action("Back to Home", () => goTo("Home"))}
          </>
        )}

        {moreOpen && (
          <View style={styles.morePanel}>
            {menu.map(([emoji, name]) =>
              item(`${emoji}  ${name}`, () => goTo(name))
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          ["⌂", "Home"],
          ["▦", "My Life"],
          ["♡", "Diary"],
          ["🌷", "My Cycle"],
        ].map(([emoji, name]) => (
          <TouchableOpacity
            key={name}
            style={styles.navButton}
            onPress={() => goTo(name)}
          >
            <Text
              style={[styles.navIcon, page === name && styles.navSelected]}
            >
              {emoji}
            </Text>
            <Text
              style={[styles.navLabel, page === name && styles.navSelected]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setMoreOpen((old) => !old)}
        >
          <Text
            style={[
              styles.navIcon,
              moreOpen && styles.navSelected,
            ]}
          >
            •••
          </Text>
          <Text
            style={[
              styles.navLabel,
              moreOpen && styles.navSelected,
            ]}
          >
            More
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: pale },
  topBar: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "#FFFFFF",
  },
  logo: { fontSize: 25, fontWeight: "900", color: dark, letterSpacing: 3 },
  logoDot: { color: lavender },
  topTag: { color: "#9A8BA5", fontSize: 9, letterSpacing: 2, marginTop: 3 },
  scroll: { padding: 18, paddingBottom: 35 },
  heading: { marginBottom: 18 },
  headingTitle: { fontSize: 27, fontWeight: "800", color: dark },
  subtitle: { fontSize: 12, color: "#91839C", marginTop: 5, lineHeight: 18 },
  hero: {
    backgroundColor: "#E8DDF4",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
  },
  heroSmall: { color: "#806A91", fontSize: 10, letterSpacing: 2 },
  heroTitle: { fontSize: 24, fontWeight: "800", color: dark, marginTop: 8 },
  heroText: { color: "#766681", fontSize: 14, lineHeight: 21, marginTop: 8 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEE5F4",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: dark,
    marginBottom: 10,
  },
  sectionLabel: {
    color: "#927AA7",
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 11,
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F8F4FB",
    borderRadius: 13,
    padding: 14,
    color: dark,
    marginBottom: 12,
    fontSize: 14,
  },
  multiline: { minHeight: 110, textAlignVertical: "top" },
  primaryButton: {
    backgroundColor: lavender,
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 3,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800" },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EAF4",
  },
  listText: { color: dark, fontSize: 14, flexShrink: 1, paddingVertical: 4 },
  arrow: { color: lavender, fontSize: 22 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 17,
    marginBottom: 12,
    minHeight: 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EEE5F4",
  },
  gridEmoji: { fontSize: 24, marginBottom: 8 },
  gridText: { color: dark, fontSize: 14, fontWeight: "700" },
  disclaimer: {
    color: "#8C7E96",
    fontSize: 11,
    lineHeight: 17,
    marginVertical: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE5F4",
  },
  navButton: { alignItems: "center", minWidth: 55 },
  navIcon: { fontSize: 19, color: "#A99BB3" },
  navLabel: { fontSize: 9, color: "#9A8BA5", marginTop: 4 },
  navSelected: { color: "#906BB0", fontWeight: "900" },
  morePanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 10,
  },
});
