import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { styles } from './styles';

export default function TextInputField({ placeholder, value, onChangeText, secureTextEntry }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
}


