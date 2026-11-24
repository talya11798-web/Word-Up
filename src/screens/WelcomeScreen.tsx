import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { colors } from "../theme";

type AuthScreen = "welcome" | "signin" | "signup";

type WelcomeScreenProps = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [screen, setScreen] = useState<AuthScreen>("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Almost there", "Please enter your email and password.");
      return;
    }
    if (screen === "signup") {
      if (!name.trim()) {
        Alert.alert("Almost there", "Please enter your name.");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Passwords don’t match", "Please confirm your password.");
        return;
      }
    }
    onContinue();
  };

  if (screen === "welcome") {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.top}>
          <Text style={styles.logo}>HER ERA</Text>
          <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>
        </View>

        <View style={styles.artContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <Text style={styles.symbol}>♡</Text>
            </View>
          </View>
          <Text style={styles.sparkle}>✧</Text>
          <Text style={styles.sparkleTwo}>✦</Text>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.titlePurple}>YOUR ERA.</Text>

          <Text style={styles.description}>
            Your personal space to plan, grow, express yourself, and make every
            day yours.
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScreen("signup")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setScreen("signin")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryText}>I ALREADY HAVE AN ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guestButton}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.guestText}>CONTINUE AS GUEST</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>MADE FOR YOUR NEXT CHAPTER ♡</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.authContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>HER ERA</Text>
          <Text style={[styles.tagline, styles.authTagline]}>
            YOUR LIFE. YOUR SPACE. YOUR ERA.
          </Text>

          <Text style={styles.authTitle}>
            {screen === "signin" ? "Welcome Back!" : "Join Her Era"}
          </Text>

          {screen === "signup" && (
            <TextInput
              placeholder="Your name"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          )}

          <TextInput
            placeholder="Email address"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {screen === "signup" && (
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor={colors.muted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.input}
            />
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleAuth}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryText}>
              {screen === "signin" ? "SIGN IN" : "CREATE MY ACCOUNT"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setScreen("welcome")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryText}>GO BACK</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  container: {
    flex: 1,
    backgroundColor: "#F9F6FC",
    paddingHorizontal: 28,
    justifyContent: "space-between",
    alignItems: "center",
  },

  top: {
    alignItems: "center",
    marginTop: 45,
  },

  logo: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 7,
    color: "#59476F",
    textAlign: "center",
  },

  tagline: {
    fontSize: 9,
    letterSpacing: 3,
    color: "#A69AB8",
    marginTop: 10,
    textAlign: "center",
  },

  artContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  outerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#E8DDF5",
    borderWidth: 2,
    borderColor: "#C9B8E1",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 165,
    height: 165,
    borderRadius: 90,
    backgroundColor: "#F8F4FC",
    borderWidth: 2,
    borderColor: "#D8C9E9",
    justifyContent: "center",
    alignItems: "center",
  },

  symbol: {
    fontSize: 100,
    color: "#A58AC8",
  },

  sparkle: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 35,
    color: "#B49BCF",
  },

  sparkleTwo: {
    position: "absolute",
    bottom: 10,
    left: 0,
    fontSize: 28,
    color: "#C0A9D9",
  },

  welcome: {
    alignItems: "center",
  },

  title: {
    fontSize: 29,
    fontWeight: "600",
    color: "#554467",
  },

  titlePurple: {
    fontSize: 38,
    fontWeight: "900",
    color: "#A78ACD",
    letterSpacing: 3,
    marginTop: 3,
  },

  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#897F94",
    lineHeight: 23,
    marginTop: 17,
    paddingHorizontal: 8,
  },

  buttons: {
    width: "100%",
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#B59AD8",
    padding: 19,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 13,
    shadowColor: "#A58AC8",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 2,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CDBCE0",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  secondaryText: {
    color: "#77618F",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1.2,
  },

  guestButton: {
    padding: 16,
    alignItems: "center",
  },

  guestText: {
    color: "#A69AB8",
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 1.5,
  },

  footer: {
    color: "#B1A4C1",
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 18,
  },

  authContainer: {
    flex: 1,
    backgroundColor: "#F9F6FC",
  },

  authContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
  },

  authTagline: {
    marginBottom: 48,
  },

  authTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#554467",
    marginBottom: 22,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 16,
    marginBottom: 15,
    fontSize: 15,
    color: "#554467",
    borderWidth: 1,
    borderColor: "#E8DDF5",
  },
});
