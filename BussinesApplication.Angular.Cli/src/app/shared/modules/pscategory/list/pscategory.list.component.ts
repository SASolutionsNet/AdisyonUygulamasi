import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorDialogComponent } from '../../errordialog/errordialog.component';


import { PSCategory, PSCategoryService } from '../pscategory.service';

import { TurkishStringService } from '../../../string/turkish.string.service';
import { QueryOptions } from '../../common/QueryOptions';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sasolution-pscategory-list',
  templateUrl: './pscategory.list.component.html',
  styleUrls: ['./pscategory.list.component.scss']
})
export class PSCategoryListComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private turkishStringService: TurkishStringService,
    private dataService: PSCategoryService) {

  }

  ngOnInit() {
  
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  setData(data: PSCategory[]) {
    //if (this._rows.length == 0) {
    //  // initially sort by name
    //  data = data.sort((t1: PSCategory, t2: PSCategory) => {
    //    let t1name = t1.name.toString();
    //    let t2name = t2.name.toString();

    //    if (this.turkishStringService.isGreaterThan(t1name.toLowerCase(), t2name.toLowerCase())) {
    //      return 1;
    //    }

    //    if (this.turkishStringService.isLessThan(t1name.toLowerCase(), t2name.toLowerCase())) {
    //      return -1;
    //    }

    //    return 0;
    //  });
    //}

    //this.list = data;
    //this._rows = data;
    //this.filteredRows = data;

    //this.checkIsCreateButtonDisabled();

    //this.dataLoadedEvent.emit(this._rows);
  }

  getList() {
    //this.busy = true;
    //this.list = [];

    //let qo: QueryOptions = new QueryOptions();
    //qo.i = [];
    //qo.i.push("Features");

    //this.dataService.getList(qo)
    //  .subscribe(httpServiceResult => {
    //    if (httpServiceResult.success) {
    //      let data: PSCategory[] = httpServiceResult.result.data;

    //      this.setData(data);
    //    }
    //    else {
    //      let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //      dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
    //    }

    //    this.busy = false;
    //  },
    //  (err) => {
    //    let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
    //    dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);

    //    this.busy = false;
    //  });
  }

 
}
