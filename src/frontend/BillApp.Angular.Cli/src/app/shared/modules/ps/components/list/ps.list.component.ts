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
import { PS } from '../../models/ps.model';


export interface UserData {
  KOD: string;
  AD: string;
  FIYAT: string;
  TARIH: string;
 
}

@Component({
  selector: 'sasolution-ps-list',
  templateUrl: './ps.list.component.html',
  styleUrls: ['./ps.list.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatCardModule],
})
export class PSListComponent implements OnInit, AfterViewChecked {
 
  displayedColumns: string[] = ['KOD', 'AD', 'FIYAT', 'TARIH', 'DUZENLE', 'SIL']; // Görüntülenecek sütunlar
  dataSource = new MatTableDataSource<UserData>([
    { KOD: 'blueberry', AD: 'Maia', FIYAT:'10',TARIH: '01-10-2025' },
    { KOD: 'lychee', AD: 'Asher', FIYAT: '10', TARIH: '08-03-2024' },
    { KOD: 'kiwi', AD: 'Olivia', FIYAT: '10', TARIH: '12-12-2024' },
    { KOD: 'mango', AD: 'Atticus', FIYAT: '10', TARIH: '01-12-2023' },
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

  setData(data: PS[]) {
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
