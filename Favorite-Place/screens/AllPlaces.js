import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';

let placesCache = [];

function AllPlaces({ route, navigation }) {
  const [loadedPlaces, setLoadedPlaces] = useState(placesCache);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setLoadedPlaces([...placesCache]);
    }
  }, [isFocused]);

  useEffect(() => {
    const newPlace = route?.params?.place;
    if (!newPlace) {
      return;
    }

    const exists = placesCache.some((place) => place.id === newPlace.id);
    if (!exists) {
      placesCache = [newPlace, ...placesCache];
      setLoadedPlaces((currentPlaces) => [newPlace, ...currentPlaces]);
    }

    navigation.setParams({ place: undefined });
  }, [route, navigation]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
