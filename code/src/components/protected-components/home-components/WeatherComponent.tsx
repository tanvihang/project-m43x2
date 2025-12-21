import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ThemeType } from "../../../types/others/themeType";
import { FontSizes } from "../../../constants/typography";
import { useTheme } from "../../../context/themeContext";
import useWeatherComponent from "../../../hooks/screens-hook/protected-screen-hook/home-screen-hook/useWeatherComponent";

const WeatherComponent = () => {
  const { theme, fonts } = useTheme();
  const styles = createStyles(theme, fonts);

  const { location, isError, isLoading, weatherData } = useWeatherComponent();

  return (
    <View style={styles.card}>
      {isLoading ? (
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      ) : isError ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>Unable to fetch weather data</Text>
        </View>
      ) : (
        weatherData && (
          <View style={styles.weatherContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Current Weather</Text>
              {
                weatherData.name && weatherData.sys.country && (
                  <Text style={styles.locationText}>
                    📍 {weatherData.name}, {weatherData.sys.country}
                  </Text>
                )
              }
            </View>

            <View style={styles.mainWeather}>
              <Text style={styles.temperature}>{Math.round(weatherData.main.feels_like)}°C</Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description.charAt(0).toUpperCase() + 
                 weatherData.weather[0].description.slice(1)}
              </Text>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Feels Like</Text>
                <Text style={styles.detailValue}>{Math.round(weatherData.main.feels_like)}°C</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weatherData.wind.speed} m/s</Text>
              </View>
            </View>
          </View>
        )
      )}
    </View>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 16,
      padding: 20,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    centerContent: {
      alignItems: "center",
      paddingVertical: 20,
    },
    loadingText: {
      fontSize: fonts.body,
      color: theme.textBody,
    },
    errorText: {
      fontSize: fonts.body,
      color: theme.textDanger || "#FF6B6B",
    },
    weatherContent: {
      gap: 16,
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderBody || "#E0E0E0",
      paddingBottom: 12,
    },
    title: {
      fontSize: fonts.h3 || fonts.body,
      fontWeight: "bold",
      color: theme.textBody || theme.textBody,
      marginBottom: 4,
    },
    locationText: {
      fontSize: fonts.bodySmall,
      color: theme.textHelp || theme.textBody,
      opacity: 0.7,
    },
    mainWeather: {
      alignItems: "center",
      paddingVertical: 12,
    },
    temperature: {
      fontSize: 56,
      fontWeight: "bold",
      color: theme.textBody || theme.textBody,
    },
    description: {
      fontSize: fonts.h4 || fonts.body,
      color: theme.textBody,
      marginTop: 8,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.borderBody || "#E0E0E0",
    },
    detailItem: {
      alignItems: "center",
    },
    detailLabel: {
      fontSize: fonts.bodySmall,
      color: theme.textHelp || theme.textBody,
      opacity: 0.7,
      marginBottom: 4,
    },
    detailValue: {
      fontSize: fonts.body,
      fontWeight: "600",
      color: theme.textBody,
    },
  });
};

export default WeatherComponent;
