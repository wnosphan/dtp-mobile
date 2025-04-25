export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  highlights: string[];
  images: string[];
  startLocation: string;
  locations: Location[];
  maxGroupSize: number;
  difficulty: string;
  guides: Guide[];
  reviews: Review[];
}

export interface Location {
  type: string;
  coordinates: [number, number];
  description: string;
  day: number;
}

export interface Guide {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface Review {
  id: string;
  review: string;
  rating: number;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  tour: string;
  createdAt: string;
} 