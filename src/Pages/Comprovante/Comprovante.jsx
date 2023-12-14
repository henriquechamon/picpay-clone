import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Comprovante({ navigation }) {
  const [user, setUser] = useState(null);
  const [chavePix, setChavePix] = useState(null);
  const [valor, setValor] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const userData = await AsyncStorage.getItem('usuario');
      const RemetenteData = await AsyncStorage.getItem('Remetente');
      if (userData !== null) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
      if (RemetenteData !== null) {
        const parsedRemetente = JSON.parse(RemetenteData);
        setChavePix(parsedRemetente[0]);
        setValor(parsedRemetente[1]);
      }
    } catch (error) {
      console.log('Erro ao recuperar dados do AsyncStorage:', error);
    }
  };
    const dataAtual = new Date();
    const data = dataAtual.toLocaleDateString();
    const hora = dataAtual.toLocaleTimeString();
  
     

  
    return (
        <View style={styles.container}>
          <Image style={styles.logoPicpay} source={require('../../Assets/PicpayLogoTransparente.png')} />
          <Image style={styles.logo} source={require('../../Assets/Complete2.png')} />
          <Text style={styles.message}>Pagamento realizado!</Text>
          <Text style={styles.valueMessage}>R$ {valor},00</Text>
          <Text style={styles.subMessage}>Para: {chavePix}</Text>
          <Text style={styles.subMessage}>{hora}</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 200,
        height: 200,
        marginTop: 20,
      },
      logoPicpay: {
        width: 100,
        height: 60,
        marginTop: 20,
      },
      message: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#07cc75',
        marginTop: 20,
      },
      subMessage: {
        fontSize: 18,
        color: '#07cc75',
        marginTop: 10,
      },
      valueMessage: {
        fontSize: 28,
        color: '#07cc75',
        fontWeight: 'bold',
        marginTop: 10,
      },
    });
    