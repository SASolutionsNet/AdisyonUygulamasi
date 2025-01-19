import { Component, NgZone, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';


const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],  // RouterModule import edilmelidir
  template: `
    
    <router-outlet></router-outlet>  <!-- Yönlendirme bileşeni burada görünecek -->
  `,
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy, AfterViewInit {



  constructor(
    private router: Router,
  
  ) {
   
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
   
    
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy() {
   

   

  
  }

  runOnRouteChange(): void {
  
  }

}
