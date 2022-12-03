import { Trip } from '../models/trip';
import { DateTime } from 'luxon';

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
    timeWindow: {start: DateTime.now().set({'hour': 8, 'minute': 0}), end: DateTime.now().set({'hour': 9, 'minute': 0})}
  }
];
