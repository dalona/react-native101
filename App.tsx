import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from "./src/screens/ContactListScreen/contactsListScreen";
import AddEditContactScreen from './src/screens/AddEditContactScreen/addeditcontact';
import ContactDetailScreen from './src/screens/ContactDetails/contactDetailsScreen';
import GoogleMapsScreen from './src/screens/GoogleMapsScreen/googleMapsScreen';
import RegisterScreen from './src/screens/registerScreen/registerScreen';
import { Contact } from './src/types/types';
import LoginScreen from './src/screens/loginScreen/loginScreen';

export type RootStackParamList = {
  ContactList: undefined;
  AddEditContact: { contact?: Contact } | undefined;
  ContactDetail: { contact: Contact };
  GoogleMaps: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        {/* Tus otras pantallas */}
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
          options={{ title: 'Google Maps' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
