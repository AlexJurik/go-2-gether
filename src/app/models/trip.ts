export interface Trip {
  id: number;
  userId: number;
  name: string;
  point: { start: [number, number], end: [number, number] };
  timeWindow: { start: string, end: string };
}

