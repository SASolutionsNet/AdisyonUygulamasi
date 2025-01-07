import { Component, NgZone, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28e48bf0
/*import * as moment from 'moment';*/
import 'moment/locale/tr';

/*import { environment } from '../../../environments/environment';*/

import { ErrorDialogComponent } from '../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../shared/modules/auth/auth.service';

import { WebApiTestEntity, WebApiTestService } from '../../shared/modules/common/web.api.test.service';

import { ValueFormatterService } from '../../shared/modules/common/value.formatter.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private router: Router,
    public menuItems: MenuItems,
    //public snackBar: MatSnackBar,
    zone: NgZone,
    private authService: AuthService,
    private valueFormatterService: ValueFormatterService,
    private webApiTestService: WebApiTestService,
    private dialog: MatDialog
  ) {
/*    this.environment = environment;*/

    //console.log("AdminLayoutComponent.constructor this.environment ", this.environment);

    //const browserLang: string = translate.getBrowserLang();
    //translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    //this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));

    //if (!this.authService.currentUser) {
    //  this.router.navigate(['/home']);
    //}
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  
  }

}
