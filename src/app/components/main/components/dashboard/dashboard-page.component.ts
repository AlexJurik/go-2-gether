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
  public startPoint?: string;
  public endPoint?: string;
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
      id: 10,
      userId: this.userService.loggedUser!.id,
      name: this.tripName!,
      timeWindow: {
        start: this.startTime!,
        end: this.endTime!
      },
      point: {
        start: [1, 1],
        end: [2, 2]
      }
    });
    this.trips = this.tripService.getUserTrips(this.userService.loggedUser!.id);
  }

}
