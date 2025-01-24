import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../../header/header.component";
import { SidebarComponent } from "../../../sidebar/sidebar.component";
import { MatCardModule } from "@angular/material/card";
import { OrderDetailComponent } from "../../../shared/modules/sales/order/components/detail/order.detail.component";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales.order.detail.component.html',
  styleUrls: ['./sales.order.detail.component.scss'],
  standalone: true,  // Standalone olarak işaretleyin
  imports: [OrderDetailComponent, HeaderComponent, SidebarComponent, MatCardModule]  // Burada standalone bileşeni import edin
})
export class SalesOrderDetailComponent implements OnInit {
  box: string ="";

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    // URL parametresini almak
    this.box = this.route.snapshot.paramMap.get('box')!;
    console.log(`Selected box: ${this.box}`);  // Bu satır ile parametrenin doğru alındığını görebilirsiniz

  }


}
