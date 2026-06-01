import { Routes } from '@angular/router';
import { LevelsComponent } from './pages/levels/levels.component';
import { UsersComponent } from './pages/users/users.component';
import { PagesComponent } from './pages/pages/pages.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guards';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'levels',
    pathMatch: 'full'
  },
  {
    path: 'levels',
    component: LevelsComponent,
    canActivate: [authGuard,permissionGuard]
  },
   {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard,permissionGuard]
  },
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [authGuard,permissionGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [authGuard,permissionGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard,permissionGuard]
  }
];