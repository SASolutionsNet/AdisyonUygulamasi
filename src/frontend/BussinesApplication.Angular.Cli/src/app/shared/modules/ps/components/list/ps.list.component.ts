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
import { Category, CategoryService } from '../../../pscategory/pscategory.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'sasolution-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss'],
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule],
})
export class PSListComponent implements OnInit, AfterViewChecked {
  displayedColumns: string[] = ['AD', 'KOD', 'FIYAT', 'FAVORI', 'DUZENLE', 'SIL'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);

  products: Product[] = [];
  category: Category= new Category;
  errorMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz
  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: PSService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    // Verilerinizi burada almak isterseniz, API çağrısı yapabilirsiniz
    this.loadProducts(); // Bileşen yüklendiğinde ürünleri al
  }

  ngAfterViewInit() {
    // Paginator ve Sort işlemleri ngAfterViewInit içinde yapılır, çünkü bu işlem görünümdeki öğeler tamamlandıktan sonra yapılır
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response) {
          this.products = response; // Ürünleri alıyoruz ve listeye atıyoruz
          this.dataSource.data = this.products; // Tabloya veri kaynağını atıyoruz

          // Her bir ürün için kategori kodunu almak ve güncellemek için forkJoin kullanıyoruz
          const categoryObservables = this.products.map((product) => {
            return this.categoryService.getCategoryById(product.categoryId).pipe(
              // Category verisini almak ve ürün objesinin categoryCode özelliğini güncellemek
              map((category) => {
                product.categoryCode = category.categoryCode;
              })
            );
          });

          // Tüm kategori verileri alındıktan sonra tabloyu güncelleme
          forkJoin(categoryObservables).subscribe({
            next: () => {
              console.log('Tüm kategori kodları güncellendi.');
              this.dataSource.data = [...this.products]; // Tabloyu güncelleme
            },
            error: (err) => {
              console.error('Kategori bilgileri alınırken hata oluştu:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Ürünler alınırken hata:', err);
        this.errorMessage = 'Ürünler alınırken bir hata oluştu.';
      }
    });
  }

  

  edit(row: Product) {
    // Ürün düzenleme için yönlendirme yapıyoruz
    this.router.navigate(['/coredata/ps/update'], { queryParams: { product: JSON.stringify(row) } });
  }

  delete(row: any) {
    // Ürünü silme işlemi
   
  
      this.productService.deleteProduct(row).subscribe({
        next: (response) => {
          console.log('Ürün başarıyla silindi:', response);
          this.loadProducts(); // Silme işlemi başarılıysa ürünler listesini yenile
          this.snackBar.open('Ürün başarıyla silindi!', '', { duration: 3000 });
        },
        error: (err) => {
          console.error('Ürün silinirken hata oluştu:', err);
          this.snackBar.open('Silme işlemi başarısız oldu!', '', { duration: 3000 });
        }
      });
    
  }

  add() {
    // Yeni ürün eklemek için yönlendirme yapıyoruz
    this.router.navigate(['/coredata/ps/create']);
  }
}
