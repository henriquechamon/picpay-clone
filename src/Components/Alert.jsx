import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const Alert = ({ visible, title, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertText}>{message}</Text>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={onClose}
          >
            <Text style={styles.alertButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Alert;
