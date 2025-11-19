import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { PlacesScreen } from '../screens/PlacesScreen';
import { usePlacesState } from '../features/places/state/usePlacesState';

export function PlacesApp() {
  const placesState = usePlacesState();
  const { selectedPlaceId, selectedPlace } = placesState;

  const screen = useMemo(() => {
    if (selectedPlaceId && selectedPlace) {
      return 'details';
    }
    return 'list';
  }, [selectedPlaceId, selectedPlace]);

  return (
    <View style={styles.container}>
      <PlacesScreen screen={screen} placesState={placesState} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

