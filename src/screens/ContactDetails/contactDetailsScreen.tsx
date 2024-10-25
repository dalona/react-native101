import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Contact } from '../../types/types';
import { RouteProp } from '@react-navigation/native';

type ContactDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactDetail'>;
type ContactDetailScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;

interface Props {
  navigation: ContactDetailScreenNavigationProp;
  route: ContactDetailScreenRouteProp;
}

export default function ContactDetailScreen({ navigation, route }: Props) {
  const { contact } = route.params;

  const deleteContact = async () => {
    const storedContacts = await AsyncStorage.getItem('contacts');
    const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];
    const updatedContacts = contacts.filter(c => c.id !== contact.id);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {contact.photo ? (
          <Image source={{ uri: contact.photo }} style={styles.contactImage} />
        ) : (
          <Text style={styles.noImageText}>Sin Foto</Text>
        )}
      </View>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactInfo}>{contact.phone}</Text>
      <Text style={styles.contactInfo}>{contact.email}</Text>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteContact}>
        <Text style={styles.buttonText}>Eliminar Contacto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditContact', { contact })}>
        <Text style={styles.buttonText}>Editar Contacto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4ED', 
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8DFF5', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  noImageText: {
    color: '#999',
    fontSize: 16,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#FFB6B9', 
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#B2F9FC', 
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
