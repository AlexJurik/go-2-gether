import { Trip } from '../models/trip';

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId: 1,
    name: 'To work',
    radius: 1000,
    point: {
      start: [
        21.2183436, 48.7169856], end: [21.2613315, 48.6996548]
    },
    timeWindow: {start: '8:00', end: '9:00'}
  }
];
