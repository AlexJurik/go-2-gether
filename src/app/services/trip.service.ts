import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TRIPS } from '../mocks/mock-trips';
import { MatchingService } from './matching.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public trips: Trip[] = TRIPS;
  public idCounter: number = 4;

  constructor(
    private matchingService: MatchingService,
    private userService: UserService
  ) {
  }

  public getUserTrips(userId: number): Trip[] {
    return [...this.trips].filter((trip) => trip.userId === userId);
  }

  public getTripsByUserType(userType: string): Trip[] {
    return [...this.trips].filter(
      (trip) => this.userService.getUser(trip.userId)?.type === userType
    );
  }

  public addTrip(trip: Trip): void {
    this.checkMatchings(trip);
    this.trips.push(trip);
    this.idCounter++;
  }

  public editTrip(tripId: number, trip: Trip): void {
    let editedTripIdx = this.trips.findIndex((t) => t.id === tripId);
    this.trips[editedTripIdx] = trip;
    this.checkMatchings(trip);
  }

  private checkMatchings(trip: Trip) {
    const userType = this.userService.getUser(trip.userId)?.type;
    if (userType === 'passenger') {
      const tripsByUserType = this.getTripsByUserType('driver');
      this.matchingService.findMatchedTripsPassenger(trip, tripsByUserType);
    }

    if (userType === 'driver') {
      const tripsByUserType = this.getTripsByUserType('passenger');
      this.matchingService.findMatchedTripsDriver(trip, tripsByUserType);
    }
  }
}
