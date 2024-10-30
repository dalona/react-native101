import { View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, PROVIDER_GOOGLE, MapPressEvent } from 'react-native-maps';

const GoogleMapsScreen = () => {
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);

  // Cargar el marcador desde Async Storage al iniciar
  useEffect(() => {
    const loadMarkerPosition = async () => {
      try {
        const savedMarker = await AsyncStorage.getItem('markerPosition');
        if (savedMarker) {
          setMarkerPosition(JSON.parse(savedMarker));
        }
      } catch (error) {
        console.log('Error loading marker position', error);
      }
    };

    loadMarkerPosition();
  }, []);

  // Guardar y actualizar la posición del marcador al tocar el mapa
  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarkerPosition = { latitude, longitude };
    
    setMarkerPosition(newMarkerPosition);

    try {
      await AsyncStorage.setItem('markerPosition', JSON.stringify(newMarkerPosition));
    } catch (error) {
      console.log('Error saving marker position', error);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 1000,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapsScreen;
