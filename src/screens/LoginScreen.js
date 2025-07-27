import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import TextInputField from '../components/TextInputField';
import { userStore } from '../store/userStore';
import { showMessage } from 'react-native-flash-message';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // Validation
        if (!username.trim()) {
            setIsLoading(false);
            showMessage({
                message: "Please enter your username",
                type: "danger",
                position: 'bottom',
                floating: true,
                icon: 'danger'
            });
            return;
        }
        if (password.length < 6) {
            setIsLoading(false);
            showMessage({
                message: "Password must be at least 6 characters",
                type: "danger",
                position: 'bottom',
                floating: true,
                icon: 'danger'
            });
            return;
        }

        // Proceed with login
        await userStore.login(username, password);
        navigation.replace('Home');
        setIsLoading(false);
        showMessage({
            message: "Login Successfully!",
            type: "success",
            position: 'bottom',
            floating: true,
            icon: 'success'
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            style={{ flex: 1 }}

        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{ width: 100, height: 100, marginBottom: 20 }}
                    />
                    <TextInputField
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInputField
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button
                        title={loading ? "Please Wait" : "Login"}
                        onPress={handleLogin}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        padding: 20,
        justifyContent: 'center',
    },
});
