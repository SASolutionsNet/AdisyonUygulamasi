import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from '@angular/router';

/*import { environment } from '../../../../environments/environment';*/

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    //if (!environment.production) {
    //  console.log("AuthGuardService.constructor()");
    //}

    // IMPORTANT: 2021-03-21 for new tab opening
    //this.authService.signInSilent();
    //this.authService.getUser();
  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        throw new Error('Method not implemented.');
    }

  //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //  //if (!environment.production) {
  //  //  console.log("AuthGuardService.canActivate()");
  //  //}

  //  // IMPORTANT: 2021-03-21 for new tab opening
  //  //this.authService.signInSilent();

  //  //if (!environment.production) {
  //  //  console.log("AuthGuardService.canActivate() authService.isLoggedIn() called");
  //  //}
  //  return this.authService.isLoggedIn().map((loggedin) => {
  ////    if (!loggedin) {
  ////      if (!environment.production) {
  ////        console.log("AuthGuardService.canActivate() authService.isLoggedIn() false, navigate to /home");
  ////      }

  ////      this.router.navigate(['/home']);

  ////      return false;
  ////    }
  ////    else {
  ////      //console.log('ActivatedRouteSnapshot.component = ' + route.component);
  ////      //console.log('ActivatedRouteSnapshot.fragment = ' + route.fragment);
  ////      //console.log('ActivatedRouteSnapshot.outlet = ' + route.outlet);
  ////      //console.log('ActivatedRouteSnapshot.parent = ' + route.parent);
  ////      //console.log('ActivatedRouteSnapshot.pathFromRoot = ' + route.pathFromRoot);
  ////      //console.log('ActivatedRouteSnapshot.url = ' + route.url);

  ////      //console.log('RouterStateSnapshot.root = ' + state.root);
  ////      //console.log('RouterStateSnapshot.url = ' + state.url);

  ////      if (!environment.production) {
  ////        console.log("AuthGuardService.canActivate() authService.isLoggedIn() true");
  ////      }

  ////      // https://stackoverflow.com/questions/42719445/pass-parameter-into-route-guard
  ////      let roles: string[] = route.data["roles"] as Array<string>;

  ////      return this.authService.isUserAllowedForRoute(roles);
  ////    }
  //  });
  //}
}
