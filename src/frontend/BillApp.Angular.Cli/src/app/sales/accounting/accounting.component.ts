import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../header/header.component";
import { SalesAccountingListComponent } from "../../shared/modules/sales/accounting/components/list/accounting.list.component";

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [SalesAccountingListComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesAccountingComponent implements OnInit {

  constructor() { }
    ngOnInit(): void {
       
  }


}
