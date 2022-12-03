import { Injectable } from '@angular/core';
import { Trip } from '../models/trip';
import { TRIPS } from '../mocks/mock-trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  public getTrips(): Trip[] {
    return TRIPS;
  }
}
