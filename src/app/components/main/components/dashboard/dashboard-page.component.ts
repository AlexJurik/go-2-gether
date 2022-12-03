import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from '../../../../services/trip.service';
import { Trip } from '../../../../models/trip';
import { UserService } from '../../../../services/user.service';
import { IonModal } from '@ionic/angular';
import { Address, Feature, MapboxService } from '../../../../services/mapbox.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonModal) public modal?: IonModal;
  public trips: Trip[] = [];
  public tripName?: string;
  public startXPoint?: number;
  public startYPoint?: number;
  public endXPoint?: number;
  public endYPoint?: number;
  public startTime?: string;
  public endTime?: string;
  public startSuggestions?: Address;
  public endSuggestions?: Address;
  public startAddress?: Feature;
  public endAddress?: Feature;

  constructor(
    private readonly mapboxService: MapboxService,
    private readonly tripService: TripService,
    private readonly userService: UserService
  ) {
  }

  public ngOnInit(): void {
    if (this.userService.loggedUser) {
      this.trips = this.tripService.getUserTrips(this.userService.loggedUser.id);
    }
  }

  public cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  public confirm() {
    this.modal?.dismiss(null, 'cancel');
    this.tripService.addTrip({
      id: this.tripService.idCounter,
      userId: this.userService.loggedUser!.id,
      name: this.tripName!,
      timeWindow: {
        start: '9:00',
        end: '10:00'
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
      this.startSuggestions = response;
    } else {
      this.endSuggestions = response;
    }
  }

  public selectStartPoint(feature: Feature) {
    this.startSuggestions = undefined;
    this.startAddress = feature;
  }

  public selectEndPoint(feature: Feature) {
    this.endSuggestions = undefined;
    this.endAddress = feature;
  }
}
