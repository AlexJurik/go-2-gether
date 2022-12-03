import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPage implements OnInit {
  public loggedUser?: User;

  constructor(private readonly userService: UserService) {
  }

  public ngOnInit(): void {
    this.loggedUser = this.userService.loggedUser;
  }

  public appPages = [
    {title: 'Dashboard', url: '/app/dashboard', icon: 'apps'}
  ];
}
