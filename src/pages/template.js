import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';
import { Menu, MenuItem } from '@ui-kitten/components';

export default function(){
    return (
        <Text>Randevu</Text>
    )
}