
import { Component, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
interface Tab {
  label: string;
  tiles: { name: string, price: number, productId : string }[];  // 'tiles' should be an array of objects
}

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule,OrderDetailComponent, MatCardModule, SidebarComponent, HeaderComponent],  // Import dependencies
})
export class SalesOrderDetailComponent implements OnInit {
  // Initialize SalesAccounting object
  salesAccounting: SalesAccounting = new SalesAccounting();  // Initialized correctly
  tabsData: Tab[] = [];  // Array of tabs, each with a label and tiles (products)
  boxParam!: string;
  orders: Orders[] = [];  // Array to hold order data
  products: Product[] = [];  // Product data from API
  salesAccountings: SalesAccounting[] = [];  // List of sales accounting data
  dataSource = new MatTableDataSource<any>([]); // Başlangıçta boş veri
  matchingOrders: Orders[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private productService: PSService,
  ) { }

  ngOnInit() {
   
    // Check if orders are stored in localStorage
    const storedOrders = localStorage.getItem('salesAccountingOrders');
    if (storedOrders) {
      this.salesAccounting.orders = JSON.parse(storedOrders);  // Parse the stored JSON string back to an array
    }
    this.setProductTabs();
    this.cdRef.detectChanges();
    this.getOrdersByBoxParam();
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
              tiles: [{ name: product.name, price: product.price, productId : product.id }]
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

  //// Handle tile click event
  //onTileClick(tile: { name: string, price: number }): void {
  //  // Retrieve 'box' param from the URL using ActivatedRoute
  //  this.activatedRoute.paramMap.subscribe(params => {
  //    this.boxParam = params.get('box')?.toString() ?? '';
  //    if (this.boxParam) {
  //      console.log('Box Param:', this.boxParam);  // Log box param
  //    }
  //  });

  //  let order: Orders = {
  //    productName: tile.name,
  //    cost: tile.price,
  //    table: this.boxParam,
  //    quantity: 0,
  //  };

  //  // Add the new order to salesAccounting.orders
  //  if (Array.isArray(this.salesAccounting.orders)) {
  //    // Instead of directly pushing to the array, update the reference
  //    this.salesAccounting.orders.push(order);
  //    this.salesAccounting.orders = [...this.salesAccounting.orders]; // Create a new array reference
  //    this.cdRef.detectChanges(); // Trigger change detection

  //  }

  //  console.log('Updated orders:', this.salesAccounting.orders);
  //  this.cdRef.detectChanges();  // Manually trigger change detection
  //}
  // Handle tile click event
  onTileClick(tile: { name: string, price: number, productId : string }): void {

   

    // Retrieve 'box' param from the URL using ActivatedRoute
    this.activatedRoute.paramMap.subscribe(params => {
      this.boxParam = params.get('box')?.toString() ?? '';
      if (this.boxParam) {
        console.log('Box Param:', this.boxParam);  // Log box param
      }
    });

    let order: Orders = {
      // id : Guid.NewGuid()
      id: this.generateGUID(),
      productName: tile.name,
      cost: tile.price,
      table: this.boxParam,
      quantity: 1,
      productId: tile.productId 
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
  //handleButtonClick(order: Orders): void {
  //  console.log('Button clicked for order:', order);

  //  // Remove order from salesAccounting.orders based on product name
  //  if (Array.isArray(this.salesAccounting.orders)) {
  //    const index = this.salesAccounting.orders.findIndex(o => o.productName === order.productName);

  //    if (index !== -1) {
  //      this.salesAccounting.orders.splice(index, 1);  // Remove the order from the array
  //      this.salesAccounting.orders = [...this.salesAccounting.orders]; // Create a new array reference
  //      this.cdRef.detectChanges(); // Trigger change detection

  //      // Save the updated orders to localStorage
  //      localStorage.setItem('salesAccountingOrders', JSON.stringify(this.salesAccounting.orders));
  //    }
  //  }
  //}

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
  }




}
