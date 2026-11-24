import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { colors } from "../theme";

type Tab = "Home" | "My Life" | "Diary" | "My Cycle" | "More" | "Settings";

const tabs: Exclude<Tab, "Settings">[] = [
  "Home",
  "My Life",
  "Diary",
  "My Cycle",
  "More",
];

type MainShellProps = {
  onSignOut?: () => void;
};

export default function MainShell({ onSignOut }: MainShellProps) {
  const [page, setPage] = useState<Tab>("Home");

  const renderCard = (title: string, subtitle: string, icon: string) => (
    <View style={styles.card}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>HER ERA</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>

        <Text style={styles.greeting}>Welcome to your era ✨</Text>
        <Text style={styles.date}>Your space, your pace.</Text>

        {page === "Home" && (
          <>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Hello, Gorgeous!</Text>
              <Text style={styles.subtitle}>
                Make today a day to remember.
              </Text>
            </View>

            <Text style={styles.heading}>Your Dashboard</Text>

            <View style={styles.grid}>
              {renderCard("My Life", "Plan your day", "📅")}
              {renderCard("The Diary", "Your private space", "📖")}
              {renderCard("My Cycle", "Your cycle calendar", "💜")}
              {renderCard("Beauty", "Your inspiration", "✨")}
              {renderCard("School", "Stay organized", "📚")}
              {renderCard("My Growth", "Goals and habits", "🌷")}
            </View>

            <Text style={styles.heading}>Today&apos;s Reminder</Text>
            {renderCard(
              "A little reminder",
              "You are growing at your own pace.",
              "🌸"
            )}
          </>
        )}

        {page === "My Life" && (
          <>
            <Text style={styles.heading}>My Life 📅</Text>
            {renderCard("Daily Planner", "Organize your day", "📝")}
            {renderCard("My Routines", "Morning and night routines", "☀️")}
            {renderCard("My Goals", "Keep track of your goals", "🎯")}
          </>
        )}

        {page === "Diary" && (
          <>
            <Text style={styles.heading}>The Diary 📖</Text>
            {renderCard("My Journal", "Write your thoughts", "🖊️")}
            {renderCard("Mood Check-in", "How are you feeling?", "💗")}
            {renderCard("Gratitude", "Things you're thankful for", "🌷")}
          </>
        )}

        {page === "My Cycle" && (
          <>
            <Text style={styles.heading}>My Cycle 💜</Text>
            {renderCard("Cycle Calendar", "Keep track of your dates", "🗓️")}
            {renderCard("Cycle History", "Review previous cycles", "📊")}
            {renderCard("Symptoms", "Record how you're feeling", "💜")}
            <Text style={styles.subtitle}>
              Cycle predictions are estimates, not guarantees.
            </Text>
          </>
        )}

        {page === "More" && (
          <>
            <Text style={styles.heading}>Explore Her Era</Text>
            {renderCard("Beauty", "Hair, nails and outfits", "✨")}
            {renderCard("School", "Your academic planner", "📚")}
            {renderCard("My Growth", "Personal goals and faith", "🌷")}
            <TouchableOpacity
              style={styles.settings}
              onPress={() => setPage("Settings")}
            >
              <Text style={styles.settingsText}>⚙️ Settings & Account</Text>
            </TouchableOpacity>
          </>
        )}

        {page === "Settings" && (
          <>
            <Text style={styles.heading}>Settings ⚙️</Text>
            {renderCard("Sign In / Sign Up", "Manage your account", "👤")}
            {renderCard("Face ID / Touch ID", "Biometric security options", "🔐")}
            {renderCard("App PIN", "Protect your private space", "🔒")}
            {renderCard(
              "Appearance",
              "Lavender, silver and dark mode",
              "🎨"
            )}
            {renderCard("Privacy", "Manage your information", "🛡️")}
            {onSignOut && (
              <TouchableOpacity style={styles.settings} onPress={onSignOut}>
                <Text style={styles.settingsText}>Sign Out</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.settings}
              onPress={() => setPage("More")}
            >
              <Text style={styles.settingsText}>Back to More</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setPage(tab)}
            style={styles.navItem}
          >
            <Text
              style={[styles.navText, page === tab && styles.activeNav]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softBg,
  },
  content: {
    padding: 22,
    paddingBottom: 35,
  },
  logo: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.dark,
    textAlign: "center",
    letterSpacing: 5,
    marginTop: 15,
  },
  tagline: {
    color: colors.tagline,
    fontSize: 10,
    textAlign: "center",
    letterSpacing: 2,
    marginTop: 7,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.dark,
    marginTop: 35,
  },
  date: {
    color: colors.greetingMuted,
    marginTop: 6,
  },
  hero: {
    backgroundColor: colors.hero,
    padding: 25,
    borderRadius: 25,
    marginTop: 25,
    marginBottom: 25,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.dark,
  },
  heading: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.dark,
    marginTop: 22,
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 19,
    marginBottom: 12,
    flexGrow: 1,
    flexBasis: "45%",
    minHeight: 125,
    shadowColor: colors.shadow,
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    fontSize: 25,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.dark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 7,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.card,
    paddingVertical: 17,
    borderTopWidth: 1,
    borderTopColor: colors.navBorder,
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: 3,
  },
  navText: {
    fontSize: 11,
    color: colors.navIdle,
  },
  activeNav: {
    color: colors.navActive,
    fontWeight: "bold",
  },
  settings: {
    backgroundColor: colors.settings,
    padding: 19,
    borderRadius: 18,
    marginTop: 12,
  },
  settingsText: {
    color: colors.dark,
    fontWeight: "bold",
    textAlign: "center",
  },
});
