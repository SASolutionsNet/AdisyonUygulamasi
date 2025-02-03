import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './app-home.component.html',  // Template dosyasını buraya belirtiyoruz,
  styleUrls: ['./app-home.component.scss'],
  imports: [RouterModule, CommonModule, MatCardModule]  // İlgili modülleri buraya import edebilirsiniz
})
export class AppHomeComponent implements OnInit {
 

  constructor(private router: Router) {

  
  
  }

  ngOnInit() {



  }

  ngOnDestroy() {
  
  }

  onSignInClick() {
    this.router.navigate(['/user/login']);
    //this.router.navigate(['/inventory/item/detail/eb969f13-e05c-4bf4-9c0b-0754cf8c49ab']);
  }

  onSignUpClick() {
    this.router.navigate(['/coredata']);
    //this.router.navigate(['/inventory/item/detail/eb969f13-e05c-4bf4-9c0b-0754cf8c49ab']);
  }

}
