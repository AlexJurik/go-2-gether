import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPage {
  public appPages = [
    {title: 'Dashboard', url: '/dashboard', icon: ''}
  ];
}
