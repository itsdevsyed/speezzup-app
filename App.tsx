import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { NAV_THEME } from "./src/theme/index";
import LoginPage from "./src/screens/customer/LoginScreen";
import "./global.css";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? NAV_THEME.dark : NAV_THEME.light}
    >
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <LoginPage />

        
        
      </SafeAreaView>
    </NavigationContainer>
  );
}
