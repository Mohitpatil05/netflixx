import React, { useState } from 'react';
import {
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Button from '../../components/Button/Button';
import TextInputField from '../../components/TextInput/TextInputField';
import { userStore } from '../../store/userStore';
import { showMessage } from 'react-native-flash-message';
import { styles } from './styles';
export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);

        if (!username.trim()) {
            setIsLoading(false);
            showMessage({
                message: "Please enter your username",
                type: "danger",
                position: 'bottom',
                floating: true,
                icon: 'danger',
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
                icon: 'danger',
            });
            return;
        }

        try {
            await userStore.login(username, password);
            setIsLoading(false);
            navigation.replace('Home');
            showMessage({
                message: "Login Successfully!",
                type: "success",
                position: 'bottom',
                floating: true,
                icon: 'success',
            });
        } catch (error) {
            setIsLoading(false);
            showMessage({
                message: "Login failed",
                type: "danger",
                position: 'bottom',
                floating: true,
                icon: 'danger',
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo at top center */}
                    <Image
                        source={require('../../assets/images/login_logo.png')}
                        style={styles.logo}
                    />

                    {/* Form Section */}
                    <View style={styles.form}>
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
                            title={loading ? "Please Wait..." : "Login"}
                            onPress={handleLogin}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


