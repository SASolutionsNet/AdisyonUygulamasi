import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../../header/header.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { AccountingListComponent } from "../../../shared/modules/sales/accounting/components/list/accounting.list.component";

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [AccountingListComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesAccountingListComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }


}
