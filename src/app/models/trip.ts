import { DateTime } from 'luxon';
import { AddressFeature } from './address';

export interface Trip {
  id: number;
  userId: number;
  name: string;
  radius: number;
  point: { start: AddressFeature, end: AddressFeature };
  timeWindow: { start: DateTime, end: DateTime };
}

