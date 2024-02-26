import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CardAcoes from '../../Components/CardAcoes';
export default function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(false);

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
  const handleTransferir = () => {
    navigation.navigate('Transferir');
  };

  const handleLogout = () => {
    AsyncStorage.clear()
    console.log('An user has logged out.')
    navigation.navigate('Login')
  };


  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image source={require('../../Assets/logo-branca-100.png')} style={styles.logo} />
          <Text style={styles.title}>Olá, {user.nome}!</Text>

          <View style={styles.card}>
          <Text style={styles.infoAccount} >Saldo em conta</Text>
            {showBalance ? (

              <Text style={styles.cardText}>R$ {user.saldo},00</Text>
            ) : (
              <TouchableOpacity style={styles.balanceContainer} onPress={() => setShowBalance(true)}>
                <Text style={styles.showBalanceText}>Mostrar Saldo</Text>
                <Icon name={showBalance ? 'eye-slash' : 'eye'} size={24} color="#07cc75" />
              </TouchableOpacity>
            )}
          </View>
          
        </>
      )}
 
     <CardAcoes handleTransferir={handleTransferir}></CardAcoes>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07cc75',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
  },
  infoAccount: {
    fontSize: 15,
    marginBottom: 4,
    color: 'black',
  },
  card: {
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
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showBalanceText: {
    fontSize: 18,
    color: '#07cc75',
  },
  logoutText: {
    color: '#07cc75',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
