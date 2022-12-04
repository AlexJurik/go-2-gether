import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Trip } from 'src/app/models/trip';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPage implements OnInit {
  public loggedUser?: User;
  public favorites?: Trip[];

  constructor(private readonly userService: UserService, private tripService: TripService) {
  }

  public ngOnInit(): void {
    this.loggedUser = this.userService.loggedUser;
 
  }

  public appPages = [
    {title: 'Dashboard', url: '/app/dashboard', icon: 'apps'},
    {title: 'Analytics', url: '/app/analytics', icon: 'analytics'},
    {title: 'Bonuses', url: '/app/bonuses', icon: 'ribbon'},
    {title: 'Settings', url: '/app/settings', icon: 'settings'}
  ];

}
