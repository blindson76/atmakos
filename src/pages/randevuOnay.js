import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useState, useContext, useEffect } from 'react';
import { anonymousLogin, loginEmailPassword } from '../services/authSvc';
import { Busy } from '../components/busy';
import AuthProvider, { useAuth } from '../store/Auth';
import { Button, Menu, MenuItem, Modal, Card, Text, Layout } from '@ui-kitten/components';
import { useTalep } from '../store/Talep';

export default function ({ navigation, route }) {
    const { talepListele, talepEkle } = useTalep();
    const { form } = route.params;
    const [busy, setBusy] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleSubmit = async () => {
        console.log(form)
        setBusy(true);
        try {
            const talep = await talepEkle(form);
            setBusy(false)
            setVisible(true)
        } catch (err) {
            console.log(err)
        } finally {
            setBusy(false)
        }
    }
    const handleExit = () => {
        setVisible(false)
        navigation.navigate('TalepMain')
    }
    const handleYeniTalep = () => {
        setVisible(false)
        navigation.navigate('Randevu')
    }
    return (
        <View>
            <Busy isBusy={busy}>
                <Text>Randevu Onay</Text>
                <Text>{JSON.stringify(form)}</Text>
                <Button onPress={handleSubmit}>Onayla</Button>
            </Busy>
            <Modal visible={visible} backdropStyle={styles.backdrop}>
                <Card disabled={true}>
                    <Text>Taşıma talebi oluşturuldu</Text>
                    <Layout level='1'>
                        <Button style={styles.button} appearance="ghost" onPress={handleYeniTalep}>
                            Yeni Talep Oluştur
                        </Button>
                        <Button style={styles.button} appearance="outline" onPress={handleExit} >
                            Çıkış
                        </Button>
                    </Layout>
                </Card>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    btnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    }
});