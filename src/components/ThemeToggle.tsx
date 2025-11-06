import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import { useColorScheme } from "../lib/useColorScheme";

export const ThemeToggle = () => {
    const { colorScheme, setColorScheme } = useColorScheme();

    const toggle = () => {
        setColorScheme(colorScheme === "dark" ? "light" : "dark");
    };

    return (
        <Pressable
            onPress={toggle}
            className="mt-5 p-3 rounded-full bg-secondary"
        >
            {colorScheme === "dark" ? (
                <Sun size={22} color="#fff" />
            ) : (
                <Moon size={22} color="#000" />
            )}
        </Pressable>
    );
};

export default ThemeToggle;
