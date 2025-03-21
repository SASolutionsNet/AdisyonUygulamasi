import { Component, Injectable, ChangeDetectorRef, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'moment/locale/tr';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SalesOrderService } from '../../services/order.service';
import { PSService } from '../../../../ps/services/ps.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from '../../../../../../sales/accounting/detail/sales.accounting.detail.component';
import { SalesAccountingService } from '../../../accounting/services/accounting.service';
import { SalesAccounting } from '../../../accounting/models/accounting.model';

@Component({
  selector: 'sasolution-sales-order-list',
  templateUrl: './order.list.component.html',
  styleUrls: ['./order.list.component.scss'],
  imports: [MatTabsModule, CommonModule, CommonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule],
})
export class OrderListComponent implements OnInit {
  private _rows: any;
  dataLoadedEvent: any;
  distinctTables: string[] = [];
  bills: SalesAccounting[] = []
  billId: string = "";
  salonBoxes: string[] = Array.from({ length: 16 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 16 }, (_, i) => `B${i + 1}`);
  private reloadInterval: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz
  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private orderService: SalesOrderService,
    private productService: PSService,
    private accountingService: SalesAccountingService
  ) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

  }

  ngOnInit() {
    this.setDistinctTables();
    // Sayfayı her 10 saniyede bir yenile
    //this.reloadInterval = setInterval(() => {
    //  this.setDistinctTables()
    //}, 300);
  }

  setDistinctTables() {
    this.accountingService.getAllOpenBills().subscribe(response => {
      if (Array.isArray(response)) {
        this.bills = response;
        this.distinctTables = this.bills.map(item => item.table);
      } else {
        this.distinctTables = [];
        console.error("Beklenen dizi formatında veri alınamadı!", response);
      }
    });
  }



  isOpen(box: string): boolean {
    return this.distinctTables.includes(box);
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  onBoxClick(box: string) {
    var existingBills = this.bills.filter(item => item.table == box);
    if (existingBills.length == 0) {
      var bill = {
        table: box,
        totalPrice: 0
      }

      this.accountingService.createBill(bill).subscribe(response => {
        this.billId = response.id
        this.router.navigate([`/sales/order/detail/${box}/${this.billId}`]);  // Yönlendirme
      });
    }
    else {
      this.billId = existingBills[0].id;

      this.router.navigate([`/sales/order/detail/${box}/${this.billId}`]);  // Yönlendirme

    }


  }



}
