import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, shadow } from "../theme";

type AuthScreen = "Welcome" | "SignUp" | "SignIn";

type WelcomeScreenProps = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const [screen, setScreen] = useState<AuthScreen>("Welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const createAccount = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Missing information", "Please fill in all the fields.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Check your email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Password too short", "Use at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Please try again.");
      return;
    }
    onContinue();
  };

  const signIn = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password."
      );
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Check your email", "Please enter a valid email address.");
      return;
    }
    onContinue();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FBF6FA", "#F3EAF8", "#FBE8DC"]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.logo}>
            HER ERA<Text style={styles.logoDot}>.</Text>
          </Text>
          <Text style={styles.tagline}>YOUR LIFE · YOUR SPACE · YOUR ERA</Text>

          {screen === "Welcome" ? (
            <>
              <View style={styles.heroArt}>
                <LinearGradient
                  colors={["#E8DDF5", "#F5C5A8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.outerCircle}
                >
                  <View style={styles.innerCircle}>
                    <Text style={styles.heart}>♡</Text>
                  </View>
                </LinearGradient>
              </View>

              <Text style={styles.title}>Welcome to</Text>
              <Text style={styles.titleAccent}>your era.</Text>
              <Text style={styles.description}>
                A soft personal space to plan, grow, write, and make every day
                feel like yours.
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setScreen("SignUp")}
              >
                <LinearGradient
                  colors={["#C9A9E8", "#A98BD4", "#F0C3B0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryText}>CREATE ACCOUNT</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setScreen("SignIn")}
              >
                <Text style={styles.secondaryText}>
                  I ALREADY HAVE AN ACCOUNT
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onContinue}>
                <Text style={styles.guest}>CONTINUE AS GUEST</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.formTitle}>
                {screen === "SignIn"
                  ? "Welcome back ♡"
                  : "Create your account ♡"}
              </Text>
              <Text style={styles.description}>
                {screen === "SignIn"
                  ? "Your era is waiting."
                  : "Let's get your space set up."}
              </Text>

              <View style={[styles.formCard, shadow.soft]}>
                {screen === "SignUp" && (
                  <>
                    <Text style={styles.label}>YOUR NAME</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your name"
                      placeholderTextColor="#B3A4BC"
                      value={name}
                      onChangeText={setName}
                    />
                  </>
                )}

                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#B3A4BC"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.passwordBox}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder={
                      screen === "SignUp"
                        ? "Create a password"
                        : "Enter your password"
                    }
                    placeholderTextColor="#B3A4BC"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.showText}>
                      {showPassword ? "HIDE" : "SHOW"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {screen === "SignUp" && (
                  <>
                    <Text style={styles.label}>CONFIRM PASSWORD</Text>
                    <View style={styles.passwordBox}>
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter password again"
                        placeholderTextColor="#B3A4BC"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirm}
                      />
                      <TouchableOpacity
                        onPress={() => setShowConfirm(!showConfirm)}
                      >
                        <Text style={styles.showText}>
                          {showConfirm ? "HIDE" : "SHOW"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={screen === "SignIn" ? signIn : createAccount}
                >
                  <LinearGradient
                    colors={["#C9A9E8", "#A98BD4", "#F0C3B0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryText}>
                      {screen === "SignIn" ? "SIGN IN" : "CREATE MY ACCOUNT"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => setScreen("Welcome")}>
                <Text style={styles.back}>← Back to Welcome</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
    paddingBottom: 40,
  },
  logo: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 36,
    color: colors.ink,
    textAlign: "center",
    letterSpacing: 4,
  },
  logoDot: { color: colors.lavenderDeep },
  tagline: {
    fontFamily: "DMSans_500Medium",
    textAlign: "center",
    color: colors.muted,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 8,
    marginBottom: 28,
  },
  heroArt: { alignItems: "center", marginBottom: 28 },
  outerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "rgba(255,255,255,0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  heart: { fontSize: 72, color: colors.lavenderDeep },
  title: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 30,
    color: colors.ink,
    textAlign: "center",
  },
  titleAccent: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 40,
    color: colors.lavenderDeep,
    textAlign: "center",
    marginTop: 2,
  },
  description: {
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    fontSize: 14,
    color: colors.muted,
    lineHeight: 22,
    marginTop: 14,
    marginBottom: 28,
  },
  primaryButton: {
    padding: 18,
    borderRadius: radii.md,
    alignItems: "center",
  },
  primaryText: {
    color: colors.white,
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: "#DCCDE8",
    padding: 17,
    borderRadius: radii.md,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryText: {
    color: "#77618F",
    fontFamily: "DMSans_700Bold",
    fontSize: 11,
    letterSpacing: 1,
  },
  guest: {
    color: colors.muted,
    fontFamily: "DMSans_500Medium",
    fontSize: 11,
    letterSpacing: 1.2,
    textAlign: "center",
    marginTop: 18,
  },
  formTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 32,
    color: colors.ink,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: 18,
    marginTop: 8,
  },
  label: {
    color: colors.lavenderDeep,
    fontFamily: "DMSans_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 10,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.bgSoft,
    borderRadius: radii.sm,
    padding: 15,
    fontSize: 14,
    color: colors.ink,
    fontFamily: "DMSans_400Regular",
  },
  passwordBox: {
    backgroundColor: colors.bgSoft,
    borderRadius: radii.sm,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    color: colors.ink,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  showText: {
    color: colors.lavenderDeep,
    fontSize: 10,
    fontFamily: "DMSans_700Bold",
  },
  back: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 22,
    fontFamily: "DMSans_500Medium",
  },
});
