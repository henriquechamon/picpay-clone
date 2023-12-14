import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertComponent from '../../Components/Alert'; 
import * as Notifications from 'expo-notifications';


export default function Transferir({ navigation }) {
  const [user, setUser] = useState(null);
  const [valor, setValor] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const userData = await AsyncStorage.getItem('usuario');
      if (userData !== null) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.log('Erro ao recuperar dados do AsyncStorage:', error);
    }
  };

  const handleTransferir = async () => {
    try {
      if (valor > user.saldo) {
        setShowAlert(true);
      } else if (!valor || !chavePix) {
        Alert.alert('Preencha todos os campos!', 'Por favor, preencha todos os campos.');
      } else {
        const novoSaldo = user.saldo - parseFloat(valor);
        const novoUsuario = { ...user, saldo: novoSaldo };
     
        await AsyncStorage.setItem('usuario', JSON.stringify(novoUsuario));
        await AsyncStorage.setItem('Remetente', JSON.stringify([chavePix, valor]));




        setUser(novoUsuario);
        console.log(`${user.nome} || Nova transferência realizada \nPara: ${chavePix}`)

    
        navigation.navigate('Comprovante')
      }
    } catch (error) {
      console.error('Erro ao realizar transferência:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../Assets/logo-branca-100.png')} style={styles.logo} />
      <Text style={styles.title}>Vamos fazer uma transferência</Text>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="R$"
          keyboardType="numeric"
          value={valor}
          placeholderTextColor="black"
          onChangeText={(text) => setValor(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={chavePix}
          placeholderTextColor="black"
          onChangeText={(text) => setChavePix(text)}
        />

        <TouchableOpacity style={styles.payButton} onPress={handleTransferir}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      </View>

      {showAlert && (
        <AlertComponent
          title="Saldo insuficiente"
          message="Você não tem saldo suficiente para concluir essa operação."
          onClose={() => setShowAlert(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07cc75',
    padding: 5,
  },
  logo: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#07cc75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#07cc75',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
