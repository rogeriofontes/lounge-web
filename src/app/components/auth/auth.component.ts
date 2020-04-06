import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/User';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Register } from 'src/app/shared/Register';
import { UserType } from 'src/app/shared/UserType';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  //TODO - Melhorar login: https://loiane.com/2017/08/angular-hide-navbar-login-page/
  //https://ryanchenkie.com/angular-authentication-using-route-guards
  user: User = new User();
  register: Register = new Register();
  token: string;
  loading = false;
  showRegister = false;
  showLogin = true;
  errorLogin = '';
  errorRegister = '';
  email: string;
  showSpinner = false;
  constructor(private router: Router, private auth: AuthService) { }

  onLogin(): void {
    this.auth.login(this.user)
    .then((user) => {
      console.log(user);
     
      let resultToken = user && user.token;

      if (resultToken) {
        this.token = user.token;
        console.log(this.token);

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', this.token);
        console.log('setLocalstorge: ' + localStorage.getItem('token'));

        this.router.navigate(['/dashboard']);
      }
      
    })
    .catch((err) => {
      console.log(err);
      this.errorLogin = 'O nome do usuário ou senha estão incorretos!\n';
      this.loading = false;
    });
  }

  onRegister(): void {
    this.register.userType = "USER";
    this.auth.register(this.register)
    .then((register) => {
      console.log(register);
        this.router.navigate(['/login']);
    })
    .catch((err) => {
      console.log(err);
      this.errorRegister = 'O registro não ocorreu! Favor, ver os dados.\n';
      this.loading = false;
    });
  }

  onLogout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  onShowRegiter(): void {
    this.showRegister = true;
    this.showLogin = false;
    this.clearError();
  }

  onShowLogin(): void {
    this.showRegister = false;
    this.showLogin = true;
    this.clearError();
  }

  clearError() {
    this.errorLogin = '';
    this.errorRegister = '';
  }
  ngOnInit() {
    if (localStorage.getItem("token") !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

}
