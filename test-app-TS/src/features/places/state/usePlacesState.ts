import { useReducer, useCallback } from 'react';
import { nanoid } from 'nanoid/non-secure';

import { Place, PlaceDraft } from '../types';

type PlacesState = {
  places: Place[];
  selectedPlaceId: string | null;
};

type Action =
  | { type: 'ADD_PLACE'; payload: { draft: PlaceDraft } }
  | { type: 'SELECT_PLACE'; payload: { id: string | null } };

const initialState: PlacesState = {
  places: [],
  selectedPlaceId: null,
};

function reducer(state: PlacesState, action: Action): PlacesState {
  switch (action.type) {
    case 'ADD_PLACE': {
      const { draft } = action.payload;
      if (!draft.location) {
        return state;
      }
      const newPlace: Place = {
        id: nanoid(),
        title: draft.title.trim(),
        imageUri: draft.imageUri,
        location: draft.location,
        createdAt: Date.now(),
      };
      return {
        ...state,
        places: [newPlace, ...state.places],
      };
    }
    case 'SELECT_PLACE':
      return { ...state, selectedPlaceId: action.payload.id };
    default:
      return state;
  }
}

export type PlacesController = {
  places: Place[];
  selectedPlaceId: string | null;
  selectedPlace: Place | null;
  addPlace: (draft: PlaceDraft) => void;
  selectPlace: (id: string | null) => void;
};

export function usePlacesState(): PlacesController {
  const [{ places, selectedPlaceId }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const addPlace = useCallback(
    (draft: PlaceDraft) => {
      dispatch({ type: 'ADD_PLACE', payload: { draft } });
    },
    [dispatch],
  );

  const selectPlace = useCallback(
    (id: string | null) => {
      dispatch({ type: 'SELECT_PLACE', payload: { id } });
    },
    [dispatch],
  );

  const selectedPlace =
    selectedPlaceId != null
      ? places.find((place) => place.id === selectedPlaceId) ?? null
      : null;

  return {
    places,
    selectedPlaceId,
    selectedPlace,
    addPlace,
    selectPlace,
  };
}

