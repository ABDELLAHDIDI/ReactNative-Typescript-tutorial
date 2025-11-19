import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { ImagePickerField } from './ImagePickerField';
import { LocationPicker } from './LocationPicker';
import { PlaceDraft, PlaceLocation } from '../types';

type Props = {
  onSubmit: (draft: PlaceDraft) => void;
};

const createInitialDraft = (): PlaceDraft => ({
  title: '',
  imageUri: undefined,
  location: null,
});

export function PlaceForm({ onSubmit }: Props) {
  const [draft, setDraft] = useState<PlaceDraft>(createInitialDraft);

  const updateField = (field: keyof PlaceDraft, value: string | null) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value ?? undefined,
    }));
  };

  const handleLocationChange = (location: PlaceLocation) => {
    setDraft((prev) => ({ ...prev, location }));
  };

  const handleSubmit = () => {
    if (!draft.title.trim() || !draft.location) {
      return;
    }
    onSubmit(draft);
    setDraft(createInitialDraft());
  };

  const canSave = Boolean(draft.title.trim() && draft.location);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Add a favorite place</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={draft.title}
          onChangeText={(text) => updateField('title', text)}
        />
        <ImagePickerField
          imageUri={draft.imageUri}
          onPick={(uri) => updateField('imageUri', uri)}
        />
        <LocationPicker value={draft.location} onChange={handleLocationChange} />
        <Pressable
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonText}>Save place</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#b3b3b3',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

