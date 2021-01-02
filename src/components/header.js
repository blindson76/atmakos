import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import AuthProvider, { useAuth } from '../store/Auth';
export default () => {
    const {user,signOut} = useAuth();
    if (user)
        return (
            <>
                <Text>{user.id}</Text>
                <Button title="Logout" onPress={signOut}/>
            </>
        )
    
}