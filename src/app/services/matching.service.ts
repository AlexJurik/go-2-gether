import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';


@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  constructor() { }


  findMatch(tripToMatch: Trip): Trip {
    const trip: Trip = { id: 3, userId: 3, point: { start: [21.09101, 48.60298], end: [21.288882, 48.723137] }, timeWindow: { start: "date", end: "date" } }
    return trip;
  }
}
