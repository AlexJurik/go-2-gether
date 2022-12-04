import { Trip } from '../models/trip';
import { DateTime } from 'luxon';

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId: 1,
    name: 'To work',
    radius: 1000,
    point: {
      start: {
        center: [21.2183436, 48.7169856],
        place_name: 'Wupertalska',
        id: '1'
      }, end: {center: [21.2613315, 48.6996548], place_name: 'Juzna trieda', id: '2'}
    },
    timeWindow: {start: DateTime.now().set({'hour': 8, 'minute': 0}), end: DateTime.now().set({'hour': 9, 'minute': 0})}
  },
  {
    id: 2,
    userId: 2,
    name: 'test',
    radius: 1000,
    point: {
      start: {
        center: [21.2613315, 48.6996548],
        place_name: 'Juzna trieda',
        id: '1'
      }, end: {center: [
        21.2183436, 48.7169856], place_name: 'Wupertalska', id: '2'}
    },
    timeWindow: {start: DateTime.now().set({'hour': 8, 'minute': 0}), end: DateTime.now().set({'hour': 9, 'minute': 0})}
  }
];
