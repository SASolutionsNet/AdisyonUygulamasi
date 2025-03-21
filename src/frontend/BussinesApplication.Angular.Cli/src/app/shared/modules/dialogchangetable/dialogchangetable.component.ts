
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SalesAccountingService } from '../sales/accounting/services/accounting.service';
import { SalesAccounting } from '../sales/accounting/models/accounting.model';
import { Order } from '../sales/accounting/components/detail/accounting.detail.component';
import { Orders } from '../sales/order/models/order.model';
@Component({
  selector: 'sasolution-dialogchangetable',
  templateUrl: './dialogchangetable.component.html',
  styleUrls: ['./dialogchangetable.component.scss'],
  imports: [MatTabsModule, CommonModule],
})
export class DialogChangeTableComponent implements OnInit {


  private _rows: any;
  dataLoadedEvent: any;



  salonBoxes: string[] = Array.from({ length: 24 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 24 }, (_, i) => `B${i + 1}`);
  distinctTables: string[] = [];
  bills: SalesAccounting[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogChangeTableComponent>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private accountingService: SalesAccountingService,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');


  }

  ngOnInit() {
    this.setDistinctTables();
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
    // 1. salesAccountingOrders verisini alıyoruz (localStorage'dan alabilirsiniz veya bu veriyi direkt component içinde tutuyor olabilirsiniz)
    const orders: Orders[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');

    var billId = this.bills.filter(item => item.table = this.data.id)[0].id;


    // 2. this.data.id ile eşleşen orders öğelerini buluyoruz ve güncelliyoruz
    const updatedOrders = orders.map(order => {
      if (order.table === this.data.id) {
        // 3. Bu öğelerin table değerini box ile değiştiriyoruz
        order.table = box;  // Eğer box değeri varsa, table'ı box ile değiştiriyoruz.
      }
      return order;
    });

    // 4. Güncellenmiş veriyi localStorage'a kaydediyoruz
    localStorage.setItem('salesAccountingOrders', JSON.stringify(updatedOrders));
    var bill: SalesAccounting = new SalesAccounting();
    bill.id = billId;
    bill.table = box;

    this.accountingService.updateBill(bill).subscribe(
      (response) => {
        // Güncelleme başarılı olduğunda yapılacak işlemler
        console.log('Fatura başarıyla güncellendi:', response);
      },
      (error) => {
        // Güncelleme hatası durumunda yapılacak işlemler
        console.error('Fatura güncellenirken bir hata oluştu:', error);
      }
    );


    // 5. Yönlendirme işlemi ve dialog kapama
    this.router.navigate([`/sales/order/list/${true}`]);
    this.dialogRef.close();
  }


}
