import { DateTime } from 'luxon';

export interface Trip {
  id: number;
  userId: number;
  name: string;
  radius: number;
  point: { start: [number, number], end: [number, number] };
  timeWindow: { start: DateTime, end: DateTime };
}

