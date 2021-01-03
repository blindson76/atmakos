import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useRef, useContext, useEffect } from 'react';
import { Icon, Layout, Menu, MenuItem, Text, Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';
import YeniTalep from './yeniTalep'
import RandevuScreen from './randevu'
import RandevuTarihiScreen from './randevuTarihi'
import RandevuOnayScreen from './randevuOnay'
const Draw = createDrawerNavigator();
const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
);

const useMenuState = (initialState = null) => {
    const [selectedIndex, setSelectedIndex] = useState(initialState);
    return { selectedIndex, onSelect: setSelectedIndex };
};

function HomePage({ navigation }) {
    const { user } = useAuth();
    const rightMenuState = useMenuState();
    return (
        <Layout style={styles.container}>
            <Text category='h6'>Talepler</Text>
            <Menu>
                <MenuItem title='Taşıma Talebi Ekle' accessoryRight={ForwardIcon} onPress={() => { navigation.navigate('YeniTalep') }} />
                <MenuItem title='Tıbbi Atık Talebi Ekle' accessoryRight={ForwardIcon} />
            </Menu>
        </Layout>
    );
}

const OrdersScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Talep listesi</Text>
    </Layout>
);

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title='Ekle' />
        <DrawerItem title='Liste' />
    </Drawer>
);


export default function MainScreen({ navigation }) {

    return (
        <Draw.Navigator openByDefault={true} drawerType='permanent' drawerStyle={{ width: 70 }} drawerContent={props => <DrawerContent {...props} />}>
            <Draw.Screen name='TalepEkle' component={HomePage} />
            <Draw.Screen name='Liste' component={OrdersScreen} />
        </Draw.Navigator>
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