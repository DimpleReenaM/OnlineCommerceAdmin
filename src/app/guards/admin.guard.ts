import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('Role');

    if (token && role === 'ADMIN') {   
      return true;
    } else {
      window.alert('Access Denied! Admins only');
      return false;
    }
  }

  // If not in browser (SSR), deny access
  return false;};
