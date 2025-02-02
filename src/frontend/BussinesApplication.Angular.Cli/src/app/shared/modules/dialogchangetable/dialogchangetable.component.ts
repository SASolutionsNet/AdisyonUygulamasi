
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
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


  constructor(
    public dialogRef: MatDialogRef<DialogChangeTableComponent>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }) {

    // https://github.com/angular/material2/issues/4876
    this.dateAdapter.setLocale('tr');

    //this.datePickerMinDate = moment().utc().subtract(2, 'days').local().toDate();
    //this.datePickerStartDate = this.datePickerMinDate;

  }

  ngOnInit() {
    // Gelen 'id' parametresini konsola yazdırıyoruz veya istediğiniz gibi kullanabilirsiniz
    console.log('Popup içinde alınan ID:', this.data.id);
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  onBoxClick(box: string) {
    // 1. localStorage'dan orders verisini alıyoruz
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');

    // 2. this.data.id ile eşleşen orders öğelerini buluyoruz
    const updatedOrders = orders.map((order: { table: string; box: any; }) => {
      if (order.table === this.data.id) {
        // 3. Bu öğelerin table değerini box ile değiştiriyoruz
        order.table = box;  // Eğer box değeri varsa, table'ı box ile değiştiriyoruz.
      }
      return order;
    });

    // 4. Güncellenmiş veriyi localStorage'a kaydediyoruz
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    this.router.navigate([`/sales/order/list`]);  // Yönlendirme
    this.dialogRef.close(); 
  }



}
