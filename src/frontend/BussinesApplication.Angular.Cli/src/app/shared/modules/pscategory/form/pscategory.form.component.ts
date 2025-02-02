
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../errordialog/errordialog.component';

import { PSCategory, PSCategoryService } from '../pscategory.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'sasolution-pscategory-form',
  templateUrl: './pscategory.form.component.html',
  styleUrls: ['./pscategory.form.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule,MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSCategoryFormComponent {
  categoryForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog) {

    // Formu oluşturuyoruz
    this.categoryForm = this.fb.group({
      categoryName: [''],  // Kategori adı
      categoryCode: ['']   // Kategori kodu
    });

    // Kategori adı değiştikçe kategori kodunu güncellemek için dinleyici ekliyoruz
    this.categoryForm.get('categoryName')?.valueChanges.subscribe(value => {
      this.updateCategoryCode(value);
    });
  }

  ngOnInit() {
   
  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }

  convertFieldValueToUpperCase(formControl: FormControl) {
    //if (formControl && formControl.value) {
    //  let upperCaseValue: string = formControl.value.turkishToUpper();

    //  formControl.setValue(upperCaseValue);
    //}
  }

  isActive() {
   /* return !this.form.controls['isDeleted'].value;*/
  }

  isDeletedToggle() {
    //this.form.patchValue({
    //  isDeleted: !this.form.controls['isDeleted'].value
    //});
  }

  isDeletedCheckboxDisabled() {
   /* return this.crudType != 'update';*/
  }

  // Kategori adı değiştiğinde kategori kodunu otomatik oluşturuyoruz
  updateCategoryCode(categoryName: string) {
    const categoryCode = this.generateCategoryCode(categoryName);
    this.categoryForm.get('categoryCode')?.setValue(categoryCode);
  }

  // Basit bir kategori kodu üretme fonksiyonu (örnek)
  generateCategoryCode(categoryName: string): string {
    return categoryName ? categoryName.substring(0, 3).toUpperCase() + '001' : '';
  }
}
