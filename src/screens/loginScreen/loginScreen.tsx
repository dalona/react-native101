import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login } from '../../services/authService';
import { saveToken } from '../../services/tokenService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { message } = await login({ email, password });
      await saveToken(message); // Guardar el token
      navigation.navigate('ContactList'); // Redirigir a la lista de contactos
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} color="#335C81" />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} color="#65AFFF" />
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
    color: '#FFFFFF',
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

export default LoginScreen;
