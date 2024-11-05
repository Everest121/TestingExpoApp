import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

// Function to generate a random color
const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

// Component for rendering color history
const ColorHistory = React.memo(({ colorHistory }: { colorHistory: string[] }) => (
  <View style={styles.box}>
    <Text style={styles.sectionTitle}>Color History</Text>
    <FlatList
      data={colorHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.historyItem}>{item}</Text>
      )}
      getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
    />
  </View>
));

// Component for rendering favorite colors
const FavoriteColors = React.memo(({ favorites, setBackgroundColor }: { favorites: string[], setBackgroundColor: (color: string) => void }) => (
  <View style={styles.box}>
    <Text style={styles.sectionTitle}>Favorite Colors</Text>
    <FlatList
      data={favorites}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setBackgroundColor(item)}>
          <Text style={styles.favoriteItem}>{item}</Text>
        </TouchableOpacity>
      )}
      getItemLayout={(data, index) => ({ length: 40, offset: 40 * index, index })}
    />
  </View>
));

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handlePress = useCallback(() => {
    const newColor = generateRandomColor();
    setBackgroundColor(newColor);
    setColorHistory((prevHistory) => [newColor, ...prevHistory]);
  }, []);

  const addToFavorites = useCallback((color: string) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(color) ? prevFavorites : [color, ...prevFavorites]
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.mainArea} onPress={handlePress}>
        <Text style={styles.text}>Hello there</Text>
        <TouchableOpacity style={styles.button} onPress={() => addToFavorites(backgroundColor)}>
          <Text style={styles.buttonText}>Add to Favorites</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <ColorHistory colorHistory={colorHistory} />
      <FavoriteColors favorites={favorites} setBackgroundColor={setBackgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    flex: 1,
    width: '40%',
    minWidth: 200,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  historyItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  favoriteItem: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
});