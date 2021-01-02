import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { Icon, Layout, Menu, MenuItem, Text} from '@ui-kitten/components';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';
const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
);

const useMenuState = (initialState = null) => {
    const [selectedIndex, setSelectedIndex] = React.useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

export function MainScreen({ navigation }) {
    const { user } = useAuth();
    const rightMenuState = useMenuState();
    return (
        <Layout style={styles.container}>
            <Text category='h6'>Talepler</Text>
            <Menu>
                <MenuItem title='Taşıma Talebi Ekle' accessoryRight={ForwardIcon} onPress={()=>{navigation.push('TalepEkle')}}/>
                <MenuItem title='Tıbbi Atık Talebi Ekle' accessoryRight={ForwardIcon} />
            </Menu>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    menu: {
        margin: 8,
    },
});