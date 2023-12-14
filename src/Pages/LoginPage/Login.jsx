import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import loginData from '../../../login-data.json'; 
import Alert from '../../Components/Alert';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    AsyncStorage.getItem('usuario').then((userData) => {
        if (userData !== null) {
          navigation.navigate('Home');
        }
    });
    const handleLogin = () => {
      const account = loginData.accounts[email];
    
      if (account && account.senha === password) {
       AsyncStorage.setItem('usuario', JSON.stringify(account));
     navigation.navigate('Home')
      } else {
          setShowAlert(true); 
      }
    };
  
    return (
      <View style={styles.container}>
        <Image source={require('../../Assets/logo-branca.png')} style={styles.logo} />
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Seu e-mail para login."
            placeholderTextColor="black"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Sua senha para login."
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
  
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Acessar</Text>
        </TouchableOpacity>
  
        {showAlert && ( 
          <Alert
            visible={showAlert}
            title="Erro!"
            message="Conta não encontrada em nosso sistema"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'green',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#ffff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'green',
  },
});
