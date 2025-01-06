import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploader, FileItem, FileLikeObject, ParsedResponseHeaders } from 'ng2-file-upload/ng2-file-upload';

import { environment } from '../../../../environments/environment';

import { ErrorDialogComponent } from '../../../shared/modules/errordialog/errordialog.component';

import { AuthService } from '../../../shared/modules/auth/auth.service';

import { PSFeature } from '../../../shared/modules/psfeature/models/psfeature.model';
import { PSFeatureService } from '../../../shared/modules/psfeature/services/psfeature.service';
import { PS } from '../../../shared/modules/ps/models/ps.model';
import { PSService } from '../../../shared/modules/ps/services/ps.service';

import { PSCategory, PSCategoryService } from '../../../shared/modules/pscategory/pscategory.service';

import { Party, RelationCustomer, PartyService } from '../../../shared/modules/party/party.service';

import { ValueFormatterService } from '../../../shared/modules/common/value.formatter.service';
import { UIEntityChangedEventData } from '../../../shared/modules/common/uiEntityChangedEventData';
import { PSFeatureValue } from '../../../shared/modules/psfeaturevalue/models/psfeaturevalue.model';
import { PSPriceService } from '../../../shared/modules/psprice/services/psprice.service';
import { PSPrice } from '../../../shared/modules/psprice/models/psprice.model';
import { TurkishStringService } from '../../../shared/string/turkish.string.service';
import { DialogYesNoComponent } from '../../../shared/modules/dialogyesno/dialogyesno.component';

@Component({
  selector: 'pscategory-update',
  templateUrl: './pscategory.update.component.html',
  styleUrls: ['./pscategory.update.component.scss']
})
export class CoreDataPSCategoryUpdateComponent implements OnInit, OnDestroy {

  psCategoryId: string;
  psCategory: PSCategory;
  private subscribedParameter: any;

  public form: FormGroup;

  psFeatureRows = [];

  private psTempInSelectedPSCategory: PS = null;
  rowsPSPrices = [];

  isPriceChangedApproved: boolean = false;
  public formPriceCoefficient: FormGroup;

  private selectedCustomerId: string = null;

  uploaderPS: FileUploader;
  fileUploadErrorMesssage: string = null;

  importedCountPSPrice: number = 0;
  importErrors: string = null;

