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

  salonBoxes: string[] = Array.from({ length: 24 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 24 }, (_, i) => `B${i + 1}`);


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
  ) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    //this.datePickerMinDate = moment().utc().subtract(2, 'days').local().toDate();
    //this.datePickerStartDate = this.datePickerMinDate;

  }

  ngOnInit() {
    const salesAccountingOrders: Order[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    this.distinctTables = [...new Set(salesAccountingOrders.map(order => order.table))];

  }


  isOpen(box: string): boolean {
    return this.distinctTables.includes(box);
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  onBoxClick(box: string) {
    this.router.navigate([`/sales/order/detail/${box}`]);  // Yönlendirme
  }



}
