import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';

export default ({ navigation }) => {
  const { user } = useAuth();
  useEffect(()=>{
    setTimeout(()=>{
      if(user){
        navigation.replace("Home")
      }else{
        navigation.replace("SignIn")
      }
    },100)
  },[]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}