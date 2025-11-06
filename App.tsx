import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginPage from "./src/screens/customer/LoginScreen";
import "./global.css"
import Card from "./src/components/Card";

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <LoginPage />
    </SafeAreaView>
  );
};

export default App;
