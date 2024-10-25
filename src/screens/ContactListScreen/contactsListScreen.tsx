import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Contact } from '../../types/types';
import { RouteProp, useNavigation } from '@react-navigation/native';

type ContactListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactList'>;

interface Props {
  navigation: ContactListScreenNavigationProp;
}

export default function ContactListScreen({ navigation }: any) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    };
    fetchContacts();
  }, []);

  const navigate = useNavigation()

  return (
    <View>
      <Text>Hola desde Contactos</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ContactDetail', { contact: item })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Agregar Contacto" onPress={() => navigation.navigate('AddEditContact')} />
    </View>
  );
}


  