  private priceUpdateMessage: string = "Bu işlem çok uzun sürebilir (5-10 dakika). Sayfayı kapatmayın. İşlem bitince bu sayfada belirtilecek. Lütfen bekleyin.";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private valueFormatterService: ValueFormatterService,
    private turkishStringService: TurkishStringService,
    private authService: AuthService,
    private psService: PSService,
    private psPriceService: PSPriceService,
    private psCategoryService: PSCategoryService,
    private psFeatureService: PSFeatureService) {

    this.formPriceCoefficient = this.fb.group({
      newPriceCoefficient: [1, Validators.compose([Validators.required, this.validateNumber.bind(this)])]
    });
  }

  ngOnInit() {
    this.subscribedParameter = this.activatedRoute.params.subscribe(params => {
      this.psCategoryId = params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
      this.getPSCategory();
    });
  }

  ngOnDestroy() {
    if (this.subscribedParameter) {
      this.subscribedParameter.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  onFormValuesChanged(form) {
    this.form = form;

    if (!environment.production) {
      console.log('CoreDataPSFeatureCreateComponent.onFormValuesChanged(): form: ' + JSON.stringify(this.form.value));
    }
  }

  isFormValid() {
    if (this.form) {
      return this.form.valid;
    }
    return false;
  }

  onPSFeatureListFilterUpdated(rows) {
    if (!environment.production) {
      console.log('CoreDataPSCategoryUpdateComponent.onPSFeatureListFilterUpdated(): ', rows);
    }
  }

  onPSFeatureListDataLoaded(rows) {
    if (!environment.production) {
      console.log('CoreDataPSCategoryUpdateComponent.onPSFeatureListDataLoaded(): ', rows);
    }
  }

  onPSFeatureListSelectionChanged(selected) {
    if (!environment.production) {
      console.log('CoreDataPSCategoryUpdateComponent.onPSFeatureListSelectionChanged(): ', selected);
    }
  }

  onCreatePSFeatureButtonClicked(event) {
    this.router.navigate(['/coredata/pscategory/feature/create/' + this.psCategoryId]);
  }

  onPSFeatureListActionButtonOneClicked(psFeature: PSFeature) {
    this.router.navigate(['/coredata/pscategory/feature/update/' + this.psCategoryId + "/" + psFeature.id]);
  }

  onPSFeatureListActionButtonTwoClicked(psFeature: PSFeature) {
    // IMPORTANT: before, deleting any feature ask approve first
    this.openDeletePSFeatureApproveYesNoDialog(psFeature);
  }

  openDeletePSFeatureApproveYesNoDialog(psFeature: PSFeature): void {
    let dialogRef: MatDialogRef<DialogYesNoComponent> = this.dialog.open(DialogYesNoComponent, { width: '500px', data: { name: 'DialogYesNoComponent input data' } });
    dialogRef.componentInstance.setContent("Emin misiniz?",
      psFeature.name + " isimli özellik tüm ürünlerden silinecek ! Bunun geri dönüşü yok. Tekrar bu özelliği eklemek isterseniz, tüm ürünleri tek tek düzeltmeniz gerekecek. Onaylıyor musunuz ?", "Evet, Sil", "Hayır");

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, result: ', result);
      if (result) {
        if (result.answer == 'yes') {
          this.deleteFeature(psFeature);
        }
        else {

        }
      }
      else {

      }
    });
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    switch (filter.name) {
      case 'fileSize':
        this.fileUploadErrorMesssage = "Maksimum dosya boyutu en fazla 10 MB olabilir";
        break;
      case 'mimeType':
        this.fileUploadErrorMesssage = "Sadece jpg, jpeg, png, pdf tipinde dosya olmalı";
        break;
      default:
        this.fileUploadErrorMesssage = "Dosya yüklemede hata oluştu";
        break;
    }
  }

  onPSFilterUpdated(event) {

  }

  onPSSelectionChanged(event) {

  }

  onCreateCustomerButtonClicked(event) {
    this.router.navigate(['/sales/customer/list']);
  }

  onCustomerSelectionChanged(selected: RelationCustomer[]) {
    if (selected && selected.length == 1) {
      this.selectedCustomerId = selected[0].customer.id;
    }
    else {
      this.selectedCustomerId = null;
    }
    this.initializeFileUploaderPS();
  }

  initializeFileUploaderPS() {
    // https://github.com/valor-software/ng2-file-upload/issues/463
    this.uploaderPS = new FileUploader({
      url: environment.urls.popsep + "/api/pscategory/" + this.psCategory.id + "/customer/" + this.selectedCustomerId + "/ps/upload",
      //allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // commented for .DXF, .DWG, .IDW cad files
      maxFileSize: 50 * 1024 * 1024, // 50 MB
      queueLimit: 1,
      removeAfterUpload: true,
      itemAlias: 'files',
      isHTML5: true
    });
    this.uploaderPS.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    // https://stackoverflow.com/questions/38502687/how-to-submit-post-data-with-ng2-file-upload-in-angular-2
    // https://github.com/valor-software/ng2-file-upload/issues/690
    this.uploaderPS.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
      this.uploaderPS.authToken = this.authService.currentUser.token_type + ' ' + this.authService.currentUser.access_token;
      this.uploaderPS.options.additionalParameter = {
        name: item.file.name,
        //parent_id: this.parentFolderId
      };
    };
    this.uploaderPS.onCompleteItem = (item: FileItem, responseJson: string, status: number, headers: ParsedResponseHeaders) => {
      //this.getPSCategory();
      //console.log('responseJson: ', responseJson);

      let response = JSON.parse(responseJson);

      this.importedCountPSPrice = response.data;
      this.importErrors = JSON.stringify(response.errors);
    }
  }

  getPSCategory() {
    this.psCategoryService.getById(this.psCategoryId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PSCategory = httpServiceResult.result.data;

          this.psCategory = data;

          this.psFeatureRows = this.psCategory.features;

          this.psTempInSelectedPSCategory = new PS();
          this.psTempInSelectedPSCategory.id = "0";
          this.psTempInSelectedPSCategory.psCategory = this.psCategory;
          this.psTempInSelectedPSCategory.psCategoryId = this.psTempInSelectedPSCategory.psCategory.id;
          this.psTempInSelectedPSCategory.psTypeDiscriminator = this.psTempInSelectedPSCategory.psCategory.psTypeDiscriminator;
          for (var i = 0; i < this.psTempInSelectedPSCategory.psCategory.features.length; ++i) {
            let psFeature: PSFeature = this.psTempInSelectedPSCategory.psCategory.features[i];
            if (psFeature.valueType == "options") {
              let options: string[] = JSON.parse(psFeature.options);
              if (options.length == 1) {
                let psFeatureValue: PSFeatureValue = new PSFeatureValue();
                psFeatureValue.stateId = "empty";
                psFeatureValue.psId = this.psTempInSelectedPSCategory.id;
                psFeatureValue.psFeature = psFeature;
                psFeatureValue.psFeatureId = psFeature.id;
                psFeatureValue.value = options[0];
                this.psTempInSelectedPSCategory.featureValues.push(psFeatureValue);
              }
            }
          }

          this.psTempInSelectedPSCategory.name = this.psService.generatePSNameWithFeatureNames(this.psTempInSelectedPSCategory);

          this.initializeFileUploaderPS();
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  onPSFeatureValueChanged(psFeatureValueChangedEventData: UIEntityChangedEventData) {
    if (!environment.production) {
      console.log('CoreDataPSCategoryUpdateComponent.onPSFeatureValueChanged(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);
      console.log('CoreDataPSCategoryUpdateComponent.onPSFeatureValueChanged(): psFeatureValueChangedEventData: ', psFeatureValueChangedEventData);
    }
    this.psTempInSelectedPSCategory.featureValues = psFeatureValueChangedEventData.data;
    this.psTempInSelectedPSCategory.name = this.psService.generatePSNameWithFeatureNames(this.psTempInSelectedPSCategory);
  }

  checkboxChechedChanged(checked: boolean) {
    this.isPriceChangedApproved = checked;
    if (!this.isPriceChangedApproved) {
      this.priceUpdateMessage = "Bu işlem çok uzun sürebilir (5-10 dakika). Sayfayı kapatmayın. İşlem bitince bu sayfada belirtilecek. Lütfen bekleyin.";
    }
  }


  onPSPriceDataLoaded(event) {

  }

  searchPSPricesByFeatureValuesPartial() {
    console.log('SalesOfferUpdateComponent.searchPSPricesByFeatureValues(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);

    this.psPriceService.searchPSPricesByCustomerIdAndFeatureValuesPartial(this.selectedCustomerId, this.psTempInSelectedPSCategory)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: PSPrice[] = httpServiceResult.result.data;

          // initially sort by name
          data = data.sort((t1: PSPrice, t2: PSPrice) => {
            let t1name: any = t1.ps.name.toString();
            let t2name: any = t2.ps.name.toString();

            if (this.turkishStringService.isGreaterThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return 1;
            }

            if (this.turkishStringService.isLessThan(t1name.toLowerEnglish(), t2name.toLowerEnglish())) {
              return -1;
            }

            return 0;
          });

          this.rowsPSPrices = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  updatePSPricesWithGivenFeaturesAndCustomer() {
    console.log('CoreDataPSCategoryUpdateComponent.updatePSPricesWithGivenFeaturesAndCustomer(): psTempInSelectedPSCategory: ', this.psTempInSelectedPSCategory);

    if (this.formPriceCoefficient.valid && this.isPriceChangedApproved) {

      let newPriceCoefficient: number = this.valueFormatterService.parseDoubleValueFromTrString(this.formPriceCoefficient.value.newPriceCoefficient.toString());

      console.log("updatePSDefaultPrices(): newPriceCoefficient = ", newPriceCoefficient);

      this.priceUpdateMessage = "İşlem DEVAM ediyor... Lütfen BEKLEYİN...";

      this.psPriceService.updateByCustomerIdAndCoefficientAndPSFeatureValuesPartial(this.selectedCustomerId, newPriceCoefficient, this.psTempInSelectedPSCategory)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PSPrice[] = httpServiceResult.result.data;
            // data is always empy because it updates via SQL and it may have thousands of data. so, no need

            this.priceUpdateMessage = "Bu işlem çok uzun sürebilir (5-10 dakika). Sayfayı kapatmayın. İşlem bitince bu sayfada belirtilecek. Lütfen bekleyin.";

            this.isPriceChangedApproved = false;
            this.formPriceCoefficient.patchValue({
              newPriceCoefficient: 1
            });

            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '300px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent("Uyarı", null, null, "Kategorideki ürün fiyatları başarılı şekilde güncellendi.");

            //this.router.navigate(['/coredata/pscategory/update/' + this.psCategoryId]);
          }
          else {
            this.priceUpdateMessage = "Bu işlem çok uzun sürebilir (5-10 dakika). Sayfayı kapatmayın. İşlem bitince bu sayfada belirtilecek. Lütfen bekleyin.";
            this.isPriceChangedApproved = false;
            this.formPriceCoefficient.patchValue({
              newPriceCoefficient: 1
            });

            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
          }
        },
          (err) => {
            this.priceUpdateMessage = "Bu işlem çok uzun sürebilir (5-10 dakika). Sayfayı kapatmayın. İşlem bitince bu sayfada belirtilecek. Lütfen bekleyin.";
            this.isPriceChangedApproved = false;
            this.formPriceCoefficient.patchValue({
              newPriceCoefficient: 1
            });

            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
          });
    }
  }

  validateNumber(formControl: AbstractControl) {
    let isNonNumber: boolean = false;
    let currentFormControlObject: string = formControl.value;
    if (currentFormControlObject) {
      let pureNumber: string = currentFormControlObject.toString().replace('.', '').replace(',', '');
      let isNumericCheck = Number(pureNumber);
      if (isNaN(isNumericCheck)) {
        return { notNumeric: true };
      }
    }
    return null;
  }

  save() {
    // https://toddmotto.com/angular-2-forms-reactive
    if (!environment.production) {
      console.log(this.form.value, this.form.valid);
    }

    if (this.form.valid) {
      this.psCategory.isDeleted = this.form.value.isDeleted;
      this.psCategory.name = this.form.value.name;
      this.psCategory.description = this.form.value.description;
      this.psCategory.purchaseUnit = this.form.value.purchaseUnit;
      this.psCategory.purchaseUnitSecondary = this.form.value.purchaseUnitSecondary;
      this.psCategory.unitCC = this.form.value.unitCC;
      this.psCategory.integrationCode = this.form.value.integrationCode;

      if (!environment.production) {
        console.log('CoreDataPSCategoryUpdateComponent.save(): psCategory = ' + JSON.stringify(this.psCategory));
      }

      this.psCategoryService.update(this.psCategory)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PSCategory = httpServiceResult.result.data;

            this.router.navigate(['/coredata/pscategory/list']);
          }
          else {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
          }
        },
          (err) => {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
          });
    }
  }

  deleteFeature(psFeature: PSFeature) {
    this.psFeatureService.delete(psFeature)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {

          this.getPSCategory();
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  psCombinationCount: number = 0;

  showPSCombinationCount() {
    this.psCombinationCount = this.psCategoryService.getPSCombinationCount(this.psCategory);
  }

  psCount: number = 0;

  showPSCount() {
    this.psCount = 0;

    this.psCategoryService.getPSCount(this.psCategoryId)
      .subscribe(httpServiceResult => {
        if (httpServiceResult.success) {
          let data: number = httpServiceResult.result.data;

          this.psCount = data;
        }
        else {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
        }
      },
        (err) => {
          let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
          dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
        });
  }

  createPSs() {
    // https://toddmotto.com/angular-2-forms-reactive
    if (!environment.production) {
      console.log(this.form.value, this.form.valid);
    }

    if (this.form.valid) {
      this.psCategory.isDeleted = this.form.value.isDeleted;
      this.psCategory.name = this.form.value.name;
      this.psCategory.description = this.form.value.description;
      this.psCategory.purchaseUnit = this.form.value.purchaseUnit;
      this.psCategory.purchaseUnitSecondary = this.form.value.purchaseUnitSecondary;
      this.psCategory.unitCC = this.form.value.unitCC;

      if (!environment.production) {
        console.log('CoreDataPSCategoryUpdateComponent.save(): psCategory = ' + JSON.stringify(this.psCategory));
      }

      this.psCategoryService.createPSs(this.psCategoryId)
        .subscribe(httpServiceResult => {
          if (httpServiceResult.success) {
            let data: PS[] = httpServiceResult.result.data;


          }
          else {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', httpServiceResult.status, httpServiceResult.result ? httpServiceResult.result.returnCode.toString() : '', httpServiceResult.message);
          }
        },
          (err) => {
            let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, { width: '400px', height: '500px', disableClose: true, panelClass: 'custom-overlay-pane-class' });
            dialogRef.componentInstance.setContent('Hata / Sorun', err.status, 'Lütfen hata bilgilerini, ekran görünütüsü ile bildirin. Sonra sayfayı tekrar açıp deneyin.', err.message);
          });
    }
  }
}
