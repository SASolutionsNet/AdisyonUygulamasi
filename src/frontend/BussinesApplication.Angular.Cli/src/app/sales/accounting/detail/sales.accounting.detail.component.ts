import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../../header/header.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { AccountingDetailComponent } from "../../../shared/modules/sales/accounting/components/detail/accounting.detail.component";

@Component({
  selector: 'app-sales-accounting-detail',
  templateUrl: './sales.accounting.detail.component.html',
  styleUrls: ['./sales.accounting.detail.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [AccountingDetailComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesAccountingDetailComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }


}
