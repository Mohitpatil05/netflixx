import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import Colors from '../constants/Colors';
import { userStore } from '../store/userStore';
import { observer } from 'mobx-react-lite';

export default observer(function SplashScreen({ navigation }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const waitAndNavigate = async () => {
            // Wait until userStore finishes loading user data
            const checkHydrated = () => {
                if (userStore.isHydrated) {
                    // Start zoom animation
                    Animated.timing(scaleAnim, {
                        toValue: 500,
                        duration: 2000,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }).start(() => {
                        if (userStore.isLoggedIn) {
                            navigation.replace('Home');
                        } else {
                            navigation.replace('Login');
                        }
                    });
                } else {
                    requestAnimationFrame(checkHydrated); // Keep checking
                }
            };

            checkHydrated();
        };

        waitAndNavigate();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="#000"
                barStyle="light-content"
            />

            <Animated.Image
                source={require('../assets/images/logo.png')}
                style={[
                    styles.logo,
                    { transform: [{ scale: scaleAnim }] }
                ]}
                resizeMode="contain"
            />
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 100,
    },
});
