import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import BeautyScreen from "./BeautyScreen";
import DiaryScreen from "./DiaryScreen";
import MyCycleScreen from "./MyCycleScreen";
import MyLifeScreen from "./MyLifeScreen";
import GrowthScreen from "./GrowthScreen";
import ProfileSettingsScreen from "./ProfileSettingsScreen";
import SchoolScreen from "./SchoolScreen";

type MainShellProps = {
  onSignOut?: () => void;
};

const TOP_TABS = ["Home", "My Life", "Diary", "My Cycle", "More"] as const;

const BEAUTY_CATEGORY_BY_PAGE: Record<
  string,
  | "Nail Inspiration"
  | "Hairstyle Board"
  | "Outfit Planner"
  | "Makeup Inspiration"
  | "Saved Looks"
  | "Beauty Wishlist"
  | undefined
> = {
  Beauty: undefined,
  Nails: "Nail Inspiration",
  Hair: "Hairstyle Board",
  Outfits: "Outfit Planner",
  Makeup: "Makeup Inspiration",
  "Saved Looks": "Saved Looks",
  Wishlist: "Beauty Wishlist",
};

const LIFE_PAGE_BY_ROUTE: Record<
  string,
  "My Life" | "Calendar" | "To-Do List" | "Reminders" | "Goals" | "Routines"
> = {
  "My Life": "My Life",
  Planner: "To-Do List",
  "To-Do List": "To-Do List",
  Calendar: "Calendar",
  Reminders: "Reminders",
  Goals: "Goals",
  Routines: "Routines",
};

const DIARY_PAGE_BY_ROUTE: Record<
  string,
  "Diary" | "New Entry" | "Mood" | "Gratitude" | "Notes"
> = {
  Diary: "Diary",
  Journal: "New Entry",
  "New Entry": "New Entry",
  Mood: "Mood",
  Gratitude: "Gratitude",
  Memories: "Notes",
  Prompts: "New Entry",
  Notes: "Notes",
};

const CYCLE_PAGE_BY_ROUTE: Record<
  string,
  "My Cycle" | "Cycle Calendar" | "Period Log" | "Symptoms" | "Cycle History"
> = {
  "My Cycle": "My Cycle",
  "Cycle Calendar": "Cycle Calendar",
  "Period Log": "Period Log",
  Symptoms: "Symptoms",
  "Cycle History": "Cycle History",
};

const PRIMARY_PAGES = new Set([
  "Home",
  "My Life",
  "Planner",
  "To-Do List",
  "Calendar",
  "Reminders",
  "Goals",
  "Routines",
  "Diary",
  "Journal",
  "New Entry",
  "Mood",
  "Gratitude",
  "Memories",
  "Prompts",
  "Notes",
  "My Cycle",
  "Cycle Calendar",
  "Period Log",
  "Symptoms",
  "Cycle History",
  "Beauty",
  "Nails",
  "Hair",
  "Outfits",
  "Makeup",
  "Saved Looks",
  "Wishlist",
  "School",
  "Homework",
  "Study",
  "Subjects",
  "Flashcards",
  "Tests",
  "My Growth",
  "Habits",
  "Growth Goals",
  "Self-Care",
  "Faith",
  "Reflection",
  "Profile",
  "Edit Profile",
  "Settings",
  "Account",
  "Appearance",
  "Security",
  "Privacy",
  "More",
]);

const SETTINGS_PAGE_BY_ROUTE: Record<
  string,
  | "Profile"
  | "Settings"
  | "Edit Profile"
  | "Account"
  | "Appearance"
  | "Security"
  | "Privacy"
> = {
  Profile: "Profile",
  "Edit Profile": "Edit Profile",
  Settings: "Settings",
  Account: "Account",
  Appearance: "Appearance",
  Security: "Security",
  Privacy: "Privacy",
};

const SCHOOL_PAGES = new Set([
  "School",
  "Homework",
  "Study",
  "Subjects",
  "Flashcards",
  "Tests",
]);

const GROWTH_PAGES = new Set([
  "My Growth",
  "Habits",
  "Growth Goals",
  "Self-Care",
  "Faith",
  "Reflection",
]);

