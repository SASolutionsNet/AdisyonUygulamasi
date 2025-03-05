import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatButtonModule } from '@angular/material/button';



import { HttpService } from './modules/common/httpService';



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
