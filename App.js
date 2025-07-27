import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import { LogBox, Platform, SafeAreaView, StatusBar } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


AntDesign.loadFont();
MaterialCommunityIcons.loadFont();
Feather.loadFont();
MaterialIcons.loadFont();
Octicons.loadFont();
Foundation.loadFont();
Ionicons.loadFont();
Entypo.loadFont();
FontAwesome.loadFont();

LogBox.ignoreAllLogs();
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
