
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'sasolution-dialogpaidalert',
  templateUrl: './dialogpaidalert.component.html',
  styleUrls: ['./dialogpaidalert.component.scss'],
  imports: [MatDialogModule]
})
export class DialogPaidAlertComponent implements OnInit {

  @Input() title: string = "Evet / Hayır ?";
  @Input() text: string = "Bu masaya ait hala ödenmemiş siparişler mevcut, masayı yine de kapatmak istiyor musunuz?";
  @Input() yesButtonText: string = "Evet";
  @Input() noButtonText: string = "Hayır";

  constructor(private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<DialogPaidAlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onClickNo(): void {
    this.dialogRef.close({ answer: 'no' });
  }
  onClickYes(): void {
    this.dialogRef.close({ answer: 'yes' });
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  public setContent(title: string, text: string, yesButtonText: string, noButtonText: string) {
    this.title = title;
    this.text = text;
    this.yesButtonText = yesButtonText;
    this.noButtonText = noButtonText;
  }
}
