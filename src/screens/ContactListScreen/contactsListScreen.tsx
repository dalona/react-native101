import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { Contact } from '../../types/types';
import { useNavigation } from '@react-navigation/native';

type ContactListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactList'>;

interface Props {
  navigation: ContactListScreenNavigationProp;
}

export default function ContactListScreen({ navigation }: Props) {
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

  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lista de Contactos</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactCard} 
            onPress={() => navigation.navigate('ContactDetail', { contact: item })}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactInfo}>{item.phone}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No hay contactos guardados</Text>}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditContact')}>
        <Text style={styles.buttonText}>Agregar Contacto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2845', 
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: '#5A7AA4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  contactInfo: {
    fontSize: 14,
    color: '#CFDCEB',
    marginTop: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#5899E2', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


  

