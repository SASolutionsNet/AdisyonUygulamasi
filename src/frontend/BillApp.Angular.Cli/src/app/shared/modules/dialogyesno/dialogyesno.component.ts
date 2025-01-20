
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'sasolution-dialogyesno',
  templateUrl: './dialogyesno.component.html',
  styleUrls: ['./dialogyesno.component.scss']
})
export class DialogYesNoComponent implements OnInit {

  @Input() title: string = "Evet / Hayır ?";
  @Input() text: string = "İşlemi Onaylıyor musunuz?";
  @Input() yesButtonText: string = "Evet";
  @Input() noButtonText: string = "Hayır";

  constructor(private cdRef: ChangeDetectorRef, public dialogRef: MatDialogRef<DialogYesNoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
