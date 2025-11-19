export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PlaceLocation = Coordinates & {
  address?: string;
};

export type Place = {
  id: string;
  title: string;
  imageUri?: string;
  location: PlaceLocation;
  createdAt: number;
};

export type PlaceDraft = {
  title: string;
  imageUri?: string;
  location: PlaceLocation | null;
};

