import { View, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, PROVIDER_GOOGLE, MapPressEvent } from 'react-native-maps';
import { API_KEY } from '@env'; // Para acceder a la clave API desde .env

const GoogleMapsScreen = () => {
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [weather, setWeather] = useState<any>(null); // Almacenar los datos del clima

  // Cargar el marcador desde Async Storage al iniciar
  useEffect(() => {
    const loadMarkerPosition = async () => {
      try {
        const savedMarker = await AsyncStorage.getItem('markerPosition');
        if (savedMarker) {
          const parsedPosition = JSON.parse(savedMarker);
          setMarkerPosition(parsedPosition);
          fetchWeather(parsedPosition.latitude, parsedPosition.longitude); // Obtener el clima para la posición guardada
        }
      } catch (error) {
        console.log('Error loading marker position', error);
      }
    };

    loadMarkerPosition();
  }, []);

  // Función para obtener el clima desde la API de OpenWeather usando fetch
  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url); // Usamos fetch en lugar de axios
      if (response.ok) {
        const data = await response.json(); // Convertimos la respuesta en JSON
        setWeather(data); // Establecemos los datos del clima
      } else {
        console.error('Error fetching weather data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  // Guardar y actualizar la posición del marcador al tocar el mapa
  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarkerPosition = { latitude, longitude };

    setMarkerPosition(newMarkerPosition);
    await AsyncStorage.setItem('markerPosition', JSON.stringify(newMarkerPosition)); // Guardar la nueva posición

    fetchWeather(latitude, longitude); // Obtener el clima de la nueva ubicación
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

      {weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherText}>
            {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.weatherText}>
            {weather.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            {weather.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  weatherInfo: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default GoogleMapsScreen;
