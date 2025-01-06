import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatButtonModule } from '@angular/material/button';

import { TagInputModule } from 'ngx-chips';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';

import { PriceFormatterDirectiveTr } from './formatters/price-formatter-tr.directive';
import { PricePipeTr } from './formatters/price-tr.pipe';

import { TurkishStringService } from './string/turkish.string.service';

import { ErrorDialogComponent } from './modules/errordialog/errordialog.component';
import { DialogYesNoComponent } from './modules/dialogyesno/dialogyesno.component';

//import { AuthService } from './modules/auth/auth.service';
//import { AuthGuardService } from './modules/auth/auth-guard.service';

import { ValueFormatterService } from './modules/common/value.formatter.service';

import { WebApiTestService } from './modules/common/web.api.test.service';
import { HttpService } from './modules/common/httpService';



@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TagInputModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,

    PriceFormatterDirectiveTr,
    PricePipeTr,

    ErrorDialogComponent,
    DialogYesNoComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,

    PriceFormatterDirectiveTr,
    PricePipeTr,

    ErrorDialogComponent,
    DialogYesNoComponent
  ],
  providers: [MenuItems, WebApiTestService, HttpService,  ValueFormatterService, TurkishStringService]
})
export class SharedModule { }
