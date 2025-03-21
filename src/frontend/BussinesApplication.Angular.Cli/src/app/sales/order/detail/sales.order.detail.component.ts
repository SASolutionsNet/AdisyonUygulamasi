
import { Component, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from "../../../shared/modules/sales/order/services/order.service";
import { PSService } from "../../../shared/modules/ps/services/ps.service";
import { Orders, SalesOrder } from "../../../shared/modules/sales/order/models/order.model";
import { Product } from "../../../shared/modules/ps/models/ps.model";
import { OrderDetailComponent } from "../../../shared/modules/sales/order/components/detail/order.detail.component"; // Import işlemi
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { SalesAccounting } from '../../../shared/modules/sales/accounting/models/accounting.model';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { SalesAccountingService } from '../../../shared/modules/sales/accounting/services/accounting.service';
import { Observable, Subscription } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

interface Tab {
  label: string;
  tiles: { name: string, price: number, productId: string }[];  // 'tiles' should be an array of objects
}
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean | Promise<boolean>;
}

@Injectable({ providedIn: 'root' })
export class DeleteGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  standalone: true,
  imports: [MatIcon, MatPaginatorModule, OrderDetailComponent, MatCardModule, SidebarComponent, HeaderComponent],  // Import dependencies
})
export class SalesOrderDetailComponent implements OnInit, CanComponentDeactivate {



  // Initialize SalesAccounting object
  private routerSubscription!: Subscription;

