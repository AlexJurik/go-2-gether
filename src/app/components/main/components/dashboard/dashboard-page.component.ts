import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from '../../../../services/trip.service';
import { AddressFeature, Trip, User } from '../../../../models';
import { UserService } from '../../../../services/user.service';
import { IonModal } from '@ionic/angular';
import { MapboxService } from '../../../../services/mapbox.service';
import { lastValueFrom } from 'rxjs';
import { MatchingService } from '../../../../services/matching.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonModal) public modal?: IonModal;
  public trips: Trip[] = [];
  public tripName?: string = 'Lunch';
  public startTime: string = DateTime.now().set({'hour': 12, 'minute': 0}).toISO();
  public endTime: string = DateTime.now().set({'hour': 12, 'minute': 20}).toISO();
  public startSuggestions?: AddressFeature[];
  public endSuggestions?: AddressFeature[];
  public startAddress?: AddressFeature;
  public endAddress?: AddressFeature;
  public radius?: number = 2000;
  public isModalOpened: boolean = false;
  public tripForEdit?: Trip;
  public suggestedTrips?: Trip[] = [];

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly tripService: TripService,
    private readonly userService: UserService,
    private readonly matchingService: MatchingService
  ) {
  }

  public ngOnInit(): void {
    this.loadUserTrips();
  }

  public getMatchedTrips(tripId: number) {
    return this.matchingService.matchedTripsMap.get(tripId);
  }

  public getUser(userId: number): User {
    return this.userService.getUser(userId)!;
  }

  public editTrip(trip: Trip): void {
    this.tripForEdit = trip;
    this.tripName = trip.name;
    this.startAddress = trip.point.start;
    this.endAddress = trip.point.end;
    this.radius = trip.radius;
    this.startTime = trip.timeWindow.start.toISO();
    this.endTime = trip.timeWindow.end.toISO();
    this.isModalOpened = true;
  }

  public cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  public openCreateModal(): void {
    this.isModalOpened = true;
  }

  public reset(): void {
    this.tripName = 'Lunch';
    this.startAddress = undefined;
    this.endAddress = undefined;
    this.radius = 2000;
    this.startTime = DateTime.now().set({'hour': 12, 'minute': 0}).toISO();
    this.endTime = DateTime.now().set({'hour': 12, 'minute': 20}).toISO();
    this.tripForEdit = undefined;
  }

  public async confirm() {
    this.modal?.dismiss(null, 'cancel');
    if (this.tripForEdit) {
      this.tripService.editTrip(this.tripForEdit.id, {
        id: this.tripForEdit.id,
        userId: this.userService.loggedUser!.id,
        name: this.tripName!,
        radius: this.radius!,
        timeWindow: {
          start: DateTime.fromISO(this.startTime!),
          end: DateTime.fromISO(this.endTime!)
        },
        point: {
          start: this.startAddress!,
          end: this.endAddress!
        }
      });
      this.tripForEdit = undefined;
      this.loadUserTrips();
    } else {
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
          start: this.startAddress!,
          end: this.endAddress!
        }
      });
    }

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

  public loadUserTrips(event?: Event): void {
    if (this.userService.loggedUser) {
      this.trips = this.tripService.getUserTrips(
        this.userService.loggedUser.id
      );

      this.tripService.checkMatchings(this.trips[0]);

    }

    if (this.userService.loggedUser?.favorite) {
      this.checkForSuggestions();
    }


    if (event) {
      setTimeout(() => {
        (event.target as any).complete();
      }, 1000);
    }
  }

  public checkForSuggestions() {
    const userType =
      this.userService.loggedUser?.type == 'driver' ? 'passenger' : 'driver';
    const trips = this.tripService.getTripsByUserType(userType);
    this.suggestedTrips = this.tripService.findFavoriteTrips(
      this.userService.loggedUser!,
      trips
    );
  }
}
