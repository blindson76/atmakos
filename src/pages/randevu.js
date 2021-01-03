import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';
import { Formik } from 'formik';

import AuthProvider, { useAuth } from '../store/Auth';
import { Button, Input, Menu, MenuItem } from '@ui-kitten/components';

export default function ({navigation}) {
  const handleSubmit = atiklar => {
    navigation.navigate("RandevuTarihi",{form:{atiklar}})
  }
  return (
    <View>
      <Formik initialValues={{ cam: "0", plastik: "0", kagit: "0", metal: "0"}} onSubmit={handleSubmit} >
        {
          ({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
            <View>
              <Input
                value={values.kagit}
                label='Kağıt (kg)'
                placeholder='Kağıt'
                onChangeText={handleChange('kagit')}
              />
              <Input
                value={values.cam}
                label='Cam (kg)'
                placeholder='Cam'
                onChangeText={handleChange('cam')}
              />
              <Input
                value={values.metal}
                label='Metal (kg)'
                placeholder='Metal'
                onChangeText={handleChange('metal')}
              />
              <Input
                value={values.plastik}
                label='Plastik (kg)'
                placeholder='Plastik'
                onChangeText={handleChange('plastik')}
              />
              <View>
                <Button onPress={handleSubmit} >Randevu Tarihi Seç</Button>
              </View>
            </View>
          )
        }
      </Formik>
    </View>
  )
}