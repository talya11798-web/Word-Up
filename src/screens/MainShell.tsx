import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, shadow } from "../theme";

type MainShellProps = {
  onSignOut?: () => void;
};

const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function MainShell({ onSignOut }: MainShellProps) {
  const [page, setPage] = useState("Home");
  const [moreOpen, setMoreOpen] = useState(false);

  const [tasks, setTasks] = useState<string[]>([
    "Finish homework",
    "Plan tomorrow",
  ]);
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
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    []
  );

  const displayName = profileName.trim() || "Gorgeous";
  const tasksLeft =
    tasks.length - doneTasks.filter((task) => tasks.includes(task)).length;
  const progress = tasks.length
    ? Math.round(
        (doneTasks.filter((task) => tasks.includes(task)).length /
          tasks.length) *
          100
      )
    : 20;

  const goTo = (next: string) => {
    setPage(next);
    setMoreOpen(false);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks((old) => [taskInput.trim(), ...old]);
    setTaskInput("");
  };

  const toggleTask = (task: string) => {
    setDoneTasks((old) =>
      old.includes(task) ? old.filter((item) => item !== task) : [...old, task]
    );
  };

  const saveJournal = () => {
    if (!journal.trim()) return;
    setJournalEntries((old) => [journal.trim(), ...old]);
    setJournal("");
  };

  const savePeriod = () => {
    if (!periodDate.trim()) return;
    setPeriodHistory((old) => [periodDate.trim(), ...old]);
    setPeriodDate("");
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

  const toggleBeauty = (item: string) => {
    setBeautySaved((old) =>
      old.includes(item)
        ? old.filter((value) => value !== item)
        : [...old, item]
    );
  };

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
      placeholderTextColor="#B3A4BC"
      multiline={multiline}
      onSubmitEditing={multiline ? undefined : undefined}
    />
  );

  const primaryBtn = (label: string, onPress: () => void) => (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <LinearGradient
        colors={["#C9A9E8", "#A98BD4", "#F0C3B0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryBtnText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const softCard = (children: React.ReactNode, style?: object) => (
    <View style={[styles.card, style]}>{children}</View>
  );

  const pageTitle = (title: string, subtitle?: string) => (
    <View style={styles.pageHeader}>
      <Text style={styles.serifTitle}>{title}</Text>
      {!!subtitle && <Text style={styles.eyebrow}>{subtitle}</Text>}
    </View>
  );

  const navItems = [
    { key: "Home", icon: "⌂", label: "Home" },
    { key: "My Life", icon: "▦", label: "Life" },
    { key: "Diary", icon: "♡", label: "Diary" },
    { key: "My Cycle", icon: "🌷", label: "Cycle" },
    { key: "More", icon: "•••", label: "More" },
  ] as const;

  const spaces = [
    { emoji: "🗓️", name: "My Life", tint: colors.sky },
    { emoji: "📔", name: "Diary", tint: colors.blush },
    { emoji: "🌷", name: "My Cycle", tint: "#EDE0F5" },
    { emoji: "✨", name: "Beauty & Style", tint: colors.peachSoft },
    { emoji: "📚", name: "School", tint: colors.mint },
    { emoji: "🌱", name: "My Growth", tint: "#E8F3E9" },
  ];

  const moreMenu = [
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
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>
            HER ERA<Text style={styles.brandDot}>.</Text>
          </Text>
          <Text style={styles.brandTag}>YOUR LIFE · YOUR SPACE · YOUR ERA</Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity
            style={styles.iconBubble}
            onPress={() => goTo("Settings")}
          >
            <Text style={styles.iconBubbleText}>⚙</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => goTo("Profile")}
          >
            <Text style={styles.avatarText}>
              {displayName.slice(0, 1).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {page === "Home" && (
          <>
            <Text style={styles.greeting}>Hi, {displayName}</Text>
            <Text style={styles.dateLine}>{todayLabel}</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.weekRow}
            >
              {WEEK.map((day, index) => {
                const active = index === selectedDay;
                return (
                  <Pressable
                    key={day}
                    onPress={() => setSelectedDay(index)}
                    style={[styles.dayChip, active && styles.dayChipActive]}
                  >
                    <Text
                      style={[styles.dayLabel, active && styles.dayLabelActive]}
                    >
                      {day}
                    </Text>
                    <Text
                      style={[styles.dayNum, active && styles.dayNumActive]}
                    >
                      {((new Date().getDate() - new Date().getDay() + index + 31) %
                        31) +
                        1}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {softCard(
              <>
                <Text style={styles.serifSoft}>Today&apos;s era score</Text>
                <View style={styles.scoreRow}>
                  <LinearGradient
                    colors={["#8E6BB0", "#C9A9E8", "#F5C5A8"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.scoreRing}
                  >
                    <View style={styles.scoreInner}>
                      <Text style={styles.scoreValue}>{progress}</Text>
                      <Text style={styles.scoreUnit}>pts</Text>
                    </View>
                  </LinearGradient>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.quoteMark}>“</Text>
                    <Text style={styles.quote}>
                      Every day is a soft new chapter. You are becoming her.
                    </Text>
                  </View>
                </View>
              </>
            )}

            <View style={styles.quickRow}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={0.9}
                onPress={() => goTo("Diary")}
              >
                <LinearGradient
                  colors={["#D7C2F0", "#B59AD8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickCard}
                >
                  <Text style={styles.quickEmoji}>✎</Text>
                  <Text style={styles.quickTitle}>New diary note</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={0.9}
                onPress={() => goTo("My Life")}
              >
                <LinearGradient
                  colors={["#F8D9B8", "#F0B894"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.quickCard}
                >
                  <Text style={styles.quickEmoji}>✓</Text>
                  <Text style={styles.quickTitle}>New life task</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {softCard(
              <>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>Your day</Text>
                  <Text style={styles.pillMuted}>{tasksLeft} left</Text>
                </View>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={["#8E6BB0", "#C9A9E8", "#F5C5A8"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={[
                      styles.progressFill,
                      { width: `${Math.max(progress, 8)}%` },
                    ]}
                  />
                </View>
                {tasks.slice(0, 3).map((task, index) => (
                  <TouchableOpacity
                    key={`${task}-${index}`}
                    style={styles.listRow}
                    onPress={() => toggleTask(task)}
                  >
                    <View
                      style={[
                        styles.check,
                        doneTasks.includes(task) && styles.checkOn,
                      ]}
                    >
                      <Text style={styles.checkMark}>
                        {doneTasks.includes(task) ? "✓" : ""}
                      </Text>
                    </View>
                    <Text style={styles.listText}>{task}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => goTo("My Life")}>
                  <Text style={styles.link}>Open My Life →</Text>
                </TouchableOpacity>
              </>
            )}

            <Text style={styles.sectionLabel}>Your spaces</Text>
            <View style={styles.grid}>
              {spaces.map((space) => (
                <TouchableOpacity
                  key={space.name}
                  style={[styles.spaceCard, { backgroundColor: space.tint }]}
                  onPress={() => goTo(space.name)}
                  activeOpacity={0.88}
                >
                  <Text style={styles.spaceEmoji}>{space.emoji}</Text>
                  <Text style={styles.spaceName}>{space.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {page === "My Life" && (
          <>
            {pageTitle("My Life", "PLAN YOUR DAYS YOUR WAY")}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Add a to-do</Text>
                {field(taskInput, setTaskInput, "What do you need to do?")}
                {primaryBtn("+ Add Task", addTask)}
              </>
            )}
            <Text style={styles.sectionLabel}>My tasks</Text>
            {softCard(
              <>
                {tasks.length === 0 && (
                  <Text style={styles.muted}>Your list is waiting for you ♡</Text>
                )}
                {tasks.map((task, index) => (
                  <TouchableOpacity
                    key={`${task}-${index}`}
                    style={styles.listRow}
                    onPress={() => toggleTask(task)}
                  >
                    <View
                      style={[
                        styles.check,
                        doneTasks.includes(task) && styles.checkOn,
                      ]}
                    >
                      <Text style={styles.checkMark}>
                        {doneTasks.includes(task) ? "✓" : ""}
                      </Text>
                    </View>
                    <Text style={styles.listText}>{task}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            <Text style={styles.sectionLabel}>Life organizer</Text>
            {["Calendar", "Reminders", "Goals", "Daily routines"].map(
              (label) => (
                <TouchableOpacity
                  key={label}
                  style={styles.menuRow}
                  onPress={() =>
                    goTo(
                      label === "Goals" || label === "Daily routines"
                        ? "My Growth"
                        : label
                    )
                  }
                >
                  <Text style={styles.menuRowText}>{label}</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              )
            )}
          </>
        )}

        {page === "Diary" && (
          <>
            {pageTitle("The Diary", "A LITTLE SPACE JUST FOR YOU")}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Write something today</Text>
                {field(journal, setJournal, "What's on your mind?", true)}
                {primaryBtn("Save Journal Entry ♡", saveJournal)}
              </>
            )}
            <Text style={styles.sectionLabel}>My entries</Text>
            {journalEntries.length === 0
              ? softCard(
                  <Text style={styles.muted}>
                    Your memories will appear here.
                  </Text>
                )
              : journalEntries.map((entry, index) => (
                  <View key={`${entry}-${index}`} style={styles.noteCard}>
                    <LinearGradient
                      colors={["rgba(181,154,216,0.18)", "rgba(245,197,168,0.22)"]}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.noteTitle}>Entry {index + 1}</Text>
                    <Text style={styles.noteBody} numberOfLines={3}>
                      {entry}
                    </Text>
                    <View style={styles.tagRow}>
                      <Text style={styles.tag}>{todayLabel}</Text>
                      <Text style={[styles.tag, styles.tagAccent]}>
                        Soft priority
                      </Text>
                    </View>
                  </View>
                ))}
          </>
        )}

        {page === "My Cycle" && (
          <>
            {pageTitle("My Cycle", "YOUR PERSONAL CYCLE SPACE")}
            {softCard(
              <>
                <Text style={styles.serifSoft}>Get to know your cycle.</Text>
                <Text style={styles.muted}>
                  Keep track of dates and personal notes with gentleness.
                </Text>
              </>,
              { backgroundColor: "#F3EAF8" }
            )}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Period start date</Text>
                {field(
                  periodDate,
                  setPeriodDate,
                  "Enter date, e.g. 2026-11-20"
                )}
                {primaryBtn("Save Period", savePeriod)}
              </>
            )}
            <Text style={styles.sectionLabel}>Cycle notes</Text>
            {softCard(
              field(cycleNotes, setCycleNotes, "Add symptoms or notes...", true)
            )}
            <Text style={styles.sectionLabel}>Period history</Text>
            {softCard(
              <>
                {periodHistory.length === 0 && (
                  <Text style={styles.muted}>
                    Your saved dates will appear here.
                  </Text>
                )}
                {periodHistory.map((date, index) => (
                  <Text style={styles.listText} key={`${date}-${index}`}>
                    🌷  {date}
                  </Text>
                ))}
              </>
            )}
            <Text style={styles.disclaimer}>
              Cycle dates and predictions can vary. This tracker is for personal
              organization, not medical advice.
            </Text>
          </>
        )}

        {page === "Beauty & Style" && (
          <>
            {pageTitle("Beauty & Style", "YOUR INSPIRATION BOARD")}
            <View style={styles.grid}>
              {[
                "Nails 💅",
                "Hair 🎀",
                "Outfits 👗",
                "Makeup 💄",
                "Wishlist 🛍️",
                "Saved Looks ♡",
              ].map((name, index) => {
                const tints = [
                  colors.blush,
                  colors.sky,
                  colors.peachSoft,
                  "#EDE0F5",
                  colors.mint,
                  "#F7E8F1",
                ];
                return (
                  <TouchableOpacity
                    key={name}
                    style={[
                      styles.spaceCard,
                      { backgroundColor: tints[index % tints.length] },
                    ]}
                    onPress={() => toggleBeauty(name)}
                  >
                    <Text style={styles.spaceName}>{name}</Text>
                    <Text style={styles.muted}>
                      {beautySaved.includes(name) ? "Saved ♡" : "Tap to save"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {page === "School" && (
          <>
            {pageTitle("School", "STAY ON TOP OF YOUR SCHOOL LIFE")}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Add an assignment</Text>
                {field(
                  schoolInput,
                  setSchoolInput,
                  "Enter homework or assignment"
                )}
                {primaryBtn("+ Add Assignment", addSchoolTask)}
              </>
            )}
            <Text style={styles.sectionLabel}>My assignments</Text>
            {softCard(
              <>
                {schoolTasks.length === 0 && (
                  <Text style={styles.muted}>No assignments added yet.</Text>
                )}
                {schoolTasks.map((task, index) => (
                  <Text style={styles.listText} key={`${task}-${index}`}>
                    📚  {task}
                  </Text>
                ))}
              </>
            )}
          </>
        )}

        {page === "My Growth" && (
          <>
            {pageTitle("My Growth", "BECOMING HER, ONE DAY AT A TIME")}
            {softCard(
              <>
                <Text style={styles.cardTitle}>My goals</Text>
                {field(goalInput, setGoalInput, "Add a personal goal")}
                {primaryBtn("+ Add Goal", addGoal)}
                {goals.map((goal, index) => (
                  <Text style={styles.listText} key={`${goal}-${index}`}>
                    🌷  {goal}
                  </Text>
                ))}
              </>
            )}
            <Text style={styles.sectionLabel}>Daily reminders</Text>
            {softCard(
              <>
                {[
                  "Make time for myself",
                  "Read something inspiring",
                  "Practice gratitude",
                  "Keep learning",
                  "Rest when I need to",
                ].map((value) => (
                  <Text style={styles.listText} key={value}>
                    ♡  {value}
                  </Text>
                ))}
              </>
            )}
          </>
        )}

        {page === "Profile" && (
          <>
            {pageTitle("My Profile", "YOUR PERSONAL SPACE")}
            {softCard(
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
                <Text style={styles.muted}>HER ERA member ♡</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.menuRow}
              onPress={() => goTo("Settings")}
            >
              <Text style={styles.menuRowText}>Settings</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </>
        )}

        {page === "Settings" && (
          <>
            {pageTitle("Settings", "MAKE HER ERA YOURS")}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Appearance</Text>
                {["Lavender", "Soft Pink", "Cream", "Dark Mode"].map(
                  (value) => (
                    <TouchableOpacity
                      key={value}
                      style={styles.listRow}
                      onPress={() => setTheme(value)}
                    >
                      <Text style={styles.listText}>
                        {theme === value ? "☑ " : "○ "}
                        {value}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
                <Text style={styles.muted}>
                  Theme preference is saved here as a prototype choice.
                </Text>
              </>
            )}
            {softCard(
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
              </>
            )}
            {softCard(
              <>
                <Text style={styles.cardTitle}>Privacy & Security</Text>
                <Text style={styles.muted}>
                  Account sign-in, Face ID, secure PIN, and private data storage
                  are planned and not active yet.
                </Text>
              </>
            )}
            {softCard(
              <>
                <Text style={styles.cardTitle}>About HER ERA</Text>
                <Text style={styles.listText}>
                  YOUR LIFE. YOUR SPACE. YOUR ERA.
                </Text>
                <Text style={styles.muted}>Version 1.0 starter</Text>
              </>
            )}
            {onSignOut && primaryBtn("Sign Out", onSignOut)}
          </>
        )}

        {!mainPages.includes(page) && (
          <>
            {pageTitle(page, "COMING TO YOUR SPACE")}
            {softCard(
              <>
                <Text style={styles.serifSoft}>Coming soon ♡</Text>
                <Text style={styles.muted}>
                  We&apos;re building this part of HER ERA next.
                </Text>
              </>
            )}
            {primaryBtn("Back to Home", () => goTo("Home"))}
          </>
        )}

        {moreOpen && (
          <View style={styles.morePanel}>
            {moreMenu.map(([emoji, name]) => (
              <TouchableOpacity
                key={name}
                style={styles.menuRow}
                onPress={() => goTo(name)}
              >
                <Text style={styles.menuRowText}>
                  {emoji}  {name}
                </Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.navWrap}>
        <View style={[styles.navBar, shadow.float]}>
          {navItems.map((item) => {
            const active =
              (item.key === "More" && moreOpen) ||
              (!moreOpen && page === item.key) ||
              (!moreOpen &&
                item.key === "More" &&
                ["Beauty & Style", "School", "My Growth", "Profile", "Settings"].includes(
                  page
                ));
            return (
              <TouchableOpacity
                key={item.key}
                style={styles.navItem}
                onPress={() => {
                  if (item.key === "More") {
                    setMoreOpen((old) => !old);
                    return;
                  }
                  goTo(item.key);
                }}
              >
                {active ? (
                  <LinearGradient
                    colors={["#C9A9E8", "#F0C3B0"]}
                    style={styles.navActiveBubble}
                  >
                    <Text style={styles.navActiveIcon}>{item.icon}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.navIcon}>{item.icon}</Text>
                )}
                {active && <Text style={styles.navLabel}>{item.label}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 28,
    color: colors.ink,
    letterSpacing: 2,
  },
  brandDot: { color: colors.lavenderDeep },
  brandTag: {
    fontFamily: "DMSans_500Medium",
    color: colors.muted,
    fontSize: 9,
    letterSpacing: 1.4,
    marginTop: 2,
  },
  topActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },
  iconBubbleText: { color: colors.lavenderDeep, fontSize: 16 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lavender,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.white,
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 120 },
  greeting: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 34,
    color: colors.ink,
    marginTop: 8,
  },
  dateLine: {
    fontFamily: "DMSans_400Regular",
    color: colors.muted,
    marginTop: 4,
    marginBottom: 14,
  },
  weekRow: { gap: 10, paddingBottom: 8 },
  dayChip: {
    width: 48,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },
  dayChipActive: { backgroundColor: colors.eggplant },
  dayLabel: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: colors.muted,
  },
  dayLabelActive: { color: "#E8DDF4" },
  dayNum: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    color: colors.ink,
    marginTop: 4,
  },
  dayNumActive: { color: colors.white },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: 18,
    marginTop: 14,
    ...shadow.soft,
  },
  serifSoft: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 24,
    color: colors.ink,
  },
  serifTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 34,
    color: colors.ink,
  },
  pageHeader: { marginTop: 10, marginBottom: 4 },
  eyebrow: {
    fontFamily: "DMSans_500Medium",
    color: colors.lavenderDeep,
    fontSize: 11,
    letterSpacing: 1.6,
    marginTop: 6,
  },
  scoreRow: { flexDirection: "row", gap: 14, marginTop: 14, alignItems: "center" },
  scoreRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreInner: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 28,
    color: colors.ink,
  },
  scoreUnit: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    color: colors.muted,
  },
  quoteMark: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 28,
    color: colors.lavender,
  },
  quote: {
    fontFamily: "CormorantGaramond_600SemiBold_Italic",
    fontSize: 17,
    lineHeight: 24,
    color: colors.ink,
  },
  quickRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  quickCard: {
    borderRadius: radii.lg,
    padding: 18,
    minHeight: 110,
    justifyContent: "space-between",
  },
  quickEmoji: { color: colors.white, fontSize: 20, fontWeight: "700" },
  quickTitle: {
    fontFamily: "DMSans_700Bold",
    color: colors.white,
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    color: colors.ink,
    marginBottom: 10,
  },
  pillMuted: {
    fontFamily: "DMSans_500Medium",
    color: colors.lavenderDeep,
    fontSize: 12,
  },
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#F0E8F5",
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: { height: "100%", borderRadius: 999 },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#D5C5E3",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  checkOn: {
    backgroundColor: colors.lavender,
    borderColor: colors.lavender,
  },
  checkMark: { color: colors.white, fontSize: 12, fontWeight: "700" },
  listText: {
    fontFamily: "DMSans_400Regular",
    color: colors.ink,
    fontSize: 14,
    flex: 1,
  },
  link: {
    fontFamily: "DMSans_700Bold",
    color: colors.lavenderDeep,
    marginTop: 8,
  },
  sectionLabel: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 22,
    color: colors.ink,
    marginTop: 22,
    marginBottom: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  spaceCard: {
    width: "48%",
    borderRadius: radii.lg,
    padding: 18,
    minHeight: 108,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  spaceEmoji: { fontSize: 24 },
  spaceName: {
    fontFamily: "DMSans_700Bold",
    color: colors.ink,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.bgSoft,
    borderRadius: radii.sm,
    padding: 14,
    color: colors.ink,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    marginBottom: 12,
  },
  multiline: { minHeight: 120, textAlignVertical: "top" },
  primaryBtn: {
    borderRadius: radii.md,
    paddingVertical: 15,
    alignItems: "center",
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
  },
  muted: {
    fontFamily: "DMSans_400Regular",
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  menuRow: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shadow.soft,
  },
  menuRowText: {
    fontFamily: "DMSans_500Medium",
    color: colors.ink,
    fontSize: 15,
  },
  chevron: { color: colors.lavenderDeep, fontSize: 22 },
  noteCard: {
    borderRadius: radii.lg,
    padding: 18,
    marginTop: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    minHeight: 130,
    ...shadow.soft,
  },
  noteTitle: {
    fontFamily: "DMSans_700Bold",
    color: colors.ink,
    fontSize: 16,
  },
  noteBody: {
    fontFamily: "DMSans_400Regular",
    color: colors.muted,
    marginTop: 8,
    lineHeight: 20,
  },
  tagRow: { flexDirection: "row", gap: 8, marginTop: 14 },
  tag: {
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    color: colors.lavenderDeep,
    backgroundColor: "rgba(255,255,255,0.75)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagAccent: { color: "#B06A4E", backgroundColor: "rgba(245,197,168,0.45)" },
  disclaimer: {
    fontFamily: "DMSans_400Regular",
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 14,
  },
  morePanel: {
    marginTop: 16,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 8,
    ...shadow.soft,
  },
  navWrap: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },
  navBar: {
    backgroundColor: colors.eggplant,
    borderRadius: radii.pill,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: { alignItems: "center", minWidth: 54 },
  navIcon: { color: "#C9B8D6", fontSize: 18 },
  navActiveBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  navActiveIcon: { color: colors.white, fontSize: 16, fontWeight: "700" },
  navLabel: {
    fontFamily: "DMSans_500Medium",
    color: "#E8DDF4",
    fontSize: 10,
    marginTop: 4,
  },
});
