import { Component, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from './shared/guards/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cpa-web';
  mode = new FormControl('over');
  @ViewChild('sidenav') sidenav:any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  languageList = [
    { code: 'en', label: 'English' },
    { code: 'pt-BR', label: 'Portugues' },
    { code: 'es', label: 'Espanol' }
  ];

  constructor(private auth: AuthGuardService,
              private router: Router,
              @Inject(LOCALE_ID) protected localeId: string) { }

  navigate(menu: string) {
    if (menu === 'logout') {
      this.logout();
    } else {
      this.chageMenu(menu);
    }
  }

  chageMenu(menu:string):void {
    this.router.navigate(['/'+ menu +'']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  getToken() {
    return localStorage.getItem("token")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }
}
