import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { MapboxService } from './mapbox.service';
import { TripService } from './trip.service';


@Injectable({
  providedIn: 'root',
})
export class MatchingService {

  constructor(private mapBoxService: MapboxService){}
  public matchedTripsMap: Map<number, Trip[]> = new Map<number, Trip[]>();

  public async findMatchedTripsPassanger(tripToMatch: Trip, trips: Trip[]) {
    const matchedTrips: Trip[] = [];
    for (let trip of trips) {
      const polygonStart = await lastValueFrom(this.mapBoxService.getIsochrone(trip.point.start, 1000));
      console.log(tripToMatch.point.start);
      console.log(polygonStart.features[0].geometry.coordinates);
      let checkStartPoint = this.inside(tripToMatch.point.start, polygonStart.features[0].geometry.coordinates);
      console.log(checkStartPoint);
      if (checkStartPoint) {
        matchedTrips.push(trip);
        this.matchedTripsMap.get(trip.id)?.push(tripToMatch);
      }
    }
    this.matchedTripsMap.set(tripToMatch.id, matchedTrips);
  }
  

  // public findMatchedTripsDriver(tripToMatch: Trip, trips: Trip[]) {
  //   const matchedTrips: Trip[] = [];
  //   for (let trip of trips) {
  //     let checkDestination = this.checkDestination(tripToMatch, trip);
  //     if (checkDestination) {
  //       matchedTrips.push(trip);
  //       this.matchedTripsMap.get(trip.id)?.push(tripToMatch);
  //     }
  //   }
  //   this.matchedTripsMap.set(tripToMatch.id, matchedTrips);
  // }

  public getPolygonForTrip(trip: Object){
    return [[1,1],[2,2],[3,3],[4,4]]
  }

 
  // public checkPointInPolygon(point: any[], polygon: any[][]) {
  //   //longitude = 1
  //   //lattitde = 0
  //     let minX = polygon[0][0];
  //     let maxX = polygon[0][0];
  //     let minY = polygon[0][1];
  //     let maxY = polygon[0][1];
  //     for (let i = 0; i < polygon.length; i++)
      
  //     {
  //         const q = polygon[i];
  //         minX = Math.min(q[0], minX);
  //         maxX = Math.max(q[0], maxX);
  //         minY = Math.min(q[1], minY);
  //         maxY = Math.max(q[1], maxY);
  //     }
    
  //     if (point[0] < minX || point[0] > maxX || point[1] < minY || point[1] > maxY)
  //     {
  //         return false;
  //     }
  //     let inside = false;
  //     for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++)
  //     {
  //         if ((polygon[i][1] > point[1]) != (polygon[j][1] > point[1]) &&
  //              point[0] < (polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])
  //         {
  //             inside = !inside;
  //         }
  //     }
  //     return inside;
  // }

  public inside([x, y]: [number, number], vs: any[][]) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];
        
        const intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};
  
}