export default function MainShell({ onSignOut }: MainShellProps) {
  const [page, setPage] = useState("Home");
  const [name] = useState("Gorgeous");
  const [tasks, setTasks] = useState(["Finish homework", "Plan tomorrow"]);
  const [newTask, setNewTask] = useState("");

  const button = (label: string, next: string) => (
    <TouchableOpacity style={styles.button} onPress={() => setPage(next)}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const card = (title: string, description: string, next: string) => (
    <TouchableOpacity style={styles.card} onPress={() => setPage(next)}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.open}>EXPLORE →</Text>
    </TouchableOpacity>
  );

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  };

  const isBeautyPage = page in BEAUTY_CATEGORY_BY_PAGE;
  const isLifePage = page in LIFE_PAGE_BY_ROUTE;
  const isDiaryPage = page in DIARY_PAGE_BY_ROUTE;
  const isCyclePage = page in CYCLE_PAGE_BY_ROUTE;
  const isSchoolPage = SCHOOL_PAGES.has(page);
  const isGrowthPage = GROWTH_PAGES.has(page);
  const isSettingsPage = page in SETTINGS_PAGE_BY_ROUTE;

  return (
    <SafeAreaView style={styles.container}>
      {isBeautyPage ? (
        <BeautyScreen
          key={page}
          initialCategory={BEAUTY_CATEGORY_BY_PAGE[page]}
          onBack={() => setPage("More")}
        />
      ) : isLifePage ? (
        <MyLifeScreen
          key={page}
          initialPage={LIFE_PAGE_BY_ROUTE[page]}
          onBack={() => setPage("Home")}
          onOpenCycle={() => setPage("My Cycle")}
          onOpenSchool={() => setPage("School")}
          onOpenGrowth={() => setPage("My Growth")}
          onOpenSettings={() => setPage("Settings")}
          onOpenProfile={() => setPage("Profile")}
        />
      ) : isDiaryPage ? (
        <DiaryScreen
          key={page}
          initialPage={DIARY_PAGE_BY_ROUTE[page]}
          onBack={() => setPage("Home")}
        />
      ) : isCyclePage ? (
        <MyCycleScreen
          key={page}
          initialPage={CYCLE_PAGE_BY_ROUTE[page]}
          onBack={() => setPage("Home")}
        />
      ) : isSchoolPage ? (
        <SchoolScreen key={page} onBack={() => setPage("More")} />
      ) : isGrowthPage ? (
        <GrowthScreen key={page} onBack={() => setPage("More")} />
      ) : isSettingsPage ? (
        <ProfileSettingsScreen
          key={page}
          initialPage={SETTINGS_PAGE_BY_ROUTE[page]}
          onBack={() => setPage("More")}
          onSignOut={onSignOut}
        />
      ) : (
        <>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA</Text>
        <TouchableOpacity onPress={() => setPage("Settings")}>
          <Text style={styles.gear}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {page === "Home" && (
          <>
            <Text style={styles.date}>YOUR NEW BEGINNING ✨</Text>
            <Text style={styles.heading}>Hey, {name} ♡</Text>
            <Text style={styles.description}>Welcome back to your space.</Text>

            <View style={styles.affirmation}>
              <Text style={styles.cardTitle}>TODAY&apos;S AFFIRMATION ✨</Text>
              <Text style={styles.quote}>
                I am becoming the best version of myself.
              </Text>
            </View>

            <Text style={styles.section}>YOUR SPACE</Text>

            <View style={styles.grid}>
              {(
                [
                  ["My Planner", "Plan your day", "My Life"],
                  ["My Diary", "Write your thoughts", "Diary"],
                  ["My Cycle", "Your cycle calendar", "My Cycle"],
                  ["Beauty", "Your beauty boards", "Beauty"],
                  ["School", "Stay organized", "School"],
                  ["My Growth", "Goals and habits", "My Growth"],
                ] as const
              ).map(([title, desc, next]) => (
                <TouchableOpacity
                  key={title}
                  style={styles.gridCard}
                  onPress={() => setPage(next)}
                >
                  <Text style={styles.gridTitle}>{title}</Text>
                  <Text style={styles.gridDescription}>{desc}</Text>
                  <Text style={styles.open}>OPEN →</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.section}>TODAY&apos;S TO-DO LIST</Text>
            <View style={styles.card}>
              {tasks.map((task, index) => (
                <Text key={`${task}-${index}`} style={styles.task}>
                  ♡  {task}
                </Text>
              ))}
              <TextInput
                style={styles.input}
                placeholder="Add a task..."
                placeholderTextColor="#B2A8BF"
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
              />
              <TouchableOpacity onPress={addTask}>
                <Text style={styles.add}>+ ADD TASK</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {page === "More" && (
          <>
            <Text style={styles.heading}>Explore Her Era</Text>
            {card("Beauty & Style", "Nails, hair, outfits and makeup.", "Beauty")}
            {card("School", "Homework, study and subjects.", "School")}
            {card("My Growth", "Habits, goals and faith.", "My Growth")}
            {card("My Profile", "Your Her Era profile.", "Profile")}
            {card("Settings", "Account, privacy and appearance.", "Settings")}
          </>
        )}

        {!PRIMARY_PAGES.has(page) && (
          <>
            <Text style={styles.heading}>{page}</Text>
            <View style={styles.affirmation}>
              <Text style={styles.cardTitle}>COMING SOON ♡</Text>
              <Text style={styles.description}>
                This feature will get its own interactive screen next.
              </Text>
            </View>
            {button("BACK TO HOME", "Home")}
          </>
        )}
      </ScrollView>
        </>
      )}

      <View style={styles.nav}>
        {TOP_TABS.map((tab) => {
          const isActive =
            page === tab ||
            (tab === "My Life" && isLifePage) ||
            (tab === "Diary" && isDiaryPage) ||
            (tab === "My Cycle" && isCyclePage) ||
            (tab === "More" &&
              (page === "More" ||
                isBeautyPage ||
                isSchoolPage ||
                isGrowthPage ||
                isSettingsPage));
          const label = tab === "My Cycle" ? "🌷 Cycle" : tab;
          return (
            <TouchableOpacity key={tab} onPress={() => setPage(tab)}>
              <Text style={[styles.navText, isActive && styles.navActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F6FC" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 25,
    fontWeight: "900",
    color: "#59476F",
    letterSpacing: 5,
  },
  gear: { fontSize: 24, color: "#77618F" },
  content: { padding: 18, paddingBottom: 35 },
  date: {
    color: "#A58AC8",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 12,
  },
  heading: {
    fontSize: 27,
    fontWeight: "900",
    color: "#59476F",
    marginBottom: 10,
  },
  description: {
    color: "#897F94",
    fontSize: 13,
    lineHeight: 21,
    marginVertical: 7,
  },
  affirmation: {
    backgroundColor: "#E8DDF5",
    padding: 20,
    borderRadius: 22,
    marginVertical: 15,
  },
  cardTitle: { color: "#59476F", fontSize: 16, fontWeight: "900" },
  quote: {
    color: "#59476F",
    fontSize: 19,
    fontWeight: "700",
    marginTop: 10,
    lineHeight: 27,
  },
  section: {
    color: "#8F7AA8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 22,
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 16,
    borderRadius: 19,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E9E1F3",
  },
  gridTitle: { color: "#59476F", fontWeight: "900", fontSize: 15 },
  gridDescription: { color: "#897F94", fontSize: 11, marginTop: 7 },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 19,
    borderRadius: 19,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: "#E9E1F3",
  },
  open: {
    color: "#A58AC8",
    fontSize: 10,
    fontWeight: "900",
    marginTop: 10,
  },
  task: { color: "#59476F", paddingVertical: 8, fontSize: 14 },
  input: {
    backgroundColor: "#F9F6FC",
    padding: 13,
    borderRadius: 12,
    marginTop: 12,
    color: "#59476F",
  },
  add: { color: "#9275B6", fontWeight: "900", marginTop: 13 },
  button: {
    backgroundColor: "#B59AD8",
    padding: 17,
    borderRadius: 16,
    marginVertical: 7,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "900", letterSpacing: 1 },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E9E1F3",
  },
  navText: { color: "#A69AB8", fontSize: 10, fontWeight: "700" },
  active: { color: "#59476F", fontWeight: "900" },
  navActive: { color: "#A98BD4", fontWeight: "900" },
});
