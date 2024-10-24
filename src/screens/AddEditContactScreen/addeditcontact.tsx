import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
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
    <View>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput placeholder="Teléfono" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
      <Button title="Seleccionar Foto" onPress={selectPhoto} />
      <Button title="Tomar Foto" onPress={takePhoto} />
      <Button title="Guardar" onPress={saveContact} />
    </View>
  );
}
