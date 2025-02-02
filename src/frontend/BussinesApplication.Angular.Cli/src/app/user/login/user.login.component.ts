import { Component } from '@angular/core';
import { UserService } from '../../shared/modules/user/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'sasolution-login',
  templateUrl: './user.login.component.html',
  styleUrls: ['./user.login.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  onLogin(): void {
    this.userService.login(this.username, this.password).subscribe(
      response => {
        // Token'ı alıp saklayabiliriz
        const token = response.token;
        if (token) {
          this.userService.storeToken(token);
          console.log('Login başarılı');
          // Burada, başarılı bir giriş sonrası yönlendirme yapılabilir
        }
      },
      error => {
        // Hata durumunda mesaj gösterilebilir
        this.errorMessage = 'Login başarısız! Lütfen tekrar deneyin.';
        console.error('Login hatası:', error);
      }
    );
  }
}
