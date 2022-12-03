import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TRIPS } from '../mocks/mock-trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public trips: Trip[] = TRIPS;
  public idCounter: number = 4;

  public getUserTrips(userId: number): Trip[] {
    return [...this.trips].filter((trip) => trip.userId === userId);
  }

  public addTrip(trip: Trip): void {
    this.trips.push(trip);
    this.idCounter++;
  }
}
