import { Component, NgZone, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { TranslateService } from '@ngx-translate/core';
import * as PerfectScrollbar from 'perfect-scrollbar';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
import * as moment from 'moment';
import 'moment/locale/tr';

import { environment } from '../../../environments/environment';

import { ErrorDialogComponent } from '../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../shared/modules/auth/auth.service';

import { WebApiTestEntity, WebApiTestService } from '../../shared/modules/common/web.api.test.service';

import { InAppNotification, InAppNotificationService } from '../../shared/modules/notification/inappnotification.service';

import { ValueFormatterService } from '../../shared/modules/common/value.formatter.service';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  private _router: Subscription;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  _user: any;
  loadedUserSub: any;

  private tick: number;
  private timerSubscription: Subscription;

  today: number = Date.now();
  url: string;
  showSettings = false;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  currentLang = 'en';
  dir = 'ltr';
  sidePanelOpened;
  user;

  public environment: any = null;

  @ViewChild('sidemenu') sidemenu;
  @ViewChild('root') root;

  currentInAppNotificationCount: number = 0;
  inAppNotifications: InAppNotification[];
  inAppNotificationAudio: any = null;

  constructor(
    private router: Router,
    public menuItems: MenuItems,
    //public snackBar: MatSnackBar,
    public translate: TranslateService,
    zone: NgZone,
    private authService: AuthService,
    private valueFormatterService: ValueFormatterService,
    private inAppNotificationService: InAppNotificationService,
    private webApiTestService: WebApiTestService,
    private dialog: MatDialog
  ) {
    this.environment = environment;

    console.log("AdminLayoutComponent.constructor this.environment ", this.environment);

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));

    if (!this.authService.currentUser) {
      this.router.navigate(['/home']);
    }
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
      const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-drawer-content');

      if (this.mediaMatcher.matches && !this.isMac() && !this.compactSidebar) {
        PerfectScrollbar.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        PerfectScrollbar.initialize(elemContent, { wheelSpeed: 2, suppressScrollX: true });
      }

      this.url = this.router.url;

      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        document.querySelector('.app-inner .mat-drawer-content').scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      });

      try {
        this.inAppNotificationAudio = new Audio();
        this.inAppNotificationAudio.src = "assets/sounds/tiny-bell.mp3";
        this.inAppNotificationAudio.load();
      }
      catch (error) {

      }

      let timer = TimerObservable.create(2000, 60000);
      this.timerSubscription = timer.subscribe(t => {
        this.tick = t;
        this.getInAppNotificationsForMeLastNDays();
      });
    }

    this.loadedUserSub = this.authService.userLoadededEvent
      .subscribe(user => {
        this._user = user;
        console.info("AdminLayoutComponent.ngOnInit(): user:" + JSON.stringify(this._user));
      });
  }

  ngAfterViewInit(): void {
    this.runOnRouteChange();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.loadedUserSub) {
      this.loadedUserSub.unsubscribe();
    }

    if (this._router) {
      this._router.unsubscribe();
    }
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    if (this.mediaMatcher.matches && !this.isMac() && !this.compactSidebar) {
      const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-drawer-content');
      PerfectScrollbar.update(elemContent);
    }
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard') {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (this.mediaMatcher.matches && !this.isMac() && !this.compactSidebar) {
      const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
      setTimeout(() => { PerfectScrollbar.update(elemSidebar) }, 350);
    }
  }

  addMenuItem(): void {
    this.menuItems.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'timeline', name: 'MENU' }
      ]
    });
  }

  callTestService() {
    //console.log('callTestService().get(): expected result: 404');
    //this.webApiTestService.get(null)
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });

    //console.log('callTestService().get(400): expected result: 400');
    //this.webApiTestService.get('400')
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });

    console.log('callTestService().get(200): expected result: 200');
    this.webApiTestService.get('200')
      .subscribe(httpServiceResult => {
        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
      },
      (err) => {
        console.log('callTestService().err: ' + err);

        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
      });

    //console.log('callTestService().get(204): expected result: 204');
    //this.webApiTestService.get('204')
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });

    //console.log('callTestService().get(401): expected result: 401');
    //this.webApiTestService.get('401')
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });

    //console.log('callTestService().get(403): expected result: 403');
    //this.webApiTestService.get('403')
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });

    //console.log('callTestService().create(200): expected result: 200');
    //let webApiTestEntity: WebApiTestEntity = new WebApiTestEntity();
    //webApiTestEntity.id = "0";
    //webApiTestEntity.description = "create";
    //this.webApiTestService.create('200', webApiTestEntity)
    //    .subscribe(httpServiceResult => {
    //        console.log('callTestService().httpServiceResult: ' + httpServiceResult);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('OK', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }, (err) => {
    //        console.log('callTestService().err: ' + err);

    //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
    //    });
  }

  clearState() {
    this.authService.clearState();
  }
  getUser() {
    this.authService.getUser();
  }
  removeUser() {
    this.authService.removeUser();
  }
  startSigninMainWindow() {
    this.authService.startSigninMainWindow();
  }
  endSigninMainWindow() {
    this.authService.endSigninMainWindow();
  }
  startSignoutMainWindow() {
    this.authService.startSignoutMainWindow();
  }
  endSignoutMainWindow() {
    this.authService.endSigninMainWindow();
  }

  isUserAllowed(moduleName: string, virtualPath: string) {
    if (this.authService) {
      return this.authService.isUserAllowed(moduleName, virtualPath);
    }
    else {
      return false;
    }
  }

  getVirtualPath(moduleName: string, virtualPath: string): any[] {
    var path = [];
    path.push('/');
    path.push(moduleName);
    var virtualPathSplit = virtualPath.split('/');
    if (virtualPathSplit.length == 0) {
    }
    else {
      for (var i = 0; i < virtualPathSplit.length; ++i) {
        path.push(virtualPathSplit[i]);
      }
    }
    return path;
  }

  getInAppNotificationsForMeLastNDays() {
    this.inAppNotificationService.getByToUserIdAndStateIdAndLastNDays("created", 15)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: InAppNotification[] = httpServiceResult.result.data;

          this.inAppNotifications = [];

          for (var i = data.length - 1; i >= 0; --i) {
            this.inAppNotifications.push(data[i]);
          }

          if (this.inAppNotifications.length != this.currentInAppNotificationCount) {
            this.currentInAppNotificationCount = this.inAppNotifications.length;

            //let matSnackBarConfig = new MatSnackBarConfig();
            //matSnackBarConfig.duration = 5000;

            //this.snackBar.open("Bildirimler var!", "", matSnackBarConfig);

            // play sound
            try {
              //var audio = new Audio();
              //audio.src = "assets/sounds/tiny-bell.mp3";
              //audio.load();
              if (this.inAppNotificationAudio != null) {
                this.inAppNotificationAudio.play();
              }
            }
            catch (error) {

            }
          }
        }
        else {
          console.log('getInAppNotificationsForMeLastNDays(): ' + httpServiceResult);
        }
      },
      (err) => {
        console.log('getInAppNotificationsForMeLastNDays().err: ' + err);
      });
  }

  updateInAppNotification(inAppNotification: InAppNotification) {
    this.inAppNotificationService.update(inAppNotification)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          console.log('updateInAppNotification(): ' + httpServiceResult);
        }
        else {
          console.log('updateInAppNotification(): ' + httpServiceResult);
        }
      },
      (err) => {
        console.log('updateInAppNotification().err: ' + err);
      });
  }

  inAppNotificationToggle(inAppNotification: InAppNotification) {
    if (inAppNotification.stateId == 'read') {
      inAppNotification.stateId = 'created';
    }
    else {
      inAppNotification.stateId = 'read';
    }
    this.inAppNotifications = this.inAppNotifications.filter(f => f !== inAppNotification);

    this.updateInAppNotification(inAppNotification);

    console.log('inAppNotification stateId = ' + inAppNotification.stateId);
  }

  isInAppNotificationChecked(inAppNotification: InAppNotification) {
    //console.log('isInAppNotificationChecked = ' + inAppNotification.stateId);
    if (inAppNotification.stateId == 'read') {
      return true;
    }
    else {
      return false;
    }
  }

  inAppNotificationClicked(inAppNotification: InAppNotification) {
    if (inAppNotification.url != null) {
      let relativeUrl = inAppNotification.url.replace(environment.urls.webappng4, "");
      this.router.navigate([relativeUrl]);
    }
  }
}
