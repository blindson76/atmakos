import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, Card, Layout, Text, Input, TopNavigation, Divider, TopNavigationAction, Select, SelectItem } from '@ui-kitten/components';
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
const userGroups = [
  'KAMU KURUMU',
  'ATIK ÜRETİCİSİ',
  'GERİ DÖNÜŞÜM ŞİRKETİ'
]
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

  const handleSubmit = async (newuser) => {
    setBusy(true);

    try{
      const user = await signUp(newuser);

      console.log(user.id)
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
              initialValues={{ email: '', password: '', rePassword:'', name:'', lastname:'', group:0 }}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
                <View>
                  <Select
                    label="Kullanıcı Tipi"
                    placeholder='Default'
                    value={userGroups[values.group]}
                    onSelect={(row) => {
                      console.log(userGroups[row-1],row-1)
                      setFieldValue('group',row-1)
                    }}>
                    {userGroups.map((k,i)=>{
                      return (
                        <SelectItem title={k} key={i} />
                      )
                    })}
                  </Select>
                  <Input
                    value={values.name}
                    label='İsim'
                    placeholder='isim'
                    onChangeText={handleChange('name')}
                  />
                  <Input
                    value={values.lastname}
                    label='Soyisim'
                    placeholder='soyisim'
                    onChangeText={handleChange('lastname')}
                  />
                  <Input
                    value={values.email}
                    label='E-mail'
                    placeholder='email'
                    onChangeText={handleChange('email')}
                  />
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    label='Şifre'
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    placeholder="password"
                  />
                  <Input
                    onChangeText={handleChange('repassword')}
                    onBlur={handleBlur('repassword')}
                    label='Şifre tekrar'
                    value={values.repassword}
                    secureTextEntry={secureTextEntry}
                    placeholder="password"
                  />
                  <Button
                    style={styles.footerControl}
                    onPress={handleSubmit}>
                    Kayıtol
                    </Button>
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