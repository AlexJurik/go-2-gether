import { DateTime } from 'luxon';
import { AddressFeature } from '../services/mapbox.service';

export interface Trip {
  id: number;
  userId: number;
  name: string;
  radius: number;
  point: { start: AddressFeature, end: AddressFeature };
  timeWindow: { start: DateTime, end: DateTime };
}

