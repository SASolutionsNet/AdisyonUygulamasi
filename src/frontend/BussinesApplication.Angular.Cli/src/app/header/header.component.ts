import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/modules/user/services/user.service";
import { Router } from "@angular/router";
import { ApplicationUser } from "../shared/modules/user/models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,  // Standalone bileşen olduğunu belirtiyoruz
})
export class HeaderComponent implements OnInit {
  user!: ApplicationUser; // user değişkeni ApplicationUser tipinde
  errorMessage: string | null = null;
  pageTitle: string = 'Adisyon Uygulaması';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser();
    this.getCurrentUserInfo();

    // Sayfa başlığını burada dinamik olarak değiştirebilirsiniz, şu anda hata oluşturacak bir işlem yapmıyoruz.
    // Eğer gerekirse sayfa başlığını buradan değiştirebilirsiniz.
    console.log('Header component initialized');
  }

  getCurrentUserInfo(): void {
    this.userService.getCurrentUser().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Lütfen giriş yapın, yetkilendirilmediniz.';
        } else {
          this.errorMessage = 'Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.';
        }
      }
    );
  }
  // Çıkış yap metodu
  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        // Çıkış işlemi başarıyla tamamlandığında yapılacak işlemler
        console.log('Çıkış başarılı!');
        // Örneğin, kullanıcıyı login sayfasına yönlendirebilirsiniz
         this.router.navigate(['/user/login']);
      },
      error: (err) => {
        console.error('Çıkış işlemi sırasında hata:', err);
      }
    });
  }
}

