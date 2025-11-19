import { memo, ReactElement } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Place } from '../types';

type Props = {
  places: Place[];
  onSelect: (id: string) => void;
  header?: ReactElement | null;
};

export const PlaceList = memo(function PlaceList({
  places,
  onSelect,
  header,
}: Props) {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={header ?? null}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No places yet</Text>
          <Text style={styles.emptySubtitle}>
            Add a place above to start building your list.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => onSelect(item.id)}
        >
          {item.imageUri ? (
            <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <Text style={styles.thumbnailText}>No photo</Text>
            </View>
          )}
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>
              {item.location.latitude.toFixed(4)},{' '}
              {item.location.longitude.toFixed(4)}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
});

const styles = StyleSheet.create({
  listContent: {
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardPressed: {
    opacity: 0.8,
  },
  thumbnail: {
    width: 96,
    height: 96,
  },
  thumbnailPlaceholder: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  thumbnailText: {
    color: '#888',
    fontSize: 12,
  },
  cardBody: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#555',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: '#666',
    textAlign: 'center',
  },
});

