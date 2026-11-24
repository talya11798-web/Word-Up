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

type SettingsPage =
  | "Profile"
  | "Settings"
  | "Edit Profile"
  | "Account"
  | "Appearance"
  | "Security"
  | "Privacy";

type ProfileSettingsScreenProps = {
  onBack?: () => void;
  onSignOut?: () => void;
  initialPage?: SettingsPage;
};

export default function ProfileSettingsScreen({
  onBack,
  onSignOut,
  initialPage = "Settings",
}: ProfileSettingsScreenProps) {
  const [page, setPage] = useState<SettingsPage>(initialPage);

  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [appTheme, setAppTheme] = useState("Lavender");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [appPin, setAppPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const saveProfile = () => {
    Alert.alert("Profile saved ♡", "Your Her Era profile has been updated.");
    setPage("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HER ERA ♡</Text>
        <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {onBack && (
            <TouchableOpacity
              onPress={() => {
                if (page === "Edit Profile") {
                  setPage("Profile");
                  return;
                }
                if (
                  page === "Account" ||
                  page === "Appearance" ||
                  page === "Security" ||
                  page === "Privacy"
                ) {
                  setPage("Settings");
                  return;
                }
                onBack();
              }}
            >
              <Text style={styles.back}>‹ Back</Text>
            </TouchableOpacity>
          )}

          {page === "Profile" && (
            <>
              <Text style={styles.sectionTitle}>MY PROFILE 👤</Text>

              <View style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Welcome to your era ♡</Text>
                <Text style={styles.description}>
                  Make this space feel like you.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Your name</Text>
                <TextInput
                  style={styles.input}
                  value={profileName}
                  onChangeText={setProfileName}
                  placeholder="Enter your name"
                  placeholderTextColor="#A89BB3"
                />

                <Text style={[styles.cardTitle, { marginTop: 14 }]}>
                  Your bio
                </Text>
                <TextInput
                  style={styles.input}
                  value={profileBio}
                  onChangeText={setProfileBio}
                  placeholder="A little about you..."
                  placeholderTextColor="#A89BB3"
                />

                <Text style={styles.description}>HER ERA member ♡</Text>
              </View>

              <TouchableOpacity
                style={[styles.addButton, styles.secondaryButton]}
                onPress={() => setPage("Settings")}
              >
                <Text style={[styles.addText, styles.secondaryText]}>
                  OPEN SETTINGS
                </Text>
              </TouchableOpacity>
            </>
          )}

          {page === "Edit Profile" && (
            <>
              <Text style={styles.sectionTitle}>EDIT PROFILE</Text>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Your name</Text>
                <TextInput
                  style={styles.input}
                  value={profileName}
                  onChangeText={setProfileName}
                  placeholder="Enter your name"
                  placeholderTextColor="#A89BB3"
                />

                <Text style={[styles.cardTitle, { marginTop: 14 }]}>
                  Your bio
                </Text>
                <TextInput
                  style={[styles.input, styles.bioInput]}
                  value={profileBio}
                  onChangeText={setProfileBio}
                  multiline
                  textAlignVertical="top"
                  placeholder="A little about you..."
                  placeholderTextColor="#A89BB3"
                />

                <TouchableOpacity style={styles.addButton} onPress={saveProfile}>
                  <Text style={styles.addText}>Save Profile ♡</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {(page === "Settings" ||
            page === "Account" ||
            page === "Appearance" ||
            page === "Security" ||
            page === "Privacy") && (
            <>
              <Text style={styles.sectionTitle}>SETTINGS ⚙️</Text>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Appearance</Text>
                {["Lavender", "Soft Pink", "Cream", "Dark Mode"].map(
                  (theme) => (
                    <TouchableOpacity
                      key={theme}
                      style={styles.listItem}
                      onPress={() => setAppTheme(theme)}
                    >
                      <Text style={styles.listItemText}>
                        {appTheme === theme ? "☑ " : "○ "}
                        {theme}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Notifications</Text>
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => setNotificationsEnabled((old) => !old)}
                >
                  <Text style={styles.listItemText}>
                    {notificationsEnabled
                      ? "🔔 Notifications On"
                      : "🔕 Notifications Off"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Privacy & Security</Text>

                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => setFaceIdEnabled((old) => !old)}
                >
                  <Text style={styles.listItemText}>
                    {faceIdEnabled ? "☑" : "☐"} Face ID preference
                  </Text>
                </TouchableOpacity>

                <Text style={styles.description}>
                  Face ID is a planned feature. This switch does not activate
                  Apple&apos;s biometric authentication yet.
                </Text>

                <Text style={[styles.cardTitle, { marginTop: 14 }]}>
                  App PIN (prototype only)
                </Text>
                <TextInput
                  style={styles.input}
                  value={appPin}
                  onChangeText={setAppPin}
                  keyboardType="number-pad"
                  secureTextEntry={!showPin}
                  maxLength={6}
                  placeholder="Create a PIN"
                  placeholderTextColor="#A89BB3"
                />

                <TouchableOpacity onPress={() => setShowPin((old) => !old)}>
                  <Text style={styles.description}>
                    {showPin ? "Hide PIN" : "Show PIN"}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.description}>
                  This PIN is not securely stored or used to lock the app yet.
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>About HER ERA</Text>
                <Text style={styles.listItemText}>
                  YOUR LIFE. YOUR SPACE. YOUR ERA.
                </Text>
                <Text style={styles.description}>Version 1.0 prototype</Text>
              </View>

              {onSignOut && (
                <TouchableOpacity
                  style={[styles.addButton, styles.secondaryButton]}
                  onPress={onSignOut}
                >
                  <Text style={[styles.addText, styles.secondaryText]}>
                    Sign Out
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
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
    marginTop: 8,
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
  bioInput: { height: 110, textAlignVertical: "top" },
  addButton: {
    backgroundColor: P,
    borderRadius: 12,
    padding: 13,
    alignItems: "center",
    marginTop: 12,
  },
  addText: { color: WHITE, fontWeight: "800" },
  secondaryButton: {
    backgroundColor: WHITE,
    borderWidth: 1.5,
    borderColor: "#CDBCE0",
  },
  secondaryText: { color: "#77618F" },
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
  listItem: {
    backgroundColor: "#F8F4FC",
    borderRadius: 14,
    padding: 15,
    marginBottom: 9,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: P,
    backgroundColor: "#EDE3F7",
  },
  listItemText: { color: DARK, fontSize: 14, fontWeight: "600" },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pinRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  showButton: {
    backgroundColor: "#EFE6F8",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 10,
  },
  showText: { color: "#80649F", fontWeight: "800", fontSize: 11 },
});
