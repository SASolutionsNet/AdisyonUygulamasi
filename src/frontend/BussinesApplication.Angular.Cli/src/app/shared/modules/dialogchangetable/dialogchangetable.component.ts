
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { SalesAccountingService } from '../sales/accounting/services/accounting.service';
import { SalesAccounting } from '../sales/accounting/models/accounting.model';
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



  salonBoxes: string[] = Array.from({ length: 16 }, (_, i) => `S${i + 1}`);
  bahceBoxes: string[] = Array.from({ length: 16 }, (_, i) => `B${i + 1}`);

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
    console.log("setDistinctTables");

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
  hasOrder(box: string): boolean {
    var bill = this.bills.filter(x => x.table == box)[0];

    if (bill)
      return bill.orders.length != 0;
    else
      return false;
  }
  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }


  onBoxClick(box: string) {

    var billId = this.bills.filter(item => item.table == this.data.id)[0].id;

    var bill: SalesAccounting = new SalesAccounting();
    bill.id = billId;
    bill.table = box;

    this.accountingService.updateBill(bill).subscribe(
      (response) => {
        // 5. Yönlendirme işlemi ve dialog kapama
        console.log("updated");
        this.router.navigate([`/sales/order/list/${true}`]);
        this.dialogRef.close();

      },
      (error) => {
        // Güncelleme hatası durumunda yapılacak işlemler
        console.error('Fatura güncellenirken bir hata oluştu:', error);
      }
    );

  }


}
