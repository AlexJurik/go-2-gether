import { Trip } from '../models/trip';

export const TRIPS: Trip[] = [
  {
    id: 1,
    userId: 1,
    name: 'To work',
    radius: 1000,
    point: {start: [21.247723, 48.588609], end: [21.209788, 48.667655]},
    timeWindow: {start: '8:00', end: '9:00'}
  },
  {
    id: 2,
    userId: 2,
    name: 'Meeting with John',
    radius: 1000,
    point: {start: [21.290566, 48.721385], end: [21.279625, 48.690074]},
    timeWindow: {start: '10:00', end: '11:00'}
  },
  {
    id: 3,
    userId: 3,
    name: 'Rande',
    radius: 1000,
    point: {start: [21.239036, 48.726395], end: [21.247937, 48.582728]},
    timeWindow: {start: '11:00', end: '12:00'}
  }
];
