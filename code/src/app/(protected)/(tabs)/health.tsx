import { View, Text, StyleSheet } from 'react-native';

export default function Health() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
