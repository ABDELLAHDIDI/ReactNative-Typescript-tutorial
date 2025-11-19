import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Place } from '../types';

type Props = {
  place: Place;
  onClose: () => void;
};

export function PlaceDetails({ place, onClose }: Props) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{place.title}</Text>
      {place.imageUri && (
        <Image source={{ uri: place.imageUri }} style={styles.image} />
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <MapView
          style={styles.map}
          region={{
            latitude: place.location.latitude,
            longitude: place.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          pointerEvents="none"
        >
          <Marker coordinate={place.location} title={place.title} />
        </MapView>
        <Text style={styles.coords}>
          {place.location.latitude.toFixed(5)},{' '}
          {place.location.longitude.toFixed(5)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
    gap: 16,
  },
  closeButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#111',
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  map: {
    height: 200,
    borderRadius: 16,
  },
  coords: {
    color: '#444',
  },
});

