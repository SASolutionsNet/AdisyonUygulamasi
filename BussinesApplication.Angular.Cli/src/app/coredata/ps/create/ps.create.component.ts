
import { Router, ActivatedRoute } from '@angular/router';




import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ps-create',
  templateUrl: './ps.create.component.html',
  styleUrls: ['./ps.create.component.scss']
})
export class CoreDataPSCreateComponent implements OnInit {

 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog) {
   
  }

  ngOnInit() {
  
  }

  ngAfterViewChecked() {
   // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  

  //onSelectPSCategories(selected) {
  //  if (selected && selected.length == 1) {
  //    this.selectedPSCategory = selected[0];
  //  }
  //}

  //onPSCategoryDataLoaded(rows) {

  //}

  //onPSCategoryFilterUpdated(rows) {

  //}

  //onPSFormValuesChanged(psFormChangedEventData: UIEntityChangedEventData) {
  //  this.ps = psFormChangedEventData.data;

  //  //if (!environment.production) {
  //  //  console.log('CoreDataPSCreateComponent.onPSFormValuesChanged(): ps: ', this.ps);
  //  //}
  //}

  //onPSFeatureValueChanged(psFeatureValueChangedEventData: UIEntityChangedEventData) {
  //  //if (!environment.production) {
  //  //  console.log('CoreDataPSCreateComponent.onPSFeatureValueChanged(): ps: ', this.ps);
  //  //  console.log('CoreDataPSCreateComponent.onPSFeatureValueChanged(): psFeatureValueChangedEventData: ', psFeatureValueChangedEventData);
  //  //}
  //  this.ps.featureValues = psFeatureValueChangedEventData.data;
  //  this.ps.name = this.psService.generatePSNameWithFeatureNames(this.ps);
  //}

  //isPSValid() {
  //  return this.psService.validate(this.ps).isValid;
  //}

  //save() {
  //  if (this.isPSValid()) {

  //    //if (!environment.production) {
  //    //  console.log('CoreDataPSCreateComponent.save(): ps ', this.ps);
  //    //}

  //    this.psService.create(this.ps)
  //      .subscribe(httpServiceResult => {
  //        if (httpServiceResult.success) {
  //          let data: PS = httpServiceResult.result.data;

  //          this.router.navigate(['/coredata/ps/update/' + data.id]);
  //        }
  //        else {
  //          if (httpServiceResult.result != null) {
  //            if (httpServiceResult.result.returnCode == 41) {
  //              let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '300px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //              dialogRef.componentInstance.setContent('Hata / Sorun', null, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', 'Bu özelliklere sahip bir ürün zaten kayıtlı.');
  //            }
  //            else {
  //              let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //              dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
  //            }
  //          }
  //          else {
  //            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //            dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
  //          }
  //        }
  //      },
  //      (err) => {
  //        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
  //        dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
  //      });
  //  }
  //}
}
