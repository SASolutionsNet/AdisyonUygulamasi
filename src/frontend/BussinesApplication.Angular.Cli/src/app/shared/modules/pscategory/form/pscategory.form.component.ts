
import { Router, ActivatedRoute } from '@angular/router';

/*import { environment } from '../../../../../environments/environment';*/

import { ErrorDialogComponent } from '../../errordialog/errordialog.component';

import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../pscategory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'sasolution-pscategory-form',
  templateUrl: './pscategory.form.component.html',
  styleUrls: ['./pscategory.form.component.scss'],
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSCategoryFormComponent {
  categoryForm: FormGroup;
  category: any;
  isEditMode: boolean = true;  // Bu değişken formun düzenleme modunda olup olmadığını kontrol eder

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,) {

    // Formu oluşturuyoruz
    this.categoryForm = this.fb.group({
      name: [''],  // Kategori adı
      categoryCode: ['']   // Kategori kodu
    });

    // Kategori adı değiştikçe kategori kodunu güncellemek için dinleyici ekliyoruz
    this.categoryForm.get('name')?.valueChanges.subscribe(value => {
      this.updateCategoryCode(value);
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['category']) {
        this.category = JSON.parse(params['category']);
        console.log('Category:', this.category);
        this.isEditMode = false;  // Düzenleme modunda olduğumuzu belirtiyoruz
        // Formu patchValue ile güncelliyoruz
        this.categoryForm.patchValue({
          name: this.category.name,
          categoryCode: this.category.categoryCode // Bu alanda categoryCode değerini eklemeyi unutmayın.
        });
      }
    });
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
  create() {
    if (this.categoryForm.valid) {
      const categoryData = {
        name: this.categoryForm.get('name')?.value,  // Formdaki kategori adı
        categoryCode: this.categoryForm.get('categoryCode')?.value,  // Kategori kodu (eğer varsa)
      };

      // Yeni kategoriyi oluşturmak için service'i çağırıyoruz
      this.categoryService.createCategory(categoryData).subscribe(
        (response) => {
          // Başarılı bir şekilde kategori oluşturulursa
          console.log('Kategori başarıyla oluşturuldu:', response);
          this.router.navigate(['/coredata/pscategory/list']); // Kategoriler listesine yönlendir
        },
        (error) => {
          // Hata durumunda yapılacak işlemler
          console.error('Kategori oluşturulurken bir hata oluştu:', error);
          this.snackBar.open('Kategoriyi oluştururken bir hata oluştu!', '', { duration: 3000 });
        }
      );
    }
  }

  update() {
    if (this.categoryForm.valid) {
      const categoryData = {
        Id: this.category.id,
        name: this.categoryForm.get('name')?.value,  // Formdaki kategori adı
        categoryCode: this.categoryForm.get('categoryCode')?.value,  // Kategori kodu (eğer varsa)
      };

      const categoryId = this.category.id; // Kategori ID'sini alıyoruz

      // Kategoriyi güncellemek için service'i çağırıyoruz
      this.categoryService.updateCategory(categoryData).subscribe(
        (response) => {
          // Başarılı bir şekilde kategori güncellenirse
          console.log('Kategori başarıyla güncellendi:', response);
          this.router.navigate(['/coredata/pscategory/list']); // İstenilen sayfaya yönlendirme
        },
        (error) => {
          // Hata durumunda yapılacak işlemler
          console.error('Kategori güncellenirken bir hata oluştu:', error);
          this.snackBar.open('Güncelleme başarısız oldu!', '', { duration: 3000 });
        }
      );
    }
  }


  cancel() {
    this.router.navigate(['/coredata/pscategory/list']); // İstenilen sayfaya yönlendirme
  }
}
