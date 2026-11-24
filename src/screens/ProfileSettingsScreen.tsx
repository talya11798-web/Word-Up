import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";

const P = "#A98BD4";
const BG = "#F8F4FC";
const DARK = "#423451";
const WHITE = "#FFFFFF";

const THEMES = ["Lavender", "Silver", "Soft Pink", "Dark Mode"];

type SettingsPage = "Profile" | "Settings" | "Edit Profile" | "Account" | "Appearance" | "Security" | "Privacy";

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

  const displayName = profileName.trim() || "Gorgeous";

  const saveProfile = () => {
    Alert.alert("Profile saved ♡", "Your Her Era profile has been updated.");
    setPage("Profile");
  };

  const savePin = () => {
    if (appPin && appPin.length < 4) {
      Alert.alert("PIN too short", "Use at least 4 digits.");
      return;
    }
    Alert.alert(
      appPin ? "PIN saved ♡" : "PIN cleared",
      appPin
        ? "Your app PIN is set on this device for now."
        : "App PIN protection is off."
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
          {(page === "Profile" || page === "Settings") && onBack && (
            <TouchableOpacity onPress={onBack}>
              <Text style={styles.back}>‹ Back</Text>
            </TouchableOpacity>
          )}

          {page !== "Profile" && page !== "Settings" && (
            <TouchableOpacity
              onPress={() =>
                setPage(
                  page === "Edit Profile" ? "Profile" : "Settings"
                )
              }
            >
              <Text style={styles.back}>
                ‹ Back to {page === "Edit Profile" ? "Profile" : "Settings"}
              </Text>
            </TouchableOpacity>
          )}

          {page === "Profile" && (
            <>
              <Text style={styles.sectionTitle}>MY PROFILE ♡</Text>
              <View style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Hi, {displayName}!</Text>
                <Text style={styles.description}>
                  {profileBio.trim() ||
                    "This is your Her Era profile — make it feel like you."}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setPage("Edit Profile")}
              >
                <Text style={styles.addText}>EDIT PROFILE</Text>
              </TouchableOpacity>

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
                  placeholder="What should we call you?"
                  placeholderTextColor="#A89BB3"
                />

                <Text style={[styles.cardTitle, { marginTop: 14 }]}>Bio</Text>
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

          {page === "Settings" && (
            <>
              <Text style={styles.sectionTitle}>SETTINGS ⚙</Text>
              <View style={styles.welcomeCard}>
                <Text style={styles.welcomeTitle}>Your space, your rules.</Text>
                <Text style={styles.description}>
                  Manage appearance, privacy, and account options.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => setPage("Account")}
              >
                <Text style={styles.menuEmoji}>👤</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>Account</Text>
                  <Text style={styles.menuDescription}>
                    Profile and sign-out options
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => setPage("Appearance")}
              >
                <Text style={styles.menuEmoji}>🎨</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>Appearance</Text>
                  <Text style={styles.menuDescription}>
                    Theme: {appTheme}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => setPage("Security")}
              >
                <Text style={styles.menuEmoji}>🔐</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>Face ID / App PIN</Text>
                  <Text style={styles.menuDescription}>
                    Protect your private space
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => setPage("Privacy")}
              >
                <Text style={styles.menuEmoji}>🛡️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>Privacy & Notifications</Text>
                  <Text style={styles.menuDescription}>
                    Manage your information
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            </>
          )}

          {page === "Account" && (
            <>
              <Text style={styles.sectionTitle}>ACCOUNT</Text>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Signed in as</Text>
                <Text style={styles.listItemText}>{displayName}</Text>
                <Text style={styles.description}>
                  Secure account sync is coming soon. For now, your profile
                  stays on this device.
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setPage("Edit Profile")}
                >
                  <Text style={styles.addText}>Edit Profile</Text>
                </TouchableOpacity>
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
              </View>
            </>
          )}

          {page === "Appearance" && (
            <>
              <Text style={styles.sectionTitle}>APPEARANCE</Text>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Choose your theme</Text>
                {THEMES.map((theme) => (
                  <TouchableOpacity
                    key={theme}
                    style={[
                      styles.listItem,
                      appTheme === theme && styles.selectedItem,
                    ]}
                    onPress={() => setAppTheme(theme)}
                  >
                    <Text style={styles.listItemText}>
                      {appTheme === theme ? "☑ " : "☐ "}
                      {theme}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Text style={styles.description}>
                  Theme preference is saved here. Full color packs come next.
                </Text>
              </View>
            </>
          )}

          {page === "Security" && (
            <>
              <Text style={styles.sectionTitle}>SECURITY</Text>
              <View style={styles.card}>
                <View style={styles.switchRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Face ID / Touch ID</Text>
                    <Text style={styles.description}>
                      Biometric unlock option for this device.
                    </Text>
                  </View>
                  <Switch
                    value={faceIdEnabled}
                    onValueChange={setFaceIdEnabled}
                    trackColor={{ false: "#DDD3E7", true: "#C9B4E8" }}
                    thumbColor={faceIdEnabled ? P : "#f4f3f4"}
                  />
                </View>

                <Text style={[styles.cardTitle, { marginTop: 18 }]}>
                  App PIN
                </Text>
                <View style={styles.pinRow}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginTop: 0 }]}
                    value={appPin}
                    onChangeText={setAppPin}
                    placeholder="Create a PIN"
                    placeholderTextColor="#A89BB3"
                    keyboardType="number-pad"
                    secureTextEntry={!showPin}
                    maxLength={8}
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={() => setShowPin((old) => !old)}
                  >
                    <Text style={styles.showText}>
                      {showPin ? "HIDE" : "SHOW"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={savePin}>
                  <Text style={styles.addText}>Save PIN</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {page === "Privacy" && (
            <>
              <Text style={styles.sectionTitle}>PRIVACY</Text>
              <View style={styles.card}>
                <View style={styles.switchRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Notifications</Text>
                    <Text style={styles.description}>
                      Gentle reminders and check-ins.
                    </Text>
                  </View>
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: "#DDD3E7", true: "#C9B4E8" }}
                    thumbColor={notificationsEnabled ? P : "#f4f3f4"}
                  />
                </View>
                <Text style={[styles.description, { marginTop: 16 }]}>
                  Your diary, cycle, and notes are private. Cloud backup and
                  account sync will stay optional when they arrive.
                </Text>
              </View>
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
