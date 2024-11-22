import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContactDetailScreen = ({ navigation, route }: any) => {
  const { contact, address } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactInfo}>{contact.phone}</Text>
      <Text style={styles.contactInfo}>{contact.email}</Text>
      <Text style={styles.contactInfo}>Address: {address || 'No Available'}</Text>

      <TouchableOpacity
        style={styles.addressButton}
        onPress={() => navigation.navigate('GoogleMaps')}
      >
        <Text style={styles.buttonText}>Edit Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
  addressButton: {
    backgroundColor: '#335C81',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ContactDetailScreen;


