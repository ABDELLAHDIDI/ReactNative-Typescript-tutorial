import { View, Text, StyleSheet } from 'react-native';

import { PlaceForm } from '../features/places/components/PlaceForm';
import { PlaceList } from '../features/places/components/PlaceList';
import { PlaceDetails } from '../features/places/components/PlaceDetails';
import { PlacesController } from '../features/places/state/usePlacesState';

type ScreenMode = 'list' | 'details';

type Props = {
  screen: ScreenMode;
  placesState: PlacesController;
};

export function PlacesScreen({ screen, placesState }: Props) {
  if (screen === 'details' && placesState.selectedPlace) {
    return (
      <PlaceDetails
        place={placesState.selectedPlace}
        onClose={() => placesState.selectPlace(null)}
      />
    );
  }

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Favorite places</Text>
      <Text style={styles.subtitle}>
        Save memorable locations with a title, photo and coordinates.
      </Text>
      <PlaceForm
        onSubmit={(draft) => {
          placesState.addPlace(draft);
        }}
      />
      <Text style={styles.sectionTitle}>Saved places</Text>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <PlaceList
        places={placesState.places}
        onSelect={placesState.selectPlace}
        header={header}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
});

