import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MainShell from "./src/screens/MainShell";

export default function App() {
  const [entered, setEntered] = useState(false);

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
