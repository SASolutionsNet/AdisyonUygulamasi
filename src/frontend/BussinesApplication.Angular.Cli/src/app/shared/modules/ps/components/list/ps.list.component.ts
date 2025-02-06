import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { PSService } from '../../services/ps.service';
import { Product } from '../../models/ps.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'sasolution-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss'],
  imports: [CommonModule,MatCheckboxModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule],
})
export class PSListComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ['AD', 'KOD', 'FIYAT', 'TARIH', 'FAVORI', 'DUZENLE', 'SIL'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);


  products: any[] = [];
  errorMessage: string = '';

  //displayedColumns: string[] = ['KOD', 'AD', 'FIYAT', 'TARIH','FAVORI', 'DUZENLE', 'SIL']; // Görüntülenecek sütunlar
  //dataSource = new MatTableDataSource<UserData>([
  //  { KOD: 'blueberry', AD: 'Maia', FIYAT: '10', TARIH: '01-10-2025',FAVORI:true },
  //  { KOD: 'lychee', AD: 'Asher', FIYAT: '10', TARIH: '08-03-2024', FAVORI: true },
  //  { KOD: 'kiwi', AD: 'Olivia', FIYAT: '10', TARIH: '12-12-2024', FAVORI: false },
  //  { KOD: 'mango', AD: 'Atticus', FIYAT: '10', TARIH: '01-12-2023', FAVORI: true },
  //]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz
  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: PSService
  ) { }
  ngOnInit() {
    // Verilerinizi burada almak isterseniz, API çağrısı yapabilirsiniz
    this.loadProducts(); // Bileşen yüklendiğinde ürünleri al
  }

  ngAfterViewInit() {
    //// Paginator ve Sort işlemleri ngAfterViewInit içinde yapılır, çünkü bu işlem görünümdeki öğeler tamamlandıktan sonra yapılır
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  // Filtreleme metodu
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Gelen değeri filtrele
  }


  ngAfterViewChecked() {
    // Eğer herhangi bir değişiklik algılanırsa, explicit olarak change detection yapıyoruz
    this.cdRef.detectChanges();
  }
  // Ürünleri almak için servis çağrısı yapıyoruz
  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response) {
          this.products = response; // Ürünleri alıyoruz ve listeye atıyoruz
        }
      },
      error: (err) => {
        console.error('Ürünler alınırken hata:', err);
        this.errorMessage = 'Ürünler alınırken bir hata oluştu.';
      }
    });
  }
  setData(data: Product[]) {
    // Veriyi ayarlamak için bu metodu kullanabilirsiniz
  }

  getList() {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  edit(row: any) {
    // 'pscategory/update' yoluna yönlendir
    this.router.navigate(['/coredata/ps/update']);
  }
  delete(row: any) {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  add() {
    // 'pscategory/create' yoluna yönlendir
    this.router.navigate(['/coredata/ps/create']);
  }
}
