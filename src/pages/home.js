import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../pages/main';

import YeniTalep from './yeniTalep'
import RandevuScreen from './randevu'
import RandevuTarihiScreen from './randevuTarihi'
import RandevuOnayScreen from './randevuOnay'
const Stack = createStackNavigator();


export default ({ navigation }) => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="TalepMain" component={MainScreen} ></Stack.Screen>
        <Stack.Screen name="YeniTalep" component={YeniTalep} ></Stack.Screen>
        <Stack.Screen name="Randevu" component={RandevuScreen} ></Stack.Screen>
        <Stack.Screen name="RandevuTarihi" component={RandevuTarihiScreen} ></Stack.Screen>
        <Stack.Screen name="RandevuOnay" component={RandevuOnayScreen} ></Stack.Screen>
      </Stack.Navigator>
  )
};
