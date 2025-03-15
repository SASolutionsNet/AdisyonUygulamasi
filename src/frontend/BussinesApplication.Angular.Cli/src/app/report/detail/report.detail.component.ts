import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
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
import { SalesOrder } from "../../shared/modules/sales/order/models/order.model";

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

  data: SalesOrder[] = [];
  dataSource = new MatTableDataSource<SalesOrder>();
  displayedColumns: string[] = ['no', 'name', 'table', 'price'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private orderService: SalesOrderService
  ) { }

  ngOnInit(): void {

    this.setData();
    // Initialize the data source for the table
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
  }


  //getOrders(id:string) {
  //  this.orderService.By   getAllOrders().subscribe((data: SalesOrder[]) => {
  //    // Her bir item için createdDate'i dönüştürme
  //    data.forEach(item => {
  //      // createdDate'i Date nesnesine dönüştür
  //      const dateObj = new Date(item.createdDate);

  //      // Date nesnesini gg/aa/yyyy formatına dönüştür
  //      const formattedDate = this.formatDate(dateObj);

  //      // Bu değeri item'ın createdDate'ine atıyoruz
  //      item.createdDate = formattedDate;


  //    });

  //    // Veriyi DataSource'a atıyoruz
  //    this.dataSource.data = data;

  //    // Paginatörü set ediyoruz
  //    this.dataSource.paginator = this.paginator;
  //  });
/*  }*/

  setData() {
    this.orderService.getAllOrders().subscribe((data:SalesOrder[]) => {
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
