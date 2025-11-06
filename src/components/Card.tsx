import React from 'react';
import { View, Text } from 'react-native';

type Props = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

const Card: React.FC<Props> = ({ title, children, className = '' }) => {
    return (
        <View className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow mb-4 ${className}`}>
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</Text>
            {children}
        </View>
    );
};

export default Card;
