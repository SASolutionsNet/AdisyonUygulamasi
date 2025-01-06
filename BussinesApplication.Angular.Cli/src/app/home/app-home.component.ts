import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/modules/auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {
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
            console.log("AppHomeComponent.constructor authService.userLoadededEvent: user: ", user);
          }

          this.router.navigate(['/dashboard']);
        }
        else {
          if (!environment.production) {
            console.log("AppHomeComponent.constructor UserManager.signInSilent(): user: ", user);
          }
          //this.authService.signInSilent();
        }
      });

    // IMPORTANT: 2021-03-21 for new tab opening
    this.authService.getUser();


    //if (this.authService.currentUser) {
    //  this.user = this.authService.currentUser;

    //  console.info("AppHomeComponent.constructor user is " + JSON.stringify(this.user));

    //  this.router.navigate(['/dashboard']);
    //}
    //else {
    //  //this.authService.startSigninMainWindow();

    //  // IMPORTANT: 2021-03-21 for new tab opening
    //  this.authService.signInSilent();
    //}
  }

  ngOnInit() {

    console.log("AppHomeComponent.ngOnInit() this.environment ", this.environment);

    // IMPORTANT: 2021-03-21 for new tab opening
    //this.authService.signInSilent();


  }

  ngOnDestroy() {
    if (this.loadedUserSub) {
      this.loadedUserSub.unsubscribe();
    }
  }

  onSignInClick() {
    this.router.navigate(['/auth']);
    //this.router.navigate(['/inventory/item/detail/eb969f13-e05c-4bf4-9c0b-0754cf8c49ab']);
  }

  onSignUpClick() {
    window.location.href = environment.urls.identityserver + '/account/signup';
  }
}
