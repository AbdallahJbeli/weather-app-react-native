import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const apiKey = '1b5cb05af56fe087bf1126346416c054';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const checkWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (response.status === 404) {
        setError(true);
        setWeather(null);
      } else {
        const data = await response.json();
        setWeather(data);
        setError(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Function to map weather condition to an image
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return require('./assets/images/clear.png');
      case 'Clouds':
        return require('./assets/images/clouds.png');
      case 'Rain':
        return require('./assets/images/rain.png');
      case 'Snow':
        return require('./assets/images/snow.png');
      case 'Mist':
        return require('./assets/images/mist.png');
      case 'Drizzle':
        return require('./assets/images/drizzle.png');
      default:
        return require('./assets/images/clear.png'); // Default image for unknown conditions
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setCity(text)}
          />
          <TouchableOpacity style={styles.button} onPress={checkWeather}>
            <Image
              source={require('./assets/images/search.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>

        {error && (
          <Text style={styles.error}>Invalid city name</Text>
        )}

        {weather && (
          <View style={styles.weather}>
            <Image
              source={getWeatherIcon(weather.weather[0].main)} // Dynamically set weather icon
              style={styles.weatherIcon}
            />
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            <Text style={styles.city}>{weather.name}</Text>
            <View style={styles.details}>
              <View style={styles.col}>
                <Image
                  source={require('./assets/images/humidity.png')}
                  style={styles.icon}
                />
                <Text style={styles.label}>
                  {weather.main.humidity}% Humidity
                </Text>
              </View>
              <View style={styles.col}>
                <Image
                  source={require('./assets/images/wind.png')}
                  style={styles.icon}
                />
                <Text style={styles.label}>
                  {weather.wind.speed} Km/h Wind
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141E30',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  weather: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 40,
    color: '#fff',
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    color: '#ecf0f1',
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  col: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  label: {
    color: '#fff',
  },
});
