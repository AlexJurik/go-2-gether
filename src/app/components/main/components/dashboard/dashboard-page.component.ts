import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from '../../../../services/trip.service';
import { Trip } from '../../../../models/trip';
import { UserService } from '../../../../services/user.service';
import { IonModal } from '@ionic/angular';
import { AddressFeature, MapboxService } from '../../../../services/mapbox.service';
import { lastValueFrom } from 'rxjs';
import { MatchingService } from '../../../../services/matching.service';
import { DateTime } from 'luxon';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonModal) public modal?: IonModal;
  public trips: Trip[] = [];
  public tripName?: string;
  public startTime?: string = DateTime.now().toISO();
  public endTime?: string = DateTime.now().plus({'hour': 1}).toISO();
  public startSuggestions?: AddressFeature[];
  public endSuggestions?: AddressFeature[];
  public startAddress?: AddressFeature;
  public endAddress?: AddressFeature;
  public radius?: number = 2000;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly tripService: TripService,
    private readonly userService: UserService,
    private readonly matchingService: MatchingService
  ) {
  }

  public ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.trips = this.tripService.getUserTrips(this.userService.loggedUser.id);
    }
  }

  public getMatchedTrips(tripId: number) {
    return this.matchingService.matchedTripsMap.get(tripId);
  }

  public getUser(userId: number): User {
    return this.userService.getUser(userId)!;
  }

  public cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  public async confirm() {
    this.modal?.dismiss(null, 'cancel');
    this.tripService.addTrip({
      id: this.tripService.idCounter,
      userId: this.userService.loggedUser!.id,
      name: this.tripName!,
      radius: this.radius!,
      timeWindow: {
        start: DateTime.fromISO(this.startTime!),
        end: DateTime.fromISO(this.endTime!)
      },
      point: {
        start: this.startAddress?.center!,
        end: this.endAddress?.center!
      }
    });

    this.trips = this.tripService.getUserTrips(this.userService.loggedUser!.id);
  }

  public async searchAddress(event: Event, type: 'start' | 'end') {
    // Call API
    const query = (event.target as any)?.value?.toLowerCase();

    const response = await lastValueFrom(this.mapboxService.search(query));
    if (type === 'start') {
      this.startSuggestions = response.features;
    } else {
      this.endSuggestions = response.features;
    }
  }

  public async selectStartPoint(feature: AddressFeature) {
    this.startSuggestions = undefined;
    this.startAddress = feature;
  }

  public selectEndPoint(feature: AddressFeature) {
    this.endSuggestions = undefined;
    this.endAddress = feature;
  }
}
