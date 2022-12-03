import { Component, OnInit, ViewChild } from '@angular/core';
import { TripService } from '../../../../services/trip.service';
import { Trip } from '../../../../models/trip';
import { UserService } from '../../../../services/user.service';
import { IonModal } from '@ionic/angular';

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

  constructor(
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
        start: this.startTime!,
        end: this.endTime!
      },
      point: {
        start: [this.startXPoint!, this.startYPoint!],
        end: [this.endXPoint!, this.endYPoint!]
      }
    });
    this.trips = this.tripService.getUserTrips(this.userService.loggedUser!.id);
  }

}
