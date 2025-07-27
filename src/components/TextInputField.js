import React from 'react';
import { TextInput } from 'react-native';
import Colors from '../constants/Colors';

export default function TextInputField({ placeholder, value, onChangeText, secureTextEntry }) {
    return (
        <TextInput
            style={{
                borderWidth: 1,
                borderColor: '#555',
                backgroundColor: '#111',
                color: Colors.text,
                padding: 10,
                marginVertical: 10,
                borderRadius: 6,
            }}
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
}
