import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <TextInput
            {...props}
            placeholderTextColor="#999"
            className={`border border-gray-300 rounded-xl px-4 py-3 text-base text-black ${className}`}
        />
    );
};

export default Input;
