import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,  // Standalone bileşen olduğunu belirtiyoruz
})
export class HeaderComponent implements OnInit {

  pageTitle: string = 'Adisyon Uygulaması';

  constructor() { }

  ngOnInit(): void {
    // Sayfa başlığını burada dinamik olarak değiştirebilirsiniz, şu anda hata oluşturacak bir işlem yapmıyoruz.
    // Eğer gerekirse sayfa başlığını buradan değiştirebilirsiniz.
    console.log('Header component initialized');
  }
}

