import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';
import { Menu, MenuItem } from '@ui-kitten/components';

export default ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View>
      <Menu>
        <MenuItem title="Randevu Al" onPress={()=>{navigation.navigate("Randevu")}}></MenuItem>
        <MenuItem title="Geçmiş"></MenuItem>
      </Menu>
    </View>
  );
}