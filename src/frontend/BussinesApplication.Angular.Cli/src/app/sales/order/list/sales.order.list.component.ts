import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { OrderListComponent } from "../../../shared/modules/sales/order/components/list/order.list.component";
import { HeaderComponent } from "../../../header/header.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales.order.list.component.html',
  styleUrls: ['./sales.order.list.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [OrderListComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesOrderListComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog) { }
  ngOnInit(): void {

  }


}
