import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, className, ...props }) => {
    return (
        <TouchableOpacity
            {...props}
            className={`bg-black rounded-2xl py-4 items-center ${className}`}
        >
            <Text className="text-white size-xl font-semibold text-base">{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;
