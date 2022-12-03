import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TRIPS } from '../mocks/mock-trips';
import { MatchingService } from './matching.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(
    private matchingService: MatchingService,
    private userService: UserService
  ) {
  }

  public trips: Trip[] = TRIPS;
  public idCounter: number = 4;

  public getUserTrips(userId: number): Trip[] {
    return [...this.trips].filter((trip) => trip.userId === userId);
  }

  public getTripsByUserType(userType: string): Trip[] {
    return [...this.trips].filter(
      (trip) => this.userService.checkUserType(trip.userId) === userType
    );
  }

  public addTrip(trip: Trip): void {
    const userType = this.userService.checkUserType(trip.userId);
    if (userType === 'passenger') {
      const tripsByUserType = this.getTripsByUserType('driver');
      this.matchingService.findMatchedTripsPassenger(trip, tripsByUserType);
    }

    if (userType === 'driver') {
      const tripsByUserType = this.getTripsByUserType('passenger');
      this.matchingService.findMatchedTripsDriver(trip, tripsByUserType);
    }
    console.log(this.matchingService.matchedTripsMap);
    this.trips.push(trip);
    this.idCounter++;
  }
}
