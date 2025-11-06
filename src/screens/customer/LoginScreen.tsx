import ThemeToggle from "@components/ThemeToggle";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-background px-6">
            <Text className="text-2xl font-bold text-foreground mb-6">
                Welcome Back 👋
            </Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-3 text-foreground bg-card"
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-6 text-foreground bg-card"
            />

            <TouchableOpacity className="w-full bg-primary py-3 rounded-xl">
                <Text className="text-center text-white font-semibold">Login</Text>
            </TouchableOpacity>

            <View className="mt-8">
                <ThemeToggle />
            </View>
        </View>
    );
}
