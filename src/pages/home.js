import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Drawer, DrawerItem, IndexPath, Button, Icon, Card, Layout, Text, Input, TopNavigation, Divider, TopNavigationAction } from '@ui-kitten/components';
import { Formik } from 'formik';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Toast from 'react-native-easy-toast';
import { Busy } from '../components/busy';
import {useAuth} from '../store/Auth';
import {MainScreen} from '../pages/main';

const { Navigator, Screen } = createDrawerNavigator();

const Header = (props) => (
  <View {...props}>
    <Text category='h6'>Giriş Yap</Text>
  </View>
);
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const LogoutIcon = (props) => (
  <Icon {...props} name='power-outline' />
);
const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);
const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      İptal
    </Button>
    <Button
      style={styles.footerControl}
      size='small'
      onPress={() => { console.log("sfs") }}>
      Giriş
    </Button>
  </View>
);
const RightActions = () => {
  const {user, signOut} = useAuth();
  const navigation = useNavigation();
  const logout = async () => {
    try{
      await signOut()
      navigation.replace('SignIn')
    }catch(err){

    }finally{

    }
  }
  return (
    <TopNavigationAction icon={LogoutIcon} onPress={logout} />
  );
}
const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
);

const DrawerContent = ({ navigation, state }) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title='Users' />
    <DrawerItem title='Orders' />
  </Drawer>
);

export const DrawerNavigator = () => (
  <Navigator openByDefault={true} drawerType='permanent' drawerStyle={{width:70}} drawerContent={props => <DrawerContent {...props}/>}>
    <Screen name='Main' component={MainScreen}/>
    <Screen name='TalepEkle' component={OrdersScreen}/>
  </Navigator>
);

export default ({ navigation }) => {

  const {user,signIn, signUp, signOut} = useAuth()  
  const toastRef = useRef();

  const [busy, setBusy] = useState(false);
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );
  return (
      <DrawerNavigator/>
  )
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
    marginVertical: 40
  },
});


/*
<SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction} accessoryRight={RightActions} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        <Busy isBussy={busy}>
          <View style={{ marginHorizontal: 40 }}>
            <Text>HOME</Text>
          </View>
        </Busy>
      </Layout>
      <Toast ref={toastRef} position="bottom" />
    </SafeAreaView>
    */