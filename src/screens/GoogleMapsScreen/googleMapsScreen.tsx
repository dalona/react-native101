import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_KEY } from '@env';
import { updateContact } from '../../services/contactsService'; 

const GoogleMapsScreen = ({ navigation, route }: any) => {
  const { contactId } = route.params; // Obtener el ID del contacto de los parámetros de la ruta
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>('');

  // Cargar posición del marcador y dirección guardada al iniciar
  useEffect(() => {
    const loadMarkerAndAddress = async () => {
      const savedMarker = await AsyncStorage.getItem('markerPosition');
      const savedAddress = await AsyncStorage.getItem('markerAddress');
      if (savedMarker) setMarkerPosition(JSON.parse(savedMarker));
      if (savedAddress) setAddress(savedAddress);
    };
    loadMarkerAndAddress();
  }, []);

  // Función para obtener la dirección desde Google Maps API
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Dirección no encontrada';
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error al obtener la dirección';
    }
  };

  // Guardar posición y dirección al tocar el mapa
  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });

    const fetchedAddress = await fetchAddress(latitude, longitude);
    setAddress(fetchedAddress);

    await AsyncStorage.setItem('markerPosition', JSON.stringify({ latitude, longitude }));
    await AsyncStorage.setItem('markerAddress', fetchedAddress);
  };

  // Guardar dirección en el backend
  const handleSaveAddress = async () => {
    if (markerPosition && address) {
      try {
        await updateContact(contactId, {
          latitude: markerPosition.latitude.toString(),
          longitude: markerPosition.longitude.toString(),
          address,
        });
        navigation.goBack();
      } catch (error) {
        console.error('Error saving address:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: markerPosition?.latitude || 37.78825,
          longitude: markerPosition?.longitude || -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={handleMapPress}
      >
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
            <Text style={styles.saveButtonText}>Guardar Dirección</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#335C81',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default GoogleMapsScreen;
