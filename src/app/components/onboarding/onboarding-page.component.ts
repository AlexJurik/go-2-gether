import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss']
})
export class OnboardingPage {

  constructor(private userService: UserService, private router: Router){}
  email: string="";
  password: string="";


  login(){
   const logged = this.userService.login(this.email,this.password);
    if(logged){
      this.router.navigateByUrl("/app");
    }
  }
}
