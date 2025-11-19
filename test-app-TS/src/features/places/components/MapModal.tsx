import { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker, MapPressEvent, Region } from 'react-native-maps';

import { Coordinates } from '../types';

type Props = {
  visible: boolean;
  initialCoordinate?: Coordinates | null;
  onClose: () => void;
  onConfirm: (coordinate: Coordinates) => void;
};

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export function MapModal({
  visible,
  initialCoordinate,
  onClose,
  onConfirm,
}: Props) {
  const [selectedCoordinate, setSelectedCoordinate] = useState<
    Coordinates | null
  >(initialCoordinate ?? null);

  useEffect(() => {
    if (visible) {
      setSelectedCoordinate(initialCoordinate ?? null);
    }
  }, [initialCoordinate, visible]);

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinate({ latitude, longitude });
  };

  const handleConfirm = () => {
    if (selectedCoordinate) {
      onConfirm(selectedCoordinate);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...DEFAULT_REGION,
            latitude: selectedCoordinate?.latitude ?? DEFAULT_REGION.latitude,
            longitude: selectedCoordinate?.longitude ?? DEFAULT_REGION.longitude,
          }}
          onPress={handleMapPress}
        >
          {selectedCoordinate && (
            <Marker coordinate={selectedCoordinate} title="Selected location" />
          )}
        </MapView>
        <View style={styles.controls}>
          <Pressable style={[styles.button, styles.cancel]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              !selectedCoordinate && styles.buttonDisabled,
            ]}
            onPress={handleConfirm}
            disabled={!selectedCoordinate}
          >
            <Text style={styles.buttonText}>Use location</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  cancel: {
    backgroundColor: '#e63946',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

