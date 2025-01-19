
import { Router, RouterModule } from '@angular/router';

// https://medium.com/@jek.bao.choo/steps-to-add-moment-js-to-angular-cli-f9ab28
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,  // Standalone component
  templateUrl: './dashboard.component.html',  // Template dosyasını buraya belirtiyoruz,
  imports: [RouterModule, CommonModule,SidebarComponent,HeaderComponent]  // CommonModule ve diğer gerekli modülleri burada import etmelisin
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

 
  constructor(private router: Router
  ) {
  }

  ngOnInit() {
   
  }

 

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  
  }

  onSignInClick() {
    this.router.navigate(['/sales']);
    //this.router.navigate(['/inventory/item/detail/eb969f13-e05c-4bf4-9c0b-0754cf8c49ab']);
  }
}
