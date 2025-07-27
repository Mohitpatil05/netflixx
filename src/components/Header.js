import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { userStore } from '../store/userStore';
import Colors from '../constants/Colors';
import { observer } from 'mobx-react-lite';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons

export default observer(function Header({ onLogout }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

    const handleConfirmLogout = () => {
        setLogoutConfirmVisible(false);
        setModalVisible(false);
        onLogout();
    };

    // Reusable button component
    const menuButton = (label, onPress, bgColor = '#222') => (
        <TouchableOpacity
            key={label}
            onPress={onPress}
            style={{
                width: '100%',
                maxWidth: 300,
                paddingVertical: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 15,
            }}
        >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10
        }}>
            {/* Left: Logo */}
            <Image
                source={require('../assets/images/logo.png')}
                style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />

            {/* Right: Profile Icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Search Icon */}


                {/* Profile Icon */}
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setModalVisible(true)}>
                    <Image
                        source={require('../assets/images/profile_icon.png')}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 10 }}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Full-screen account modal */}
            <Modal
                transparent={false}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: '#000',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 80
                }}>
                    <ScrollView
                        contentContainerStyle={{
                            alignItems: 'center',
                            width: '100%',
                            paddingBottom: 40,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                marginBottom: 20
                            }}
                        />
                        <Text style={{
                            color: '#fff',
                            fontSize: 22,
                            marginBottom: 40,
                            fontWeight: '600'
                        }}>
                            {userStore.username}
                        </Text>

                        {menuButton('Account Settings', () => { })}
                        {menuButton('My List', () => { })}
                        {menuButton('Downloads', () => { })}
                        {menuButton('Help Center', () => { })}
                        {menuButton('Logout', () => setLogoutConfirmVisible(true), Colors.accent)}
                        {menuButton('Close', () => setModalVisible(false), '#444')}
                    </ScrollView>
                </View>
            </Modal>

            {/* Secondary confirmation modal for logout */}
            <Modal
                transparent
                animationType="fade"
                visible={logoutConfirmVisible}
                onRequestClose={() => setLogoutConfirmVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: Colors.card,
                        padding: 20,
                        borderRadius: 10,
                        width: '80%',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: Colors.text, fontSize: 18, marginBottom: 20 }}>
                            Are you sure you want to logout?
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => setLogoutConfirmVisible(false)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#444',
                                    padding: 10,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    marginRight: 10
                                }}
                            >
                                <Text style={{ color: Colors.text }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleConfirmLogout}
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.accent,
                                    padding: 10,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    marginLeft: 10
                                }}
                            >
                                <Text style={{ color: '#fff' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
});
