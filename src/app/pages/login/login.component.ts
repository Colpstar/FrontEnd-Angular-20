import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login1() {
    this.http
      .post('http://localhost:8000/api/login', {
        login: this.login,
        password: this.password,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.clear();

          localStorage.setItem('token', res.token);

          localStorage.setItem('level_id', res.user.level_id.toString());

          localStorage.setItem('user_id', res.user.id.toString());

          localStorage.setItem('full_name', res.user.full_name);

          this.http
            .get(
              'http://localhost:8000/api/my-pages?level_id=' + res.user.level_id
            )
            .subscribe({
              next: (res: any) => {
                console.log(res);
                localStorage.setItem('menus', JSON.stringify(res));
              },
            });

          alert('Login berhasil');

          window.location.href = '/dashboard';
        },

        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
