import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../../services/trip.service';
import { Trip } from '../../../../models/trip';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPage implements OnInit {
  public trips: Trip[] = [];

  constructor(private readonly tripService: TripService) {
  }

  public ngOnInit(): void {
    this.trips = this.tripService.getTrips()
  }
}
