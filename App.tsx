import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
  CormorantGaramond_600SemiBold_Italic,
} from "@expo-google-fonts/cormorant-garamond";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MainShell from "./src/screens/MainShell";
import { colors } from "./src/theme";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    CormorantGaramond_600SemiBold_Italic,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.lavenderDeep} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {entered ? (
        <MainShell onSignOut={() => setEntered(false)} />
      ) : (
        <WelcomeScreen onContinue={() => setEntered(true)} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
});
