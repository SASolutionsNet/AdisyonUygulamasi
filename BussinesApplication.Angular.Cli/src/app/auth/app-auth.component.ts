import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/modules/auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.scss']
})
export class AppAuthComponent implements OnInit {
  user: any;
  loadedUserSub: any;

  environment: any;

  constructor(private router: Router, private authService: AuthService) {

    this.environment = environment;

    // IMPORTANT: 2021-03-21 for new tab opening
    this.loadedUserSub = this.authService.userLoadededEvent
      .subscribe(user => {
        this.user = user;

        if (user) {
          if (!environment.production) {
            console.log("AppAuthComponent.constructor authService.userLoadededEvent: user: ", user);
          }

          this.router.navigate(['/dashboard']);
        }
        else {
          if (!environment.production) {
            console.log("AppAuthComponent.constructor UserManager.signInSilent(): user: ", user);
          }
          this.authService.startSigninMainWindow();
        }
      });

    // IMPORTANT: 2021-03-21 for new tab opening
    this.authService.getUser();

    //if (this.authService.currentUser) {
    //  this.user = this.authService.currentUser;

    //  console.info("AppAuthComponent.constructor user is " + JSON.stringify(this.user));

    //  this.router.navigate(['/dashboard']);
    //}
    //else {
    //  this.authService.startSigninMainWindow();
    //}
  }

  ngOnInit() {

    console.log("AppAuthComponent.ngOnInit() this.environment ", this.environment);

    //this.loadedUserSub = this.authService.userLoadededEvent
    //  .subscribe(user => {
    //    this.user = user;
    //    console.info("AppAuthComponent.ngOnInit authService.userLoadededEvent user is " + JSON.stringify(this.user));
    //  });
  }

  ngOnDestroy() {
    if (this.loadedUserSub) {
      this.loadedUserSub.unsubscribe();
    }
  }
}
