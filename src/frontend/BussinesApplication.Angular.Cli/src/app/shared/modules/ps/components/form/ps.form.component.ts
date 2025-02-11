import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from '../../../pscategory/pscategory.service';
import { PSService } from '../../services/ps.service';  // PSService import edildi

@Component({
  selector: 'sasolution-ps-form',
  templateUrl: './ps.form.component.html',
  styleUrls: ['./ps.form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PSFormComponent implements OnInit, AfterViewChecked {
  // idToCodeMap: categoryId -> categoryCode
  idToCodeMap = new Map<number, string>();

  // codeToIdMap: categoryCode -> categoryId
  codeToIdMap = new Map<string, number>();
  productId: string="";
  productForm: FormGroup;  // FormGroup
  isEditMode: boolean = false;  // Düzenleme modunun başlangıç değeri
  products: any[] = [];  // Kategorileri tutmak için bir dizi
  product: any;
  categories: Category[] = [];  // Kategorileri tutmak için bir dizi
  category!: Category;

  categoryCodes: any[] = [];  // Kategorileri tutmak için bir dizi
  categoryCode: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private productService: PSService,
    private categoryService: CategoryService,
  ) {
    // Formu oluşturuyoruz
    this.productForm = this.fb.group({
      name: ['', Validators.required],  // Ürün adı
      categoryCode: ['', Validators.required],  // Kategori kodu
      price: ['', Validators.required],  // Ürün fiyatı
      isFavorite: [false],  // Favori mi?
    });
  }
  ngOnInit(): void {
    this.setCategoryCodes();
    this.activatedRoute.queryParams.subscribe(params => {
      const productParam = params['product'];  // 'product' query parametresini alıyoruz
      if (productParam) {
        // Parametreyi decode edip JSON'a çeviriyoruz
        const product = JSON.parse(decodeURIComponent(productParam));

        this.isEditMode = true;  // Düzenleme moduna geçiyoruz
        this.productId = product.id;
        console.log("product.id:",product.id);
        let categoryCode = product.categoryCode; // URL parametrelerinden categoryCode alınır

        // Eğer 'categoryCode' URL parametrelerinde yoksa, idToCodeMap kullanarak 'categoryCode' bulunuyor
        if (!categoryCode) {
          categoryCode = this.idToCodeMap.get(product.categoryId);
        }

        if (categoryCode) {
          // Formu güncelliyoruz
          this.productForm.patchValue({
            name: product.name,
            categoryCode: categoryCode,  // categoryCode'u doğru şekilde formda ayarlıyoruz
            price: product.price,
            isFavorite: product.isFavorite,
          });
        } else {
          console.error('categoryId için categoryCode bulunamadı.');
        }
      } else {
        // Eğer 'product' query parametresi yoksa, 'productId' URL parametresini alıyoruz
        const productId = params['productId'];
        if (productId) {
          this.loadProductById(productId);
        }
      }
    });
  }

  loadProductById(productId: string) {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        const categoryCode = this.idToCodeMap.get(this.product.categoryId);
        if (categoryCode) {
          this.productForm.patchValue({
            name: this.product.name,
            categoryCode: categoryCode,
            price: this.product.price,
            isFavorite: this.product.isFavorite,
          });
        } else {
          console.error('categoryId eşleşmesi bulunamadı.');
        }
      },
      error: (err) => {
        console.error('Ürün alınırken hata:', err);
        this.snackBar.open('Ürün alınırken bir hata oluştu.', '', { duration: 3000 });
      }
    });
  }




  ngAfterViewChecked() {
    // Change detection yapmak için
    this.cdRef.detectChanges();
  }

  loadProducts() {
    // Kategorileri almak için kategori servisini çağırıyoruz
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err) => {
        console.error('Kategoriler alınırken hata:', err);
        this.snackBar.open('Kategoriler alınırken bir hata oluştu.', '', { duration: 3000 });
      }
    });
  }

  setCategoryCodes() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categoryCodes = response;
        console.log(this.categoryCodes);  // categoryCodes dizisini kontrol et

        // idToCodeMap (categoryId -> categoryCode) oluşturuluyor
        this.idToCodeMap = new Map<number, string>();
        // codeToIdMap (categoryCode -> categoryId) oluşturuluyor
        this.codeToIdMap = new Map<string, number>();

        for (let category of this.categoryCodes) {
          this.idToCodeMap.set(category.id, category.categoryCode);
          this.codeToIdMap.set(category.categoryCode, category.id);
        }

        console.log(this.idToCodeMap);  // Doğru şekilde oluşturulduğunu kontrol et
        console.log(this.codeToIdMap);  // Doğru şekilde oluşturulduğunu kontrol et
      },
      error: (err) => {
        console.error('Kategoriler alınırken hata:', err);
        this.snackBar.open('Kategoriler alınırken bir hata oluştu.', '', { duration: 3000 });
      }
    });
  }

 

  submitForm() {
    if (this.productForm.valid) {
      const categoryCode = this.productForm.get('categoryCode')?.value;
      const categoryId = this.codeToIdMap.get(categoryCode);

      if (!categoryId) {
        this.snackBar.open('Geçersiz kategori kodu.', '', { duration: 3000 });
        return;
      }
   

      let categoryCodes = this.codeToIdMap.get(categoryCode);
      const formData = {
        id:this.productId,
        name: this.productForm.get('name')?.value,
        categoryId: categoryCodes,
        price: this.productForm.get('price')?.value,
        isFavorite: this.productForm.get('isFavorite')?.value,
      };

      if (this.isEditMode) {
        // Ürün güncelleme işlemi
        this.productService.updateProduct(formData).subscribe({
          next: () => {
            this.snackBar.open('Ürün başarıyla güncellendi.', '', { duration: 3000 });
            this.router.navigate(['/coredata/ps/list']);
          },
          error: (err) => {
            this.snackBar.open('Ürün güncellenirken bir hata oluştu.', '', { duration: 3000 });
            console.error(err);
          }
        });
      } else {
        // Yeni ürün ekleme işlemi
        this.productService.createProduct(formData).subscribe({
          next: () => {
            this.snackBar.open('Ürün başarıyla eklendi.', '', { duration: 3000 });
            this.router.navigate(['/coredata/ps/list']);
          },
          error: (err) => {
            this.snackBar.open('Ürün eklenirken bir hata oluştu.', '', { duration: 3000 });
            console.error(err);
          }
        });
      }
    } else {
      this.snackBar.open('Formda eksik veya hatalı alanlar var.', '', { duration: 3000 });
    }
  }

  cancel() {
    this.router.navigate(['/coredata/ps/list']);
  }
}
