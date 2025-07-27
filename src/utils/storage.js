import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = async (key) => {
    const json = await AsyncStorage.getItem(key);
    return json != null ? JSON.parse(json) : null;
};

export const removeItem = async (key) => {
    await AsyncStorage.removeItem(key);
};
