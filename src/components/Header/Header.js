import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
} from 'react-native';
import { userStore } from '../../store/userStore';
import Colors from '../../constants/Colors';
import { observer } from 'mobx-react-lite';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
export default observer(function Header({ onLogout }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

    const handleConfirmLogout = () => {
        setLogoutConfirmVisible(false);
        setModalVisible(false);
        onLogout();
    };

    const menuButton = (label, onPress, bgColor = '#222') => (
        <TouchableOpacity
            key={label}
            onPress={onPress}
            style={[styles.menuButton]}
        >
            <Text style={styles.menuButtonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.headerContainer}>
            {/* Logo */}
            <Image
                source={require('../../assets/images/home_logo.png')}
                style={styles.logo}
            />

            {/* Icons */}
            <View style={styles.iconRow}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={require('../../assets/images/profile_icon.png')}
                        style={styles.profileIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Full-Screen Modal */}
            <Modal
                transparent={false}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView
                        contentContainerStyle={styles.modalContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.modalLogo}
                        />
                        <Text style={styles.username}>{userStore.username}</Text>

                        {menuButton('Account Settings', () => { })}
                        {menuButton('My List', () => { })}
                        {menuButton('Downloads', () => { })}
                        {menuButton('Help Center', () => { })}
                        {menuButton('Logout', () => setLogoutConfirmVisible(true), Colors.accent)}
                        {menuButton('Close', () => setModalVisible(false), '#444')}
                    </ScrollView>
                </View>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal
                transparent
                animationType="fade"
                visible={logoutConfirmVisible}
                onRequestClose={() => setLogoutConfirmVisible(false)}
            >
                <View style={styles.confirmModalOverlay}>
                    <View style={styles.confirmModalBox}>
                        <Text style={styles.confirmText}>
                            Are you sure you want to logout?
                        </Text>
                        <View style={styles.confirmButtonsRow}>
                            <TouchableOpacity
                                onPress={() => setLogoutConfirmVisible(false)}
                                style={[styles.confirmButton, styles.cancelButton]}
                            >
                                <Text style={styles.confirmButtonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleConfirmLogout}
                                style={[styles.confirmButton, styles.logoutButton]}
                            >
                                <Text style={styles.confirmButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
});