  salesAccounting: SalesAccounting = new SalesAccounting();  // Initialized correctly
  tabsData: Tab[] = [];  // Array of tabs, each with a label and tiles (products)
  boxParam!: string;
  orders: Orders[] = [];  // Array to hold order data
  products: Product[] = [];  // Product data from API
  salesAccountings: SalesAccounting[] = [];  // List of sales accounting data
  dataSource = new MatTableDataSource<any>([]); // Başlangıçta boş veri
  matchingOrders: Orders[] = [];
  billId: string = "";
  isTableChanged: string = "";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private productService: PSService,
    private accountingService: SalesAccountingService,
    private orderService: SalesOrderService
  ) { }
  sidebarVisible = false;

  canDeactivate(): Observable<boolean> | boolean {
    // Navigasyonun hedef URL'sini al
    const navigation = this.router.getCurrentNavigation();
    const nextUrl = navigation?.finalUrl?.toString();


    // A veya B sayfasına geçişte silme işlemi yap
    const savedOrders: Orders[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    const hasOrders = savedOrders.some(order => order.table === this.boxParam);

    if (nextUrl?.includes("/sales/order/list") && nextUrl?.includes("true")) {
      return true;
    }

    if (!hasOrders && this.billId) {
      return this.accountingService.deleteBill(this.billId);
    }

    return true;
  }
  // Yeni fonksiyon eklendi
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.billId = params['billId'];
      this.boxParam = params['box'];
    });

    // Check if orders are stored in localStorage
    var storedOrders: Orders[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    if (storedOrders.filter(item => item.table == this.boxParam).length == 0) {
      this.orderService.getAllOrdersForBill(this.billId).subscribe(response => {

        if (Array.isArray(response)) {
          response = response.flatMap(order =>
            Array(order.quantity).fill(null).map(() => ({
              ...order,
              paid: false,
              table: this.boxParam,
              quantity: 1,
              productId: order.productId,
              cost: order.cost / order.quantity,
              id: this.generateGUID() // Her öğeye ayrı GUID atanır
            }))
          );

          if (storedOrders.length == 0) {
            storedOrders = response as Orders[];
            localStorage.setItem('salesAccountingOrders', JSON.stringify(storedOrders));
          }
          else {
            storedOrders.push(...(response as Orders[]));
            localStorage.setItem('salesAccountingOrders', JSON.stringify(storedOrders));
          }
        } else {
          console.error("Beklenen dizi formatında veri alınamadı!", response);
        }


        if (storedOrders) {
          this.salesAccounting.orders = storedOrders;  // Parse the stored JSON string back to an array
        }

        this.setProductTabs();
        this.cdRef.detectChanges();
        this.getOrdersByBoxParam();
      });
    }
    else {

      if (storedOrders) {
        this.salesAccounting.orders = storedOrders;  // Parse the stored JSON string back to an array
      }

      this.setProductTabs();
      this.cdRef.detectChanges();
      this.getOrdersByBoxParam();
    }

  }

  ngAfterViewChecked() {
    //explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
    this.cdRef.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Burada değişen değerleri kontrol edebiliriz
    if (changes['tabsData']) {
      console.log('tabsData değişti:', changes['tabsData']);
    }
  }

  // Handle page change
  onPageChanged(event: any) {
    console.log('Page changed: ', event);
  }

  // Sets tabs for the products based on category name
  setProductTabs() {
    this.tabsData = [];  // Reset tabs data

    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;

        // Organize products into tabs by category name
        this.products.forEach((product: Product) => {
          console.log('Product Category Name:', product.categoryName);

          const tabIndex = this.tabsData.findIndex((tab) => tab.label === product.categoryName);

          if (tabIndex === -1) {
            this.tabsData.push({
              label: product.categoryName,
              tiles: [{ name: product.name, price: product.price, productId: product.id }]
            });
          } else {
            this.tabsData[tabIndex].tiles.push({ name: product.name, price: product.price, productId: product.id });
          }
        });

        console.log('Tabs Data:', this.tabsData);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.snackBar.open('An error occurred while fetching categories.', '', { duration: 3000 });
      }
    });
  }


  // Handle tile click event
  onTileClick(tile: { name: string, price: number, productId: string }): void {

    var addOrder = {
      billId: this.billId,
      productId: tile.productId,
      quantity: 1
    };

    // OrderService'den addOrders fonksiyonunu çağırma *********
    this.orderService.createOrder(addOrder).subscribe(response => {
      console.log('Siparişler başarıyla oluşturuldu:', response);
    }, error => {
      console.error('Sipariş oluşturma hatası:', error);
    });

    let order: Orders = {
      id: this.generateGUID(),
      productName: tile.name,
      cost: tile.price,
      table: this.boxParam,
      quantity: 1,
      productId: tile.productId,
      billId: this.billId,
      paid: false
    };

    // Add the new order to salesAccounting.orders
    if (Array.isArray(this.salesAccounting.orders)) {
      // Instead of directly pushing to the array, update the reference
      this.salesAccounting.orders.push(order);
      this.salesAccounting.orders = [...this.salesAccounting.orders]; // Create a new array reference
      this.cdRef.detectChanges(); // Trigger change detection
    }

    // Save the updated orders to localStorage
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.salesAccounting.orders));

    console.log('Updated orders:', this.salesAccounting.orders);
    this.cdRef.detectChanges();  // Manually trigger change detection
    this.getOrdersByBoxParam();
  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8); // v için 8, 9, a, b sayılarından biri seçilir
      return v.toString(16);
    });
  }

  // Method to get orders with matching table value from the route
  getOrdersByBoxParam(): Orders[] {

    // Retrieve 'box' param from the URL using ActivatedRoute
    this.activatedRoute.paramMap.subscribe(params => {
      const boxParam = params.get('box')?.toString() ?? '';  // Get the 'box' parameter from the URL

      if (boxParam) {
        // Filter orders where the table value matches the box param
        this.matchingOrders = this.salesAccounting.orders.filter(order => order.table === boxParam);

        console.log('Matching Orders:', this.matchingOrders);  // Log the filtered orders
      }
    });

    return this.matchingOrders;
  }


  // Handle button click event (to remove order)
  handleButtonClick(order: Orders): void {

    console.log('Button clicked for order:', order);

    // Remove order from salesAccounting.orders based on product name
    if (Array.isArray(this.salesAccounting.orders)) {
      const index = this.salesAccounting.orders.findIndex(o => o.productName === order.productName);

      if (index !== -1) {
        this.salesAccounting.orders.splice(index, 1);  // Remove the order from the array
        this.salesAccounting.orders = [...this.salesAccounting.orders]; // Create a new array reference
        this.cdRef.detectChanges(); // Trigger change detection
      }
    }

    // Update the localStorage with the new orders array
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.salesAccounting.orders));

    // Optionally, you can call the getOrdersByBoxParam method again if you want to filter based on the box param
    this.getOrdersByBoxParam();


    // localStorage'dan salesAccountingOrders verisini al
    let savedOrders: Orders[] = JSON.parse(localStorage.getItem('salesAccountingOrders') || '[]');
    // 'table' parametresi ile eşleşen kayıtları filtrele ve çıkar
    savedOrders = savedOrders.filter(order => order.table == this.boxParam);

    this.orderService.deleteOrder(this.billId, order.productId).subscribe(
      (response) => {
        if (savedOrders.length = 0) {
          this.accountingService.deleteBill(order.billId).subscribe(
            (response) => {
              // Silme işlemi başarılı olduğunda yapılacak işlemler
              console.log('Fatura başarıyla silindi:', response);
            },
            (error) => {
              // Silme işlemi sırasında bir hata oluştuğunda yapılacak işlemler
              console.error('Fatura silinirken bir hata oluştu:', error);
            }
          );
        }
        // Silme işlemi başarılı olduğunda yapılacak işlemler
        console.log('Sipariş başarıyla silindi:', response);
      },
      (error) => {
        // Silme işlemi sırasında bir hata oluştuğunda yapılacak işlemler
        console.error('Sipariş silinirken bir hata oluştu:', error);

      }
    );
  }


}
