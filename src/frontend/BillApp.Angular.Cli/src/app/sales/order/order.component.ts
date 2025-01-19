import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../header/header.component";
import { SalesOrderListComponent } from "../../shared/modules/sales/order/components/list/order.list.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [SalesOrderListComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesOrderComponent implements OnInit {

  constructor() { }
    ngOnInit(): void {
       
  }


}
