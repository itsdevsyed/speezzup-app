import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import ThemeToggle from '@components/ThemeToggle';

const OTP_LENGTH = 6;

export default function OtpLoginScreen() {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);

    const phoneInputRef = useRef<TextInput>(null);
    const otpRefs = useRef<TextInput[]>([]);

    const fullOtp = otp.join('');
    const isPhoneValid = /^\d{10}$/.test(phone);
    const isOtpComplete = fullOtp.length === OTP_LENGTH;

    // Resend timer
    useEffect(() => {
        let timer: NodeJS.Timer;
        if (step === 'otp' && resendTimer > 0) {
            timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [step, resendTimer]);

    // Simulated API calls
    const sendOtp = async () => {
        if (!isPhoneValid || loading) return;
        setLoading(true);
        setError('');
        setTimeout(() => {
            setLoading(false);
            setStep('otp');
            setResendTimer(60);
            otpRefs.current[0]?.focus();
            console.log('OTP sent: 123456'); // Simulated OTP
        }, 1000);
    };

    const verifyOtp = async () => {
        if (!isOtpComplete || loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (fullOtp === '123456') {
                Alert.alert('Success', 'Logged in successfully!');
            } else {
                setError('Invalid OTP. Try again.');
                setOtp(Array(OTP_LENGTH).fill(''));
                otpRefs.current[0]?.focus();
            }
        }, 1000);
    };

    const handleOtpChange = (text: string, index: number) => {
        const val = text.replace(/[^0-9]/g, '').slice(-1);
        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);
        if (val && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpBackspace = (key: string, index: number) => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            otpRefs.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background px-6 justify-center"
        >
            {/* Theme toggle on top-right */}
            <View className="absolute top-10 right-6">
                <ThemeToggle />
            </View>

            {step === 'phone' ? (
                <View className="space-y-6 w-full max-w-md mx-auto">
                    <Text className="text-3xl font-bold text-foreground">Welcome Back</Text>
                    <Text className="text-foreground/70 text-base">
                        Enter your mobile number to receive a 6-digit OTP.
                    </Text>

                    <TextInput
                        ref={phoneInputRef}
                        className="w-full border border-foreground/30 rounded-xl px-4 py-3 text-foreground bg-card text-lg"
                        placeholder="Phone number"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={phone}
                        onChangeText={setPhone}
                        editable={!loading}
                    />
                    {error ? <Text className="text-red-500 text-sm">{error}</Text> : null}

                    <TouchableOpacity
                        onPress={sendOtp}
                        disabled={!isPhoneValid || loading}
                        className={`w-full py-3 rounded-xl mt-6 bg-primary items-center justify-center ${!isPhoneValid || loading ? 'opacity-50' : ''}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-white font-semibold text-lg">Get OTP</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="space-y-6 w-full max-w-md mx-auto items-center">
                    <Text className="text-3xl font-bold text-foreground">Verify OTP</Text>
                    <Text className="text-foreground/70 text-center text-base">
                        We sent a 6-digit code to <Text className="font-bold text-primary">{phone}</Text>
                    </Text>

                    {/* OTP Inputs */}
                    <View className="flex-row justify-center space-x-3 mt-4">
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={el => (otpRefs.current[index] = el!)}
                                value={digit}
                                onChangeText={text => handleOtpChange(text, index)}
                                onKeyPress={({ nativeEvent }) => handleOtpBackspace(nativeEvent.key, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                className="w-14 h-14 border-b-2 border-foreground text-center text-2xl rounded-md text-foreground bg-card"
                            />
                        ))}
                    </View>

                    {error ? <Text className="text-red-500 text-sm text-center">{error}</Text> : null}

                        <TouchableOpacity
                            onPress={verifyOtp}
                            disabled={!isOtpComplete || loading}
                            className={`w-full py-4 mt-8 rounded-2xl items-center justify-center ${!isOtpComplete || loading ? 'bg-primary/50' : 'bg-primary shadow-md'}`}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text className="text-white font-semibold text-lg">Verify OTP</Text>
                            )}
                        </TouchableOpacity>

                    {/* Resend */}
                    <TouchableOpacity
                        onPress={() => {
                            if (resendTimer === 0) sendOtp();
                        }}
                        disabled={resendTimer > 0 || loading}
                    >
                        <Text className={`text-sm mb-6 font-medium mt-2 ${resendTimer > 0 ? 'text-foreground/50' : 'text-primary'}`}>
                            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}
