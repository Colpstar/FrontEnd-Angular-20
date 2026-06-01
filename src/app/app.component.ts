import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from './services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  menus: any[] = [];

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.menuService.getMenus()
      .subscribe((res: any) => {

        this.menus = res;

      });

  }

  logout() {

  localStorage.clear();

  this.menus = [];

  window.location.href = '/login';

}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
}