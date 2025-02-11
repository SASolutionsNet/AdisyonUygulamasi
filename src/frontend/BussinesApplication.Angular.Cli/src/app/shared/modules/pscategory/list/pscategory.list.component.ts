import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../errordialog/errordialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Category, CategoryService } from '../pscategory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource } from '@angular/cdk/collections';



@Component({
  selector: 'sasolution-pscategory-list',
  templateUrl: './pscategory.list.component.html',
  styleUrls: ['./pscategory.list.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule,MatCardModule],
})
export class PSCategoryListComponent implements AfterViewInit, OnInit {
  // Tablodaki sütun başlıkları
  displayedColumns: string[] = ['KOD', 'AD','DUZENLE', 'SIL'];

  // Tablo verilerini tutacak olan MatTableDataSource
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz
  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    // Verilerinizi burada almak isterseniz, API çağrısı yapabilirsiniz
    this.getCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdRef.detectChanges();  // Tablonun güncellenmesini sağlamak için
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      console.log("Kategoriler:", data);  // Burada veriyi kontrol edin
      this.dataSource = new MatTableDataSource(data);
    }, error => {
      console.error('Veri alınırken hata oluştu:', error);
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filtre Değeri:", filterValue);  // Burada filtre değerini kontrol edin
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewChecked() {
    // Eğer herhangi bir değişiklik algılanırsa, explicit olarak change detection yapıyoruz
    this.cdRef.detectChanges();
  }

  setData(data: Category[]) {
    // Veriyi ayarlamak için bu metodu kullanabilirsiniz
  }

  getList() {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  edit(row: any) {
    // Category nesnesini JSON string olarak encode ediyoruz ve URL'ye ekliyoruz
    this.router.navigate(['/coredata/pscategory/update'], {
      queryParams: { category: JSON.stringify(row) }
    });
  
  }
  delete(row: any): void {

    const categoryData = {
      id: row.id,  // Satırdaki kategori ID'sini alıyoruz
      //name: row.name,  // Formdaki kategori adı
      //categoryCode: row.categoryCode,  // Kategori kodu (eğer varsa)
    };


  

    // Silme işlemini başlatıyoruz
    this.categoryService.deleteCategory(categoryData).subscribe(
      (response) => {
        console.log('Kategori başarıyla silindi:', response);
        this.getCategories();
        //this.router.navigate(['/coredata/pscategory/list']); // Silme işleminden sonra kategoriler listesine yönlendiriyoruz
      },
      (error) => {
        console.error('Kategori silinirken bir hata oluştu:', error);
        this.snackBar.open('Silme işlemi başarısız oldu!', '', { duration: 3000 });
      }
    );
  }

  add() {
    // 'pscategory/create' yoluna yönlendir
    this.router.navigate(['/coredata/pscategory/create']);
  }
 
}
