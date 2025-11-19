import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

type Props = {
  imageUri?: string;
  onPick: (uri: string) => void;
};

export function ImagePickerField({ imageUri, onPick }: Props) {
  const [isRequesting, setIsRequesting] = useState(false);

  const ensurePermission = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === ImagePicker.PermissionStatus.GRANTED;
  }, []);

  const handlePick = useCallback(async () => {
    setIsRequesting(true);
    try {
      const hasPermission = await ensurePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission needed',
          'Please allow photo library access to pick an image.',
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.canceled && result.assets.length > 0) {
        onPick(result.assets[0].uri);
      }
    } finally {
      setIsRequesting(false);
    }
  }, [ensurePermission, onPick]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Image</Text>
      <Pressable
        style={({ pressed }) => [
          styles.preview,
          pressed && styles.previewPressed,
        ]}
        onPress={handlePick}
      >
        {isRequesting ? (
          <ActivityIndicator />
        ) : imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Tap to choose photo</Text>
        )}
      </Pressable>
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
  previewPressed: {
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    color: '#888',
  },
});

