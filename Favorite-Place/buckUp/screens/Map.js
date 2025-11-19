import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

function Map({navigation, route}) {
    const [selectedLocation, setSelectedLocation] = useState()
    const region = {
        latitude: 35.7470855,
        longitude: -5.871158,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    function selectLocationHandler(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng })
    }
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
          Alert.alert(
            'No location picked!',
            'You have to pick a location (by tapping on the map) first!'
          );
          return;
        }
        // navigation.setParams('AddPlace',{
        //     pickedLat: selectedLocation.lat,
        //     pickedLng: selectedLocation.lng,
        //   })


        // navigation.navigate('AddPlace',{
        //     pickedLat: selectedLocation.lat,
        //     pickedLng: selectedLocation.lng
        //   });
        navigation.navigate({
            name: 'AddPlace',
            params: {
                pickedLat: selectedLocation.lat,
                pickedLng: selectedLocation.lng
              },
            merge: true
          });

          
    console.log("Map route.params : " ,route.params);


      }, [navigation, selectedLocation]);
    
      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="save"
              size={24}
              color={tintColor}
              onPress={savePickedLocationHandler}
            />
          ),
        });
      }, [navigation, savePickedLocationHandler]);


    return (<MapView style={styles.map} initialRegion={region}
        onPress={selectLocationHandler}>
        {selectedLocation && (<Marker 
        title='Location'
        coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} /> 
        )}
    </MapView>);
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});