import { Router, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../errordialog/errordialog.component';
import { PSCategory, PSCategoryService } from '../pscategory.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface UserData {
  KOD: string;
  AD: string;
  TARIH: string;
}


@Component({
  selector: 'sasolution-pscategory-list',
  templateUrl: './pscategory.list.component.html',
  styleUrls: ['./pscategory.list.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule,MatCardModule],
})
export class PSCategoryListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['KOD', 'AD', 'TARIH','DUZENLE','SIL']; // Görüntülenecek sütunlar
  dataSource = new MatTableDataSource<UserData>([
    { KOD: 'blueberry', AD: 'Maia', TARIH: '01-10-2025'},
    { KOD: 'lychee', AD: 'Asher', TARIH: '08-03-2024' },
    { KOD: 'kiwi', AD: 'Olivia', TARIH: '12-12-2024'},
    { KOD: 'mango', AD: 'Atticus', TARIH: '01-12-2023'},
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator; // MatPaginator'ı erişebilmek için ViewChild ile alıyoruz
  @ViewChild(MatSort) sort!: MatSort; // MatSort'ı erişebilmek için ViewChild ile alıyoruz

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // Verilerinizi burada almak isterseniz, API çağrısı yapabilirsiniz
  }

  ngAfterViewInit() {
    // Paginator ve Sort işlemleri ngAfterViewInit içinde yapılır, çünkü bu işlem görünümdeki öğeler tamamlandıktan sonra yapılır
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    // Filtreleme işlemi
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Eğer paginator varsa, ilk sayfaya git
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewChecked() {
    // Eğer herhangi bir değişiklik algılanırsa, explicit olarak change detection yapıyoruz
    this.cdRef.detectChanges();
  }

  setData(data: PSCategory[]) {
    // Veriyi ayarlamak için bu metodu kullanabilirsiniz
  }

  getList() {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  edit(row: any) {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  delete(row:any) {
    // Veriyi almak için bu metodu kullanabilirsiniz
  }
  add() {
    // 'pscategory/create' yoluna yönlendir
    this.router.navigate(['/coredata/pscategory/create']);
  }
}
