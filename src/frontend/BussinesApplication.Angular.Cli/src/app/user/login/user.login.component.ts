import { Component } from '@angular/core';
import { UserService } from '../../shared/modules/user/services/user.service';
import { Router } from '@angular/router';  // Yönlendirme için Router'ı import et
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sasolution-login',
  templateUrl: './user.login.component.html',
  styleUrls: ['./user.login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onLogin(): void {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        const token = response.data;
        if (token) {
          this.userService.storeToken(token);
          console.log('Login başarılı');
          // Başarılı giriş sonrası yönlendirme yapılabilir
          this.router.navigate(['../../dashboard']);  // Yönlendirme örneği
        }
      },
      error => {
        this.errorMessage = 'Login başarısız! Lütfen tekrar deneyin.';
        console.error('Login hatası:', error);
      }
    );
  }
}
