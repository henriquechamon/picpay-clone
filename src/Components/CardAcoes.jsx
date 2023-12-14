import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';


export default function CardAcoes({ handleTransferir }) {
    return (
      <View style={styles.card}>
        <Text style={styles.showBalanceText}>Conta PicPay:</Text>
        <TouchableOpacity style={styles.transferButton} onPress={handleTransferir}>
          <Text style={styles.transferLabel}>Transferir</Text>
        </TouchableOpacity>
      </View>
    );
  }



const styles = StyleSheet.create({
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
    marginBottom: 20,
    marginTop: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  closeButton: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  transferButton: {
    backgroundColor: '#07cc75',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  transferLabel: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#fff',
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
