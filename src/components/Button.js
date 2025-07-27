import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

export default function Button({ title, onPress }) {
    return (
        <TouchableOpacity
            style={{ backgroundColor: Colors.accent, padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 }}
            onPress={onPress}
        >
            <Text style={{ color: '#fff', fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
    );
}
