import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';

enableScreens();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight + 15 : 50, backgroundColor: "#000" }}>
      <FlashMessage />
      <StatusBar
        translucent
        backgroundColor="#000"
        barStyle="light-content"
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>

  );
}
