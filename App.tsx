import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from "./src/screens/ContactListScreen/contactsListScreen"
import AddEditContactScreen from './src/screens/AddEditContactScreen/addeditcontact';
import ContactDetailScreen from './src/screens/ContactListScreen/contactsListScreen';
import { Contact } from './src/types/types';

export type RootStackParamList = {
  ContactList: undefined;
  AddEditContact: { contact?: Contact } | undefined;
  ContactDetail: { contact: Contact };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{ title: 'Contactos' }} />
        <Stack.Screen name="AddEditContact" component={AddEditContactScreen} options={{ title: 'Agregar/Editar Contacto' }} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ title: 'Detalle del Contacto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
