import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { MapboxService } from './mapbox.service';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  constructor(private mapBoxService: MapboxService) {
  }

  public matchedTripsMap: Map<number, Trip[]> = new Map<number, Trip[]>();

  public async findMatchedTripsPassenger(tripToMatch: Trip, trips: Trip[]) {
    const matchedTrips: Trip[] = [];
    for (let trip of trips) {
      const polygonStart = await lastValueFrom(
        this.mapBoxService.getIsochrone(trip.point.start, trip.radius)
      );
      let checkStartPoint = this.inside(
        tripToMatch.point.start,
        polygonStart.features[0].geometry.coordinates[0]
      );
      const polygonEnd = await lastValueFrom(
        this.mapBoxService.getIsochrone(trip.point.end, trip.radius)
      );
      let checkEndPoint = this.inside(
        tripToMatch.point.end,
        polygonEnd.features[0].geometry.coordinates[0]
      );
      if (checkStartPoint && checkEndPoint) {
        matchedTrips.push(trip);
        this.matchedTripsMap.get(trip.id)?.push(tripToMatch);
      }
    }
    this.matchedTripsMap.set(tripToMatch.id, matchedTrips);
  }

  public async findMatchedTripsDriver(tripToMatch: Trip, trips: Trip[]) {
    const matchedTrips: Trip[] = [];
    for (let trip of trips) {
      const polygonStart = await lastValueFrom(
        this.mapBoxService.getIsochrone(
          tripToMatch.point.start,
          tripToMatch.radius
        )
      );
      let checkStartPoint = this.inside(
        trip.point.start,
        polygonStart.features[0].geometry.coordinates[0]
      );
      const polygonEnd = await lastValueFrom(
        this.mapBoxService.getIsochrone(
          tripToMatch.point.end,
          tripToMatch.radius
        )
      );
      let checkEndPoint = this.inside(
        trip.point.end,
        polygonEnd.features[0].geometry.coordinates[0]
      );
      if (checkStartPoint && checkEndPoint) {
        matchedTrips.push(trip);
        this.matchedTripsMap.get(trip.id)?.push(tripToMatch);
      }
    }
    this.matchedTripsMap.set(tripToMatch.id, matchedTrips);
  }

  public inside([x, y]: [number, number], vs: number[][]) {
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      const xi = vs[i][0],
        yi = vs[i][1];
      const xj = vs[j][0],
        yj = vs[j][1];

      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }
}
