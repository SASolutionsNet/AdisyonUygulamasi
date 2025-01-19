import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatButtonModule } from '@angular/material/button';



//import { ErrorDialogComponent } from './modules/errordialog/errordialog.component';
//import { DialogYesNoComponent } from './modules/dialogyesno/dialogyesno.component';

//import { AuthService } from './modules/auth/auth.service';
//import { AuthGuardService } from './modules/auth/auth-guard.service';

import { HttpService } from './modules/common/httpService';
import { PSCategoryFormComponent } from './modules/pscategory/form/pscategory.form.component';



@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [ HttpService]
})
export class SharedModule { }
