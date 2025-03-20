// sales.order.detail.component.ts
import { Component, OnInit, ChangeDetectorRef, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from "../../../shared/modules/sales/order/services/order.service";
import { PSService } from "../../../shared/modules/ps/services/ps.service";
import { Orders, SalesOrder } from "../../../shared/modules/sales/order/models/order.model";
import { Product } from "../../../shared/modules/ps/models/ps.model";
import { OrderDetailComponent } from "../../../shared/modules/sales/order/components/detail/order.detail.component";
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { HeaderComponent } from '../../../header/header.component';
import { SalesAccounting } from '../../../shared/modules/sales/accounting/models/accounting.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';

interface Tab {
  label: string;
  tiles: { name: string, price: number, productId: string }[];
}

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  standalone: true,
  imports: [MatIcon, MatPaginatorModule, OrderDetailComponent, MatCardModule, SidebarComponent, HeaderComponent],
})
export class SalesOrderDetailComponent implements OnInit {
  salesAccounting: SalesAccounting = new SalesAccounting();
  tabsData: Tab[] = [];
  boxParam!: string;
  orders: Orders[] = [];
  products: Product[] = [];
  salesAccountings: SalesAccounting[] = [];
  dataSource = new MatTableDataSource<any>([]);
  matchingOrders: Orders[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private productService: PSService,
  ) { }

  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit() {
    const storedOrders = localStorage.getItem('salesAccountingOrders');
    if (storedOrders) {
      this.salesAccounting.orders = JSON.parse(storedOrders);
    }
    this.setProductTabs();
    this.cdRef.detectChanges();
    this.getOrdersByBoxParam();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabsData']) {
      console.log('tabsData değişti:', changes['tabsData']);
    }
  }

  onPageChanged(event: any) {
    console.log('Page changed: ', event);
  }

  setProductTabs() {
    this.tabsData = [];
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.products.forEach((product: Product) => {
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

  onTileClick(tile: { name: string, price: number, productId: string }): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.boxParam = params.get('box')?.toString() ?? '';
      if (this.boxParam) {
        console.log('Box Param:', this.boxParam);
      }
    });
    let order: Orders = {
      id: this.generateGUID(),
      productName: tile.name,
      cost: tile.price,
      table: this.boxParam,
      quantity: 1,
      productId: tile.productId
    };
    if (Array.isArray(this.salesAccounting.orders)) {
      this.salesAccounting.orders.push(order);
      this.salesAccounting.orders = [...this.salesAccounting.orders];
      this.cdRef.detectChanges();
    }
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.salesAccounting.orders));
    console.log('Updated orders:', this.salesAccounting.orders);
    this.cdRef.detectChanges();
    this.getOrdersByBoxParam();
  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getOrdersByBoxParam(): Orders[] {
    this.activatedRoute.paramMap.subscribe(params => {
      const boxParam = params.get('box')?.toString() ?? '';
      if (boxParam) {
        this.matchingOrders = this.salesAccounting.orders.filter(order => order.table === boxParam);
        console.log('Matching Orders:', this.matchingOrders);
      }
    });
    return this.matchingOrders;
  }

  handleButtonClick(order: Orders): void {
    console.log('Button clicked for order:', order);
    if (Array.isArray(this.salesAccounting.orders)) {
      const index = this.salesAccounting.orders.findIndex(o => o.productName === order.productName);
      if (index !== -1) {
        this.salesAccounting.orders.splice(index, 1);
        this.salesAccounting.orders = [...this.salesAccounting.orders];
        this.cdRef.detectChanges();
      }
    }
    localStorage.setItem('salesAccountingOrders', JSON.stringify(this.salesAccounting.orders));
    this.getOrdersByBoxParam();
  }
}
