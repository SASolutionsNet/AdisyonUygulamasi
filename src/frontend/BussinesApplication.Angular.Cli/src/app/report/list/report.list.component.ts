import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SalesAccountingService } from "../../shared/modules/sales/accounting/services/accounting.service";
import { SalesAccounting } from "../../shared/modules/sales/accounting/models/accounting.model";

@Component({
  selector: 'app-report-list',
  templateUrl: './report.list.component.html',
  styleUrls: ['./report.list.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule, MatCardModule, HeaderComponent, SidebarComponent, MatFormFieldModule,
    MatInputModule, MatTableModule, MatDatepickerModule, FormsModule, CommonModule, ReactiveFormsModule,
    MatSortModule, MatButtonModule, MatDividerModule, MatIconModule
  ]  // Import dependencies
})
export class ReportListComponent implements OnInit {
  range!: FormGroup;
  dataSource = new MatTableDataSource<SalesAccounting>();
  filteredDataSource = new MatTableDataSource<SalesAccounting>();
  displayedColumns: string[] = ['no', 'table', 'createdDate', 'totalPrice', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  data: SalesAccounting[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private accountingService: SalesAccountingService
  ) { }

  ngOnInit(): void {
    this.setData();

    // Initialize the data source for the table
    this.dataSource.data = this.data;
    this.filteredDataSource.data = this.data;

  }




  ngAfterViewInit(): void {
    this.filteredDataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Apply custom filtering logic for the date column
    this.filteredDataSource.filter = filterValue;

    if (this.filteredDataSource.paginator) {
      this.filteredDataSource.paginator.firstPage();
    }
  }

  setData() {
    this.accountingService.getAllClosedBills().subscribe((data: SalesAccounting[]) => {
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
      this.filteredDataSource.data = data;

      // Paginatörü set ediyoruz
      this.dataSource.paginator = this.paginator;
      this.filteredDataSource.paginator = this.paginator;
    });
  }

  // Tarihi gg/aa/yyyy formatında döndüren yardımcı fonksiyon
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Gün
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
    const year = date.getFullYear(); // Yıl

    return `${day}/${month}/${year}`; // gg/aa/yyyy formatında döner
  }




  onButtonClick(id: string, table: string) {
    console.log("id", id);
    this.router.navigate([`/report/detail/${id}_${table}`]);  // Yönlendirme
  }
}
