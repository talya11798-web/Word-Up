import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";

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

    // UI validated — enter the app shell (secure auth still pending).
    onContinue();
  };

  const signIn = () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing information", "Please enter your email and password.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Check your email", "Please enter a valid email address.");
      return;
    }
    onContinue();
  };

  const renderWelcome = () => (
    <View style={styles.center}>
      <Text style={styles.logo}>HER ERA</Text>
      <Text style={styles.tagline}>YOUR LIFE. YOUR SPACE. YOUR ERA.</Text>

      <View style={styles.circle}>
        <Text style={styles.heart}>♡</Text>
      </View>

      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.purpleTitle}>YOUR ERA.</Text>

      <Text style={styles.description}>
        Your personal space to plan, grow, express yourself, and make every day
        yours.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => setScreen("SignUp")}
      >
        <Text style={styles.primaryText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("SignIn")}>
        <Text style={styles.link}>I ALREADY HAVE AN ACCOUNT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onContinue}>
        <Text style={styles.guest}>CONTINUE AS GUEST</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignUp = () => (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>HER ERA</Text>
      <Text style={styles.tagline}>YOUR NEXT CHAPTER STARTS HERE</Text>

      <Text style={styles.formTitle}>Create your account ♡</Text>
      <Text style={styles.formDescription}>Let's get your space set up.</Text>

      <Text style={styles.label}>YOUR NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#B2A8BF"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>EMAIL ADDRESS</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B2A8BF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>PASSWORD</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Create a password"
          placeholderTextColor="#B2A8BF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showText}>{showPassword ? "HIDE" : "SHOW"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>CONFIRM PASSWORD</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password again"
          placeholderTextColor="#B2A8BF"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirm}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Text style={styles.showText}>{showConfirm ? "HIDE" : "SHOW"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={createAccount}>
        <Text style={styles.primaryText}>CREATE MY ACCOUNT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("SignIn")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("Welcome")}>
        <Text style={styles.back}>← Back to Welcome</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSignIn = () => (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>HER ERA</Text>
      <Text style={styles.formTitle}>Welcome back ♡</Text>
      <Text style={styles.formDescription}>Your era is waiting.</Text>

      <Text style={styles.label}>EMAIL ADDRESS</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B2A8BF"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>PASSWORD</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#B2A8BF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showText}>{showPassword ? "HIDE" : "SHOW"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={signIn}>
        <Text style={styles.primaryText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("Welcome")}>
        <Text style={styles.back}>← Back to Welcome</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {screen === "Welcome" && renderWelcome()}
      {screen === "SignUp" && renderSignUp()}
      {screen === "SignIn" && renderSignIn()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6FC",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
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
    letterSpacing: 2,
    color: "#A69AB8",
    marginTop: 10,
    marginBottom: 30,
    textAlign: "center",
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#E8DDF5",
    borderWidth: 2,
    borderColor: "#C9B8E1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  heart: {
    fontSize: 105,
    color: "#A58AC8",
  },
  title: {
    fontSize: 29,
    fontWeight: "600",
    color: "#554467",
  },
  purpleTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#A78ACD",
    letterSpacing: 3,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#897F94",
    lineHeight: 23,
    marginTop: 15,
    marginBottom: 25,
  },
  primaryButton: {
    backgroundColor: "#B59AD8",
    padding: 18,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 18,
    width: "100%",
  },
  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
  },
  link: {
    color: "#77618F",
    fontWeight: "800",
    fontSize: 12,
    textAlign: "center",
    marginTop: 22,
  },
  guest: {
    color: "#A69AB8",
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 18,
  },
  formContainer: {
    padding: 28,
    paddingTop: 35,
    paddingBottom: 50,
  },
  formTitle: {
    fontSize: 27,
    fontWeight: "900",
    color: "#59476F",
    marginTop: 25,
  },
  formDescription: {
    color: "#9588A5",
    fontSize: 14,
    marginTop: 7,
    marginBottom: 25,
  },
  label: {
    color: "#77618F",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DED2EC",
    borderRadius: 15,
    padding: 16,
    fontSize: 14,
    color: "#59476F",
  },
  passwordBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DED2EC",
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    color: "#59476F",
    fontSize: 14,
  },
  showText: {
    color: "#967CB7",
    fontSize: 10,
    fontWeight: "900",
  },
  back: {
    textAlign: "center",
    color: "#9688A7",
    marginTop: 25,
    fontWeight: "700",
  },
});
