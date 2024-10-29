import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from "./src/screens/ContactListScreen/contactsListScreen"
import AddEditContactScreen from './src/screens/AddEditContactScreen/addeditcontact';
import ContactDetailScreen from './src/screens/ContactDetails/contactDetailsScreen';
import { Contact } from './src/types/types';
import GoogleMapsScreen from './src/screens/GoogleMapsScreen/googleMapsScreen';

// Definimos el tipo RootStackParamList
export type RootStackParamList = {
  ContactList: undefined;
  AddEditContact: { contact?: Contact } | undefined;
  ContactDetail: { contact: Contact };
  GoogleMaps: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen
          name="ContactList"
          component={ContactListScreen}
          options={{ title: 'Contacts' }}
        />
        <Stack.Screen
          name="AddEditContact"
          component={AddEditContactScreen}
          options={{ title: 'Add/Edit Contact' }}
        />
        <Stack.Screen
          name="ContactDetail"
          component={ContactDetailScreen}
          options={{ title: 'Contact Details' }}
        />
        <Stack.Screen
          name="GoogleMaps"
          component={GoogleMapsScreen}
          options={{ title: 'Contact Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
