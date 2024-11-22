import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { register } from '../../services/authService';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    try {
      await register({
        name,
        email,
        password,
        phoneNumber,
        profile_picture_uri: '',
      });
      navigation.navigate('Login'); // Redirigir al login tras el registro
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Register" onPress={handleRegister} color="#335C81" />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} color="#65AFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1B2845',
  },
  title: {
    fontSize: 32,
    color: '#65AFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#335C81',
    color: '#FFFFFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default RegisterScreen;

