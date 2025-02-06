import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/modules/user/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sasolution-register',
  templateUrl: './user.register.component.html',
  styleUrls: ['./user.register.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    username:''
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.register( this.user.email, this.user.password,this.user.username).subscribe(
      response => {
        this.successMessage = 'Kayıt başarılı! Giriş yapabilirsiniz.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/user/login']); // Kayıt olduktan sonra login sayfasına yönlendir
        }, 2000);
      },
      error => {
        this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      }
    );
  }
}
