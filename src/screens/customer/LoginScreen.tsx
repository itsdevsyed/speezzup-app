import React, { useState } from "react";
import { View, Text } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "@/src/components/Card";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login clicked:", { email, password });
    };

    return (
        <View className="flex-1 bg-white justify-center px-6">
            <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
                Login
            </Text>

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className="mb-4"
            />
            <Input
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                className="mb-6"
            />

            <Button title="Login" onPress={handleLogin} />




            <Card title="demo" ></Card>
        </View>
    );
};

export default LoginPage;
