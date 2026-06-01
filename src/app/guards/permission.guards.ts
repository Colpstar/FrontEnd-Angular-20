import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const permissionGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const menus = JSON.parse(
    localStorage.getItem('menus') || '[]'
  );

  const currentRoute =
    '/' + route.routeConfig?.path;

  const hasAccess = menus.some(
    (menu: any) =>
      menu.route === currentRoute
  );

  if (!hasAccess) {

    alert('Tidak memiliki akses');

    router.navigate([
      '/dashboard'
    ]);

    return false;

  }

  return true;

};