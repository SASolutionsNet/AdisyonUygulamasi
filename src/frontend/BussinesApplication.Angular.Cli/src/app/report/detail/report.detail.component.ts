import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesOrderService } from "../../shared/modules/sales/order/services/order.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { ReportDetailOrders, SalesOrder } from "../../shared/modules/sales/order/models/order.model";
import { SalesAccountingService } from "../../shared/modules/sales/accounting/services/accounting.service";
import { SalesAccounting } from "../../shared/modules/sales/accounting/models/accounting.model";

@Component({
  selector: 'app-report-detail',
  templateUrl: './report.detail.component.html',
  styleUrls: ['./report.detail.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule, MatCardModule, HeaderComponent, SidebarComponent, MatFormFieldModule,
    MatInputModule, MatTableModule, MatDatepickerModule, FormsModule, CommonModule, ReactiveFormsModule,
    MatSortModule, MatButtonModule, MatDividerModule, MatIconModule
  ]  // Import dependencies
})
export class ReportDetailComponent implements OnInit {
  idParam!: string;
  tableParam!: string;
  data: ReportDetailOrders[] = [];
  dataSource = new MatTableDataSource<ReportDetailOrders>();
  displayedColumns: string[] = ['no', 'name', 'table', 'quantity', 'price'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private orderService: SalesOrderService,
    private accountingService: SalesAccountingService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //Retrieve 'box' param from the URL using ActivatedRoute
    this.activatedRoute.paramMap.subscribe(params => {
      var param = params.get('id')?.toString() ?? '';
      this.idParam = param.split("_")[0];
      this.tableParam = param.split("_")[1];
      if (this.idParam) {
        console.log('id Param:', this.idParam);  // Log box param
      }
      if (this.tableParam) {
        console.log('table Param:', this.tableParam);  // Log box param
      }
    });
    this.setData(this.idParam);
    // Initialize the data source for the table
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
  }


  setData(id: string) {
    this.orderService.getAllOrdersForBill(id).subscribe((data: ReportDetailOrders[]) => {
      // Her bir item için createdDate'i dönüştürme
      data.forEach(item => {
        // createdDate'i Date nesnesine dönüştür
        const dateObj = new Date(item.createdDate);

        // Date nesnesini gg/aa/yyyy formatına dönüştür
        const formattedDate = this.formatDate(dateObj);

        // Bu değeri item'ın createdDate'ine atıyoruz
        item.createdDate = formattedDate;

      });

      // Veriyi DataSource'a atıyoruz
      this.dataSource.data = data;

      // Paginatörü set ediyoruz
      this.dataSource.paginator = this.paginator;
    });
  }

  goReportList() {
    this.router.navigate([`/report/list`]);
  }

  // Tarihi gg/aa/yyyy formatında döndüren yardımcı fonksiyon
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Gün
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
    const year = date.getFullYear(); // Yıl

    return `${day}/${month}/${year}`; // gg/aa/yyyy formatında döner
  }
}
