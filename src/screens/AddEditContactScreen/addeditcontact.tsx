import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Contact } from '../../types/types';
import { RouteProp } from '@react-navigation/native';

type AddEditContactScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddEditContact'>;
type AddEditContactScreenRouteProp = RouteProp<RootStackParamList, 'AddEditContact'>;

interface Props {
  navigation: AddEditContactScreenNavigationProp;
  route: AddEditContactScreenRouteProp;
}

export default function AddEditContactScreen({ navigation, route }: Props) {
  const { contact } = route.params || {};
  const [name, setName] = useState(contact ? contact.name : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');
  const [email, setEmail] = useState(contact ? contact.email : '');
  const [photo, setPhoto] = useState<string | undefined>(contact ? contact.photo : undefined);

  const saveContact = async () => {
    const newContact: Contact = {
      id: contact ? contact.id : Date.now(),
      name,
      phone,
      email,
      photo,
      address: ''
    };

    const storedContacts = await AsyncStorage.getItem('contacts');
    const contacts: Contact[] = storedContacts ? JSON.parse(storedContacts) : [];

    if (contact) {
      const updatedContacts = contacts.map(c => (c.id === contact.id ? newContact : c));
      await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } else {
      await AsyncStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
    }

    navigation.goBack();
  };

  const selectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets?.length) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets?.length) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre" 
        value={name} 
        onChangeText={setName} 
        placeholderTextColor="#B0B0B0" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Teléfono" 
        value={phone} 
        onChangeText={setPhone} 
        placeholderTextColor="#B0B0B0" 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        placeholderTextColor="#B0B0B0" 
      />
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}
      
      <TouchableOpacity style={styles.button} onPress={selectPhoto}>
        <Text style={styles.buttonText}>Seleccionar Foto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonSave} onPress={saveContact}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2845', 
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E6D5B8',
  },
  button: {
    backgroundColor: '#335C81', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSave: {
    backgroundColor: '#65AFFF', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
});

