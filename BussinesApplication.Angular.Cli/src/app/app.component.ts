import { Component, OnInit } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';

//import { environment } from '../environments/environment';

//import { AuthService } from './shared/modules/auth/auth.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet><ngx-spinner></ngx-spinner></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor() {
  //constructor(private authService: AuthService, translate: TranslateService) {

    //if (!environment.production) {
    //  console.log("AppComponent.constructor environment: ", environment);
    //}

    //translate.addLangs(['en', 'fr']);
    //translate.setDefaultLang('en');

    //const browserLang: string = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    //if (!environment.production) {
    //  console.log("AppComponent.constructor authService.signInSilent() called");
    //}
    //this.authService.signInSilent();
  }

  ngOnInit() {
    //if (!environment.production) {
    //  console.log("AppComponent.ngOnInit()");
    //}
  }
}
