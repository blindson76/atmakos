import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useContext } from 'react';
import Splash from './pages/splash'
import Header from './components/header'
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import HomeScreen from './pages/home'
import AuthProvider, {useAuth} from './store/Auth';
import { useEffect } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const Stack = createStackNavigator();

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerRight:Header
          }} headerMode="none" >
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider> 
    </>   
  );
}

export default App;