import { useState, useCallback } from 'react';
import * as Location from 'expo-location';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { MapModal } from './MapModal';
import { Coordinates, PlaceLocation } from '../types';

type Props = {
  value: PlaceLocation | null;
  onChange: (location: PlaceLocation) => void;
};

export function LocationPicker({ value, onChange }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const ensurePermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === Location.PermissionStatus.GRANTED;
  }, []);

  const handleLocate = useCallback(async () => {
    setIsFetching(true);
    try {
      const hasPermission = await ensurePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission needed',
          'Please allow location access to pick your current spot.',
        );
        return;
      }
      const position = await Location.getCurrentPositionAsync();
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      onChange(location);
    } finally {
      setIsFetching(false);
    }
  }, [ensurePermission, onChange]);

  const handleMapPick = (coordinate: Coordinates) => {
    onChange(coordinate);
    setIsMapOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location</Text>
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={handleLocate}>
          <Text style={styles.buttonText}>Use current</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, styles.outlined]}
          onPress={() => setIsMapOpen(true)}
        >
          <Text style={[styles.buttonText, styles.outlinedText]}>
            Pick on map
          </Text>
        </Pressable>
      </View>
      <View style={styles.preview}>
        {isFetching ? (
          <ActivityIndicator />
        ) : value ? (
          <MapView
            style={styles.mapPreview}
            pointerEvents="none"
            region={{
              latitude: value.latitude,
              longitude: value.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={value} />
          </MapView>
        ) : (
          <Text style={styles.placeholder}>No location selected yet</Text>
        )}
      </View>
      <MapModal
        visible={isMapOpen}
        initialCoordinate={value}
        onClose={() => setIsMapOpen(false)}
        onConfirm={handleMapPick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  outlined: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#111',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  outlinedText: {
    color: '#111',
  },
  preview: {
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    color: '#888',
  },
  mapPreview: {
    width: '100%',
    height: '100%',
  },
});

