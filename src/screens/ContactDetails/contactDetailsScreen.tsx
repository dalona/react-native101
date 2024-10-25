import React from 'react';
import { View, Text, Button, Image } from 'react-native';
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
    <View>
      <Text>{contact.name}</Text>
      <Text>{contact.phone}</Text>
      <Text>{contact.email}</Text>
      {contact.photo && <Image source={{ uri: contact.photo }} style={{ width: 100, height: 100 }} />}
      <Button title="Eliminar Contacto" onPress={deleteContact} />
      <Button title="Editar" onPress={() => navigation.navigate('AddEditContact', { contact })} />
    </View>
  );
}
