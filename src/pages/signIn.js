import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Card, Layout, Text, Input, TopNavigation, Divider, TopNavigationAction } from '@ui-kitten/components';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import { Busy } from '../components/busy';
import {useAuth} from '../store/Auth'
const Header = (props) => (
  <View {...props}>
    <Text category='h6'>Giriş Yap</Text>
  </View>
);
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
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

export default ({ navigation }) => {

  const {user,signIn, signUp, signOut} = useAuth()
  
  const toastRef = useRef();
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const [busy, setBusy] = useState(false);

  const handleSubmit = async ({email, password}) => {
    setBusy(true);

    try{
      const user = await signIn("asd@asd.com", "123456");
      
      try{
        console.log(user.id,await user.mongoClient("mongodb-atlas").db("atmakos").collection("users").find({}))
      }catch(err){
        console.log(err)
      }
      navigation.replace('Home')
      
    }catch(err){
      toastRef.current.show(err.message, 4000);
    }finally{

      setBusy(false)
    }

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center' }}>
        <Busy isBussy={busy}>
          <View style={{ marginHorizontal: 40 }}>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <Input
                    value={values.email}
                    label='E-mail'
                    placeholder='email'
                    caption='Should contain at least 8 symbols'
                    captionIcon={AlertIcon}
                    onChangeText={handleChange('email')}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    placeholder="password"
                  />
                  <Button
                    style={styles.footerControl}
                    onPress={handleSubmit}>
                    Giriş
                    </Button>

                    <TouchableWithoutFeedback onPress={()=>{navigation.push('SignUp')}}>
                      <Text>Üye ol</Text>
                    </TouchableWithoutFeedback>
                </View>
              )}
            </Formik>
          </View>
        </Busy>
      </Layout>
      <Toast ref={toastRef} position="bottom" />
    </SafeAreaView>
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