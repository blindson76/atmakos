import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';

import AuthProvider, { useAuth } from '../store/Auth';
import { Button, Datepicker, Input, Menu, MenuItem } from '@ui-kitten/components';

export default function ({ navigation, route }) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {form} = route.params;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const handleSubmit = ({adres}) => {
    navigation.navigate("RandevuOnay",{form:{...form, adres, date:date.toString()}})
  }
  return (
    <View>
      <Formik initialValues={{adres: '' }} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
          <>
            <Button appearance="ghost"
              onPress={() => { setMode('date'); setShow(true) }}>Tarih seç</Button>
            <Button appearance="ghost"
              onPress={() => { setMode('time'); setShow(true) }}>Saat seç</Button>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Input
              value={values.adres}
              label='Adres'
              placeholder='Adres'
              onChangeText={handleChange('adres')}
            />
            <Button onPress={handleSubmit} >Onay</Button></>
        )}
      </Formik>
    </View>
  )
